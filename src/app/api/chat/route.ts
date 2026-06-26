import { NextResponse } from "next/server";
import { PREMIUM_CHAT_LIMIT } from "@/lib/constants";
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

    if (!userPlan.features.aiChat) {
      return NextResponse.json(
        {
          error:
            "AI chat requires a Premium or Pro subscription. Upgrade at /pricing.",
        },
        { status: 403 }
      );
    }

    if (
      userPlan.plan === "premium" &&
      userPlan.chatMessagesRemaining <= 0
    ) {
      return NextResponse.json(
        {
          error: `You've used all ${PREMIUM_CHAT_LIMIT} messages this month. Upgrade to Pro for unlimited chat.`,
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

    if (userPlan.plan === "premium" && userPlan.record?.id) {
      await incrementChatUsage(userPlan.record.id);
    }

    const messagesRemaining =
      userPlan.plan === "pro"
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
