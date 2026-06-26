import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { isDestinationCountry } from "@/lib/checklists";
import { getUserPlan } from "@/lib/plans";
import { getRelocationInfo } from "@/lib/relocation-info";
import type { RelocationLanguage } from "@/lib/supabase/types";

function parseLanguage(value?: string | null): RelocationLanguage {
  if (value === "ka" || value === "de" || value === "en") return value;
  return "en";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const destination = searchParams.get("destination");
  const origin = searchParams.get("origin");
  const lang = parseLanguage(searchParams.get("lang"));

  if (!destination || !origin || !isDestinationCountry(destination)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const userPlan = await getUserPlan();
  if (!userPlan.features.pdfGuide) {
    return NextResponse.json(
      { error: "PDF guide requires a Pro subscription" },
      { status: 403 }
    );
  }

  const rows = await getRelocationInfo(destination, lang);
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page = pdf.addPage([595, 842]);
  let y = 800;

  const drawLine = (text: string, size = 11, useBold = false) => {
    if (y < 60) {
      page = pdf.addPage([595, 842]);
      y = 800;
    }
    page.drawText(text, {
      x: 50,
      y,
      size,
      font: useBold ? bold : font,
      color: rgb(0.1, 0.1, 0.2),
      maxWidth: 495,
    });
    y -= size + 6;
  };

  drawLine("RelocateEU — Relocation Guide", 18, true);
  drawLine(`${origin} → ${destination}`, 13, true);
  drawLine(`Generated for Pro subscribers`, 10);
  y -= 10;

  rows.forEach((row, index) => {
    drawLine(`${index + 1}. ${row.title}`, 13, true);
    row.content.split("\n").forEach((line) => {
      if (line.trim()) drawLine(line.trim(), 10);
    });
    drawLine(`Source: ${row.source_url}`, 9);
    drawLine(`Last verified: ${row.last_updated}`, 9);
    y -= 8;
  });

  drawLine("Priority consultant support: response within 24 hours.", 10, true);
  drawLine("Contact: support@relocateeu.com", 10);

  const pdfBytes = await pdf.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="relocateeu-${destination.toLowerCase()}-guide.pdf"`,
    },
  });
}
