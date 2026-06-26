import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin/auth";
import { approvePendingUpdate } from "@/lib/monitoring/service";

type RouteParams = { params: { id: string } };

export async function POST(request: Request, { params }: RouteParams) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const result = await approvePendingUpdate(
      params.id,
      body.editedContent as string | undefined
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Approve failed" },
      { status: 400 }
    );
  }
}
