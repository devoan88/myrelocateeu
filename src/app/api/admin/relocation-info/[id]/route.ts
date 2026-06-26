import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RouteParams = { params: { id: string } };

export async function PUT(request: Request, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const body = await request.json();
  const { title, content, source_url, category, country, language } = body;

  const { data, error } = await admin
    .from("relocation_info")
    .update({
      title,
      content,
      source_url,
      category,
      country,
      language,
      last_updated: new Date().toISOString().slice(0, 10),
    })
    .eq("id", params.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, entry: data });
}
