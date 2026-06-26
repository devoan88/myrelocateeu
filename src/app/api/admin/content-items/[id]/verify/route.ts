import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin/auth";
import {
  appendEditHistory,
  type ContentItem,
  type EditHistoryEntry,
} from "@/lib/admin/content";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RouteParams = { params: { id: string } };

export async function POST(_request: Request, { params }: RouteParams) {
  const adminUser = await getAdminUser();
  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", params.id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const before = existing as ContentItem;
  const today = new Date().toISOString().slice(0, 10);
  const adminEmail = adminUser.email ?? "admin@relocateeu.com";

  const historyEntry: EditHistoryEntry = {
    updated_by: adminEmail,
    updated_at: new Date().toISOString(),
    action: "verify",
    changes: {
      last_verified: { from: before.last_verified, to: today },
      verified_by: { from: before.verified_by, to: adminEmail },
    },
  };

  const { data, error } = await supabase
    .from("content_items")
    .update({
      last_verified: today,
      verified_by: adminEmail,
      edit_history: appendEditHistory(before.edit_history, historyEntry),
    })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}
