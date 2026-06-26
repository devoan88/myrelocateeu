import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin/auth";
import {
  appendEditHistory,
  buildChangeSet,
  type ContentItem,
  type EditHistoryEntry,
} from "@/lib/admin/content";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RouteParams = { params: { id: string } };

export async function PUT(request: Request, { params }: RouteParams) {
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

  let body: Partial<ContentItem>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const before = existing as ContentItem;
  const changes = buildChangeSet(before, body);

  const historyEntry: EditHistoryEntry = {
    updated_by: adminUser.email ?? "admin@relocateeu.com",
    updated_at: new Date().toISOString(),
    action: "edit",
    changes: Object.keys(changes).length > 0 ? changes : undefined,
  };

  const updatePayload = {
    title: body.title ?? before.title,
    description: body.description ?? before.description,
    documents: body.documents ?? before.documents,
    official_url: body.official_url ?? before.official_url,
    important_note: body.important_note ?? before.important_note,
    last_verified: body.last_verified ?? before.last_verified,
    verified_by: adminUser.email ?? before.verified_by,
    edit_history: appendEditHistory(before.edit_history, historyEntry),
  };

  const { data, error } = await supabase
    .from("content_items")
    .update(updatePayload)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}
