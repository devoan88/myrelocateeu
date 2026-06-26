"use client";

import Link from "next/link";
import { useState } from "react";
import type { PlanTier } from "@/lib/constants";
import { PREMIUM_CHAT_LIMIT } from "@/lib/constants";
import type { RelocationLanguage } from "@/lib/supabase/types";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AiChatSupportProps = {
  destination: string;
  origin: string;
  language: RelocationLanguage;
  chatMessagesRemaining: number;
  plan: PlanTier;
  initialMessage?: string;
};

const placeholders: Record<RelocationLanguage, string> = {
  en: "Ask about registration, banking, insurance…",
  de: "Fragen zu Anmeldung, Bank, Versicherung…",
  ka: "კითხვა რეგისტრაციაზე, ბანკზე, დაზღვევაზე…",
};

export default function AiChatSupport({
  destination,
  origin,
  language,
  chatMessagesRemaining,
  plan,
  initialMessage,
}: AiChatSupportProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        initialMessage ??
        `Hi! I answer questions about relocating from ${origin} to ${destination} using only verified database content.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(chatMessagesRemaining);

  const limitLabel =
    plan === "pro"
      ? "Unlimited messages"
      : `${remaining} of ${PREMIUM_CHAT_LIMIT} messages left this month`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    if (plan === "premium" && remaining <= 0) return;

    const userMessage: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          destination,
          origin,
          language,
          history: messages.slice(1),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
        if (data.messagesRemaining === null) {
          // Pro: unlimited
        } else if (typeof data.messagesRemaining === "number") {
          setRemaining(data.messagesRemaining);
        } else if (plan === "premium") {
          setRemaining((r) => Math.max(0, r - 1));
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error ?? "Unable to get a response. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const inputDisabled =
    loading || (plan === "premium" && remaining <= 0);

  return (
    <div className="rounded-2xl border border-blue-200 bg-white shadow-lg shadow-blue-100/50">
      <div className="border-b border-blue-100 px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              AI
            </span>
            <div>
              <p className="font-semibold text-slate-900">
                Claude relocation assistant
              </p>
              <p className="text-xs text-slate-500">
                Verified data only · {limitLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-80 flex-col gap-3 overflow-y-auto px-5 py-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="max-w-[85%] rounded-2xl bg-slate-100 px-4 py-2.5 text-sm text-slate-500">
            Thinking…
          </div>
        )}
      </div>

      {plan === "premium" && remaining <= 0 && (
        <div className="border-t border-amber-100 bg-amber-50 px-5 py-3 text-center text-sm text-amber-800">
          Monthly limit reached.{" "}
          <Link href="/pricing" className="font-semibold underline">
            Upgrade to Pro
          </Link>{" "}
          for unlimited chat.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-t border-blue-100 p-4"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholders[language]}
          disabled={inputDisabled}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
        />
        <button
          type="submit"
          disabled={inputDisabled || !input.trim()}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
