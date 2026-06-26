"use client";

import VerifiedBadge from "@/components/ui/VerifiedBadge";
import type { GuideStep } from "@/lib/guide/types";
import { CATEGORY_LABELS } from "@/lib/guide/types";
import { cn } from "@/lib/cn";

type GuideStepCardProps = {
  step: GuideStep;
  checked: boolean;
  onToggle: () => void;
};

function StepCheckbox({
  checked,
  onChange,
  id,
}: {
  checked: boolean;
  onChange: () => void;
  id: string;
}) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors duration-150",
        checked && "checkbox-check",
        checked
          ? "border-[#2563EB] bg-[#2563EB]"
          : "border-[#CBD5E1] bg-white hover:border-[#3B82F6]"
      )}
    >
      {checked && (
        <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function GuideStepCard({
  step,
  checked,
  onToggle,
}: GuideStepCardProps) {
  return (
    <article
      id={`step-${step.id}`}
      data-category={step.category}
      className={cn(
        "card-hover mb-3 rounded-xl border border-[#E2E8F0] bg-white p-5 transition-colors duration-150",
        checked && "bg-[#F8FAFC]"
      )}
    >
      <div className="flex gap-4">
        <StepCheckbox
          checked={checked}
          onChange={onToggle}
          id={`checkbox-${step.id}`}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3
              className={cn(
                "font-sans text-[15px] font-medium text-[#0F172A]",
                checked && "text-[#94A3B8] line-through"
              )}
            >
              {step.title}
            </h3>
            <VerifiedBadge date={step.verifiedDate} />
            <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 font-sans text-xs text-[#64748B]">
              {CATEGORY_LABELS[step.category]}
            </span>
          </div>

          <p className="mt-2 line-clamp-3 font-sans text-sm leading-[1.6] text-[#475569]">
            {step.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-4 font-sans text-[13px] text-[#64748B]">
            <span>📄 {step.documents}</span>
            <span>⏱ {step.time}</span>
            <span>💰 {step.cost}</span>
          </div>

          <a
            href={step.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block font-sans text-[13px] text-[#2563EB] no-underline hover:text-[#1D4ED8]"
          >
            Official source: {step.officialLabel} →
          </a>
        </div>
      </div>
    </article>
  );
}
