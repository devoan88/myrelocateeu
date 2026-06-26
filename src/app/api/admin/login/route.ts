import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

/** @deprecated Use /auth/login?next=/admin instead */
export async function POST() {
  return NextResponse.json(
    { error: "Use /auth/login with your admin Supabase account" },
    { status: 410 }
  );
}

export async function GET() {
  redirect("/auth/login?next=/admin");
}
