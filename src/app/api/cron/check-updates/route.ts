import { NextResponse } from "next/server";
import { verifyCronAuth } from "@/lib/admin/auth";
import { runContentMonitor } from "@/lib/monitoring/service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  if (!verifyCronAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runContentMonitor();
    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error) {
    console.error("Cron check-updates error:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Monitor failed",
      },
      { status: 500 }
    );
  }
}
