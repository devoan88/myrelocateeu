import { NextResponse } from "next/server";
import { sendReportOutdatedEmail } from "@/lib/email/report-outdated";

type ReportBody = {
  entryId: string;
  country: string;
  category: string;
  title: string;
  lastVerified: string;
  sourceUrl: string;
  destination?: string;
  origin?: string;
  message?: string;
  email?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReportBody;

    if (
      !body.entryId?.trim() ||
      !body.title?.trim() ||
      !body.country?.trim() ||
      !body.category?.trim() ||
      !body.lastVerified?.trim() ||
      !body.sourceUrl?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sent = await sendReportOutdatedEmail({
      entryId: body.entryId.trim(),
      country: body.country.trim(),
      category: body.category.trim(),
      title: body.title.trim(),
      lastVerified: body.lastVerified.trim(),
      sourceUrl: body.sourceUrl.trim(),
      destination: body.destination?.trim(),
      origin: body.origin?.trim(),
      userMessage: body.message?.trim(),
      reporterEmail: body.email?.trim(),
    });

    if (!sent) {
      return NextResponse.json(
        {
          error:
            "Report could not be sent right now. Please email the team directly.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Report outdated error:", error);
    return NextResponse.json(
      { error: "Unable to submit report. Please try again." },
      { status: 500 }
    );
  }
}
