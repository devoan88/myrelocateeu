import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { rejectPendingUpdate } from "@/lib/monitoring/service";

type RouteParams = { params: { id: string } };

export async function POST(_request: Request, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await rejectPendingUpdate(params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reject failed" },
      { status: 400 }
    );
  }
}
