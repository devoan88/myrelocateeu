import { createHash } from "crypto";

export async function fetchPageContent(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "RelocateEU-Monitor/1.0 (+https://relocateeu.com; content-monitoring)",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    const html = await response.text();
    return htmlToText(html);
  } finally {
    clearTimeout(timeout);
  }
}

export function htmlToText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 8000);
}

export function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

export function buildDiffSummary(oldText: string, newText: string): string {
  const oldWords = new Set(oldText.toLowerCase().split(/\s+/).slice(0, 500));
  const newWords = newText.toLowerCase().split(/\s+/).slice(0, 500);
  const added = newWords.filter((w) => w.length > 4 && !oldWords.has(w));
  const uniqueAdded = [...new Set(added)].slice(0, 12);

  if (uniqueAdded.length === 0) {
    return "Content structure changed — review the full snapshot diff in the admin dashboard.";
  }

  return `New or changed terms detected: ${uniqueAdded.join(", ")}`;
}

export function excerpt(text: string, max = 1200): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}… [truncated]`;
}
