import Anthropic from "@anthropic-ai/sdk";

export const CLAUDE_MODEL = "claude-sonnet-4-20250514";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }
  return new Anthropic({ apiKey });
}

export async function generateClaudeReply(params: {
  systemPrompt: string;
  userMessage: string;
  history?: ChatMessage[];
}): Promise<string> {
  const client = getClient();

  const messages: Anthropic.MessageParam[] = [
    ...(params.history ?? []).map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    { role: "user", content: params.userMessage },
  ];

  const response = await client.messages.create({
    model: CLAUDE_MODEL,
    max_tokens: 2048,
    system: params.systemPrompt,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  return textBlock.text;
}
