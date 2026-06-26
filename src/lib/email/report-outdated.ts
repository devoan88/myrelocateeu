export type ReportOutdatedPayload = {
  entryId: string;
  country: string;
  category: string;
  title: string;
  lastVerified: string;
  sourceUrl: string;
  destination?: string;
  origin?: string;
  userMessage?: string;
  reporterEmail?: string;
};

export async function sendReportOutdatedEmail(
  payload: ReportOutdatedPayload
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "RelocateEU <onboarding@resend.dev>";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  if (!apiKey || !adminEmail) {
    console.warn(
      "RESEND_API_KEY or ADMIN_EMAIL not set — skipping outdated report email"
    );
    console.info("Outdated report:", payload.entryId, payload.title);
    return false;
  }

  const route =
    payload.destination && payload.origin
      ? `${payload.origin} → ${payload.destination}`
      : payload.country;

  const html = `
    <h2>RelocateEU — User reported outdated information</h2>
    <p>A visitor flagged content that may need updating.</p>
    <table style="border-collapse:collapse;width:100%;max-width:560px;">
      <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Entry</td><td><strong>${escapeHtml(payload.title)}</strong></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Country</td><td>${escapeHtml(payload.country)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Category</td><td>${escapeHtml(payload.category)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Route</td><td>${escapeHtml(route)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Last verified</td><td>${escapeHtml(payload.lastVerified)}</td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Entry ID</td><td><code>${escapeHtml(payload.entryId)}</code></td></tr>
      <tr><td style="padding:6px 12px 6px 0;color:#64748b;">Source</td><td><a href="${escapeHtml(payload.sourceUrl)}">${escapeHtml(payload.sourceUrl)}</a></td></tr>
      ${payload.reporterEmail ? `<tr><td style="padding:6px 12px 6px 0;color:#64748b;">Reporter</td><td>${escapeHtml(payload.reporterEmail)}</td></tr>` : ""}
    </table>
    ${
      payload.userMessage
        ? `<h3 style="margin-top:20px;">User message</h3><p style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;">${escapeHtml(payload.userMessage)}</p>`
        : ""
    }
    <p style="margin-top:24px;">
      <a href="${appUrl}/admin" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Open admin dashboard</a>
    </p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [adminEmail],
      subject: `[RelocateEU] Outdated report: ${payload.title} (${payload.country})`,
      html,
    }),
  });

  if (!response.ok) {
    console.error("Resend report error:", await response.text());
    return false;
  }

  return true;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
