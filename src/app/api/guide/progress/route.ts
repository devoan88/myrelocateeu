import { NextResponse } from "next/server";
import type { DestinationCountry } from "@/lib/checklists";
import { isDestinationCountry } from "@/lib/checklists";
import type { GuideProgress } from "@/lib/guide/progress";
import { createClientIfConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = await createClientIfConfigured();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  if (!destination || !isDestinationCountry(destination)) {
    return NextResponse.json({ error: "Invalid destination" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("guide_progress")
    .select("step_id, completed")
    .eq("user_id", user.id)
    .eq("country", destination);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const progress: GuideProgress = {};
  for (const row of data ?? []) {
    progress[row.step_id] = row.completed;
  }

  return NextResponse.json({ progress });
}

export async function PUT(request: Request) {
  const supabase = await createClientIfConfigured();
  if (!supabase) {
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { destination?: string; progress?: GuideProgress };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { destination, progress } = body;
  if (!destination || !isDestinationCountry(destination) || !progress) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const rows = Object.entries(progress).map(([step_id, completed]) => ({
    user_id: user.id,
    country: destination as DestinationCountry,
    step_id,
    completed: Boolean(completed),
    completed_at: completed ? new Date().toISOString() : null,
  }));

  const { error } = await supabase.from("guide_progress").upsert(rows, {
    onConflict: "user_id,country,step_id",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
