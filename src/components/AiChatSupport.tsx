"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PlanTier } from "@/lib/features";
import { getAiQuestionsLimit } from "@/lib/features";
import { usePlan } from "@/hooks/usePlan";
import type { RelocationLanguage } from "@/lib/supabase/types";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type AiChatSupportProps = {
  destination: string;
  origin: string;
  language: RelocationLanguage;
  chatMessagesRemaining?: number;
  plan?: PlanTier;
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
  chatMessagesRemaining: initialRemaining,
  plan: planProp,
  initialMessage,
}: AiChatSupportProps) {
  const { plan: hookPlan, loading: planLoading } = usePlan();
  const plan = planProp ?? hookPlan;
  const limit = getAiQuestionsLimit(plan);

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
  const [remaining, setRemaining] = useState(
    initialRemaining ?? (limit === "unlimited" ? Infinity : limit)
  );
  const [questionsToday, setQuestionsToday] = useState(0);

  useEffect(() => {
    if (plan !== "free") return;
    const stored = localStorage.getItem("relocateeu_ai_questions_today");
    if (stored) {
      try {
        const { date, count } = JSON.parse(stored) as { date: string; count: number };
        const today = new Date().toISOString().slice(0, 10);
        if (date === today) {
          setQuestionsToday(count);
          setRemaining(Math.max(0, 3 - count));
        }
      } catch {
        /* ignore */
      }
    }
  }, [plan]);

  useEffect(() => {
    if (initialRemaining !== undefined) {
      setRemaining(initialRemaining);
    }
  }, [initialRemaining]);

  const limitLabel =
    limit === "unlimited"
      ? "Unlimited messages"
      : plan === "free"
        ? `${Math.max(0, 3 - questionsToday)} of 3 questions left today`
        : `${remaining} messages remaining`;

  const atLimit =
    limit !== "unlimited" &&
    (plan === "free" ? questionsToday >= 3 : remaining <= 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading || atLimit) return;

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
        if (plan === "free") {
          const today = new Date().toISOString().slice(0, 10);
          const nextCount = questionsToday + 1;
          setQuestionsToday(nextCount);
          setRemaining(Math.max(0, 3 - nextCount));
          localStorage.setItem(
            "relocateeu_ai_questions_today",
            JSON.stringify({ date: today, count: nextCount })
          );
        } else if (typeof data.messagesRemaining === "number") {
          setRemaining(data.messagesRemaining);
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

  const inputDisabled = loading || atLimit || planLoading;

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

      {atLimit && (
        <div className="border-t border-amber-100 bg-amber-50 px-5 py-3 text-center text-sm text-amber-800">
          {plan === "free" ? (
            <>
              Daily limit reached.{" "}
              <Link href="/pricing" className="font-semibold underline">
                Upgrade for unlimited
              </Link>{" "}
              AI assistant access.
            </>
          ) : (
            <>
              Limit reached.{" "}
              <Link href="/pricing" className="font-semibold underline">
                Upgrade your plan
              </Link>
              .
            </>
          )}
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
