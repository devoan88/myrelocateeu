import { NextResponse } from "next/server";
import { getAiQuestionsLimit } from "@/lib/features";
import { generateClaudeReply, type ChatMessage } from "@/lib/rag/claude";
import {
  buildRagContext,
  getLanguageName,
  RAG_SYSTEM_PROMPT,
} from "@/lib/rag/prompts";
import { getUserPlan, incrementChatUsage } from "@/lib/plans";
import { getRelocationInfo } from "@/lib/relocation-info";
import type { RelocationLanguage } from "@/lib/supabase/types";

type ChatRequest = {
  message: string;
  destination: string;
  origin: string;
  language?: RelocationLanguage;
  history?: ChatMessage[];
};

function parseLanguage(value?: string): RelocationLanguage {
  if (value === "ka" || value === "de" || value === "en") return value;
  return "en";
}

export async function POST(request: Request) {
  try {
    const userPlan = await getUserPlan();
    const limit = getAiQuestionsLimit(userPlan.plan);

    if (
      limit !== "unlimited" &&
      userPlan.chatMessagesRemaining <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "You've used all your AI questions for today. Upgrade for unlimited access at /pricing.",
        },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ChatRequest;

    if (!body.message?.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!body.destination || !body.origin) {
      return NextResponse.json(
        { error: "Destination and origin are required" },
        { status: 400 }
      );
    }

    const language = parseLanguage(body.language);
    const relocationRows = await getRelocationInfo(body.destination, language);
    const context = buildRagContext(
      relocationRows,
      body.destination,
      body.origin
    );

    const systemPrompt = `${RAG_SYSTEM_PROMPT}

The user is relocating from ${body.origin} to ${body.destination}.
Respond in ${getLanguageName(language)}.

Verified database content:
${context}`;

    const history = (body.history ?? []).slice(-10);

    const reply = await generateClaudeReply({
      systemPrompt,
      userMessage: body.message.trim(),
      history,
    });

    if (limit !== "unlimited" && userPlan.record?.id) {
      await incrementChatUsage(userPlan.record.id);
    }

    const messagesRemaining =
      limit === "unlimited"
        ? null
        : Math.max(0, userPlan.chatMessagesRemaining - 1);

    return NextResponse.json({ reply, messagesRemaining });
  } catch (error) {
    console.error("Chat error:", error);
    const message =
      error instanceof Error && error.message.includes("ANTHROPIC_API_KEY")
        ? "AI chat is not configured. Please add ANTHROPIC_API_KEY."
        : "Unable to generate a response. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
