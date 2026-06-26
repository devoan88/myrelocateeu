import { sendChangeNotificationEmail } from "@/lib/email/notify";
import {
  buildDiffSummary,
  excerpt,
  fetchPageContent,
  hashContent,
} from "@/lib/monitoring/fetch";
import { MONITORED_SOURCES, sourceUrlMatchesDomain } from "@/lib/monitoring/sources";
import { createSupabaseAdmin } from "@/lib/supabase/admin";
import type { PendingContentUpdate, RelocationInfo } from "@/lib/supabase/types";

function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function runContentMonitor(): Promise<{
  checked: number;
  changes: number;
  errors: string[];
}> {
  const admin = createSupabaseAdmin();
  if (!admin) {
    throw new Error("Supabase admin client not configured");
  }

  const errors: string[] = [];
  let changes = 0;

  const { data: allEntries } = await admin
    .from("relocation_info")
    .select("*");

  for (const source of MONITORED_SOURCES) {
    try {
      const text = await fetchPageContent(source.url);
      const hash = hashContent(text);

      const { data: existingSnapshot } = await admin
        .from("source_snapshots")
        .select("*")
        .eq("source_url", source.url)
        .maybeSingle();

      if (!existingSnapshot) {
        await admin.from("source_snapshots").insert({
          source_url: source.url,
          domain: source.domain,
          country: source.country,
          label: source.label,
          content_hash: hash,
          content_snapshot: excerpt(text, 4000),
          last_checked_at: new Date().toISOString(),
        });
        continue;
      }

      if (existingSnapshot.content_hash === hash) {
        await admin
          .from("source_snapshots")
          .update({ last_checked_at: new Date().toISOString() })
          .eq("id", existingSnapshot.id);
        continue;
      }

      const affectedEntries = ((allEntries ?? []) as RelocationInfo[]).filter(
        (entry) => sourceUrlMatchesDomain(entry.source_url, source.domain)
      );

      const oldContent =
        affectedEntries.map((e) => `[${e.language}] ${e.title}:\n${e.content}`).join("\n\n---\n\n") ||
        existingSnapshot.content_snapshot;

      const newContent = excerpt(text, 4000);
      const diffSummary = buildDiffSummary(
        existingSnapshot.content_snapshot,
        newContent
      );

      const { data: pendingUpdate, error: insertError } = await admin
        .from("pending_content_updates")
        .insert({
          source_url: source.url,
          domain: source.domain,
          country: source.country,
          label: source.label,
          old_content: oldContent,
          new_content: newContent,
          diff_summary: diffSummary,
          affected_entry_ids: affectedEntries.map((e) => e.id),
          status: "pending",
        })
        .select("*")
        .single();

      if (insertError || !pendingUpdate) {
        errors.push(`${source.domain}: failed to create pending update`);
        continue;
      }

      await admin
        .from("source_snapshots")
        .update({
          content_hash: hash,
          content_snapshot: newContent,
          last_checked_at: new Date().toISOString(),
        })
        .eq("id", existingSnapshot.id);

      await sendChangeNotificationEmail({
        update: pendingUpdate as PendingContentUpdate,
        adminDashboardUrl: getAppUrl(),
      });

      changes += 1;
    } catch (error) {
      errors.push(
        `${source.domain}: ${error instanceof Error ? error.message : "unknown error"}`
      );
    }
  }

  return { checked: MONITORED_SOURCES.length, changes, errors };
}

export async function approvePendingUpdate(
  updateId: string,
  editedContent?: string
): Promise<{ updated: number }> {
  const admin = createSupabaseAdmin();
  if (!admin) throw new Error("Supabase not configured");

  const { data: pending, error } = await admin
    .from("pending_content_updates")
    .select("*")
    .eq("id", updateId)
    .eq("status", "pending")
    .single();

  if (error || !pending) {
    throw new Error("Pending update not found");
  }

  const contentToApply = editedContent ?? pending.new_content;
  const today = new Date().toISOString().slice(0, 10);
  let updated = 0;

  if (pending.affected_entry_ids?.length) {
    for (const entryId of pending.affected_entry_ids) {
      const { data: entry } = await admin
        .from("relocation_info")
        .select("content")
        .eq("id", entryId)
        .single();

      if (!entry) continue;

      const updatedContent = `${contentToApply}\n\n---\nSource: ${pending.source_url}\nLast verified: ${today}`;

      await admin
        .from("relocation_info")
        .update({
          content: updatedContent.slice(0, 10000),
          last_updated: today,
        })
        .eq("id", entryId);

      updated += 1;
    }
  } else {
    const { data: entries } = await admin
      .from("relocation_info")
      .select("id, content")
      .eq("country", pending.country);

    for (const entry of entries ?? []) {
      const updatedContent = `${contentToApply}\n\n---\nSource: ${pending.source_url}\nLast verified: ${today}`;

      await admin
        .from("relocation_info")
        .update({
          content: updatedContent.slice(0, 10000),
          last_updated: today,
        })
        .eq("id", entry.id);

      updated += 1;
    }
  }

  await admin
    .from("pending_content_updates")
    .update({ status: "approved", reviewed_at: new Date().toISOString() })
    .eq("id", updateId);

  return { updated };
}

export async function rejectPendingUpdate(updateId: string) {
  const admin = createSupabaseAdmin();
  if (!admin) throw new Error("Supabase not configured");

  await admin
    .from("pending_content_updates")
    .update({ status: "rejected", reviewed_at: new Date().toISOString() })
    .eq("id", updateId);
}
