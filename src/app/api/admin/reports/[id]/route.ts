import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin/auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RouteParams = { params: { id: string } };

export async function PATCH(request: Request, { params }: RouteParams) {
  const adminUser = await getAdminUser();
  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { action?: "resolve" | "dismiss" };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.action !== "resolve" && body.action !== "dismiss") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }

  const status = body.action === "resolve" ? "resolved" : "dismissed";

  const { data, error } = await supabase
    .from("outdated_reports")
    .update({ status })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ report: data });
}
