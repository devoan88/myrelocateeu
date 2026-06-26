"use client";

import Link from "next/link";
import { useState } from "react";
import AiChatSupport from "@/components/AiChatSupport";
import RelocationInfoBlock from "@/components/RelocationInfoBlock";
import { FREE_STEP_LIMIT } from "@/lib/constants";
import type { ChecklistItem } from "@/lib/checklists";
import GuideVerificationFooter from "@/components/GuideVerificationFooter";
import type { UserPlanContext } from "@/lib/plans";
import type { RelocationInfo, RelocationLanguage } from "@/lib/supabase/types";

export type EnrichedChecklistItem = ChecklistItem & {
  relocationInfo?: RelocationInfo | null;
};

type ChecklistGuideProps = {
  items: EnrichedChecklistItem[];
  destination: string;
  origin: string;
  userPlan: UserPlanContext;
  language: RelocationLanguage;
};

function PlanBadge({ plan }: { plan: UserPlanContext["plan"] }) {
  if (plan === "free") return null;
  const styles =
    plan === "pro"
      ? "bg-slate-900 text-white"
      : "bg-blue-600 text-white";
  return (
    <span
      className={`ml-2 rounded-full px-2 py-0.5 text-xs capitalize ${styles}`}
    >
      {plan}
    </span>
  );
}

function ChecklistStep({
  item,
  index,
  isChecked,
  onToggle,
  locked = false,
  language,
  destination,
  origin,
}: {
  item: EnrichedChecklistItem;
  index: number;
  isChecked: boolean;
  onToggle: () => void;
  locked?: boolean;
  language: RelocationLanguage;
  destination: string;
  origin: string;
}) {
  const title = item.relocationInfo?.title ?? item.title;
  const description = item.relocationInfo ? null : item.description;

  if (locked) {
    return (
      <li className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="flex gap-4 p-5 sm:p-6 blur-[2px] select-none">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-400">
            {index + 1}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-slate-400">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {description ?? item.description}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <Link
            href="/pricing"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md"
          >
            Upgrade to unlock
          </Link>
        </div>
      </li>
    );
  }

  return (
    <li
      className={`rounded-2xl border bg-white transition-colors ${
        isChecked
          ? "border-green-200 bg-green-50/40"
          : "border-slate-200 shadow-sm"
      }`}
    >
      <div className="flex gap-4 p-5 sm:p-6">
        <label className="flex shrink-0 cursor-pointer flex-col items-center gap-2">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
              isChecked
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {index + 1}
          </span>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onToggle}
            className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
        </label>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-lg font-semibold ${
              isChecked ? "text-slate-500 line-through" : "text-slate-900"
            }`}
          >
            {title}
          </h3>

          {description && (
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {description}
            </p>
          )}

          {!isChecked && item.relocationInfo && (
            <RelocationInfoBlock
              info={item.relocationInfo}
              language={language}
            />
          )}

          {item.relocationInfo && (
            <div className={isChecked ? "mt-3" : "mt-3 border-t border-slate-100 pt-3"}>
              <GuideVerificationFooter
                info={item.relocationInfo}
                language={language}
                destination={destination}
                origin={origin}
              />
            </div>
          )}

          {!isChecked && !item.relocationInfo && (
            <ul className="mt-4 space-y-2">
              {item.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

export default function ChecklistGuide({
  items,
  destination,
  origin,
  userPlan,
  language,
}: ChecklistGuideProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const hasFullChecklist = userPlan.features.fullChecklist;

  const visibleItems = hasFullChecklist
    ? items
    : items.slice(0, FREE_STEP_LIMIT);
  const lockedItems = hasFullChecklist ? [] : items.slice(FREE_STEP_LIMIT);

  const completedCount = visibleItems.filter((item) => checked[item.id]).length;
  const progress = Math.round((completedCount / visibleItems.length) * 100);

  const pdfUrl = `/api/guide/pdf?destination=${encodeURIComponent(destination)}&origin=${encodeURIComponent(origin)}&lang=${language}`;

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div>
      {userPlan.plan === "free" && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-amber-900">Free plan</p>
            <p className="text-sm text-amber-800">
              Showing {FREE_STEP_LIMIT} of {items.length} categories. Upgrade for
              the full checklist and AI chat.
            </p>
          </div>
          <Link
            href="/pricing"
            className="shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View plans
          </Link>
        </div>
      )}

      {userPlan.features.prioritySupport && (
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white">
          <p className="font-semibold">Pro priority support</p>
          <p className="mt-1 text-sm text-slate-300">
            A human relocation consultant will respond within 24 hours. Email{" "}
            <a
              href="mailto:support@relocateeu.com"
              className="text-blue-400 underline"
            >
              support@relocateeu.com
            </a>{" "}
            with your route ({origin} → {destination}).
          </p>
        </div>
      )}

      {userPlan.features.pdfGuide && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-900">PDF relocation guide</p>
            <p className="text-sm text-slate-600">
              Download your complete verified guide for offline use.
            </p>
          </div>
          <a
            href={pdfUrl}
            className="shrink-0 rounded-xl bg-slate-900 px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Download PDF
          </a>
        </div>
      )}

      <div className="mb-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">
              Your relocation plan
              <PlanBadge plan={userPlan.plan} />
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {origin} → {destination}
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-2xl font-bold text-blue-600">{progress}%</p>
            <p className="text-sm text-slate-600">
              {completedCount} of {visibleItems.length} steps completed
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ol className="flex flex-col gap-4">
        {visibleItems.map((item, index) => (
          <ChecklistStep
            key={item.id}
            item={item}
            index={index}
            isChecked={checked[item.id] ?? false}
            onToggle={() => toggle(item.id)}
            language={language}
            destination={destination}
            origin={origin}
          />
        ))}
        {lockedItems.map((item, index) => (
          <ChecklistStep
            key={item.id}
            item={item}
            index={FREE_STEP_LIMIT + index}
            isChecked={false}
            onToggle={() => {}}
            locked
            language={language}
            destination={destination}
            origin={origin}
          />
        ))}
      </ol>

      {completedCount === visibleItems.length && visibleItems.length > 0 && (
        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
          <p className="text-lg font-semibold text-green-800">
            {hasFullChecklist
              ? "All steps completed!"
              : `${FREE_STEP_LIMIT} steps completed!`}
          </p>
          <p className="mt-1 text-sm text-green-700">
            {hasFullChecklist
              ? `You're well on your way to settling in ${destination}.`
              : `Upgrade to unlock the remaining ${lockedItems.length} categories.`}
          </p>
          {!hasFullChecklist && (
            <Link
              href="/pricing"
              className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Unlock full checklist
            </Link>
          )}
        </div>
      )}

      {userPlan.features.aiChat ? (
        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            AI chat support
          </h2>
          <AiChatSupport
            destination={destination}
            origin={origin}
            language={language}
            chatMessagesRemaining={userPlan.chatMessagesRemaining}
            plan={userPlan.plan}
          />
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="font-semibold text-slate-900">AI chat is a Premium feature</p>
          <p className="mt-1 text-sm text-slate-600">
            Upgrade to Premium for AI chat (50 messages/month) or Pro for
            unlimited chat.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Upgrade now
          </Link>
        </div>
      )}
    </div>
  );
}
