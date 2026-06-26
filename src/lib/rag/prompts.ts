import type { RelocationInfo, RelocationLanguage } from "@/lib/supabase/types";

export const RAG_SYSTEM_PROMPT =
  "You are a relocation assistant. Answer ONLY based on the provided database content. Never invent information. If unsure, say 'please verify this on the official website'. Always cite the source URL. Respond in the user's selected language.";

const LANGUAGE_NAMES: Record<RelocationLanguage, string> = {
  en: "English",
  de: "German",
  ka: "Georgian",
};

export function getLanguageName(language: RelocationLanguage): string {
  return LANGUAGE_NAMES[language];
}

export function buildRagContext(
  rows: RelocationInfo[],
  destination: string,
  origin: string
): string {
  if (!rows.length) {
    return `No verified database records found for ${destination}.`;
  }

  const header = `Relocation route: ${origin} → ${destination}\nVerified database records:\n\n`;

  const records = rows
    .map(
      (row, index) =>
        `--- Record ${index + 1} ---
Category: ${row.category}
Title: ${row.title}
Content:
${row.content}
Source URL: ${row.source_url}
Last updated: ${row.last_updated}
Language: ${row.language}`
    )
    .join("\n\n");

  return header + records;
}

export function buildGuideUserMessage(
  destination: string,
  origin: string,
  language: RelocationLanguage,
  context: string
): string {
  return `The user is relocating from ${origin} to ${destination}.

Using ONLY the verified database content below, create a personalized step-by-step relocation checklist tailored to this route.

Requirements:
- Number each step clearly (1, 2, 3…)
- Use only facts from the database — do not invent requirements or deadlines
- For each step, cite the official source URL from the database
- Mention "Last updated" dates where relevant
- Keep steps practical and in logical order for a new arrival
- Respond in ${getLanguageName(language)}

Database content:
${context}`;
}

export function buildChatUserMessage(
  question: string,
  destination: string,
  origin: string,
  language: RelocationLanguage,
  context: string
): string {
  return `The user is relocating from ${origin} to ${destination}.
Respond in ${getLanguageName(language)}.

Verified database content:
${context}

User question:
${question}`;
}
