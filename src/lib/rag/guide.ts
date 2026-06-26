import { generateClaudeReply } from "@/lib/rag/claude";
import {
  buildGuideUserMessage,
  buildRagContext,
  RAG_SYSTEM_PROMPT,
} from "@/lib/rag/prompts";
import type { RelocationInfo, RelocationLanguage } from "@/lib/supabase/types";

export async function generatePersonalizedGuide(params: {
  destination: string;
  origin: string;
  language: RelocationLanguage;
  relocationRows: RelocationInfo[];
}): Promise<string | null> {
  if (!process.env.ANTHROPIC_API_KEY || !params.relocationRows.length) {
    return null;
  }

  const context = buildRagContext(
    params.relocationRows,
    params.destination,
    params.origin
  );

  const userMessage = buildGuideUserMessage(
    params.destination,
    params.origin,
    params.language,
    context
  );

  return generateClaudeReply({
    systemPrompt: RAG_SYSTEM_PROMPT,
    userMessage,
  });
}
