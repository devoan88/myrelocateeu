"use client";

import Link from "next/link";
import {
  Building2,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import type { GuideStep, GuideStepCategory } from "@/lib/guide/types";
import { CATEGORY_LABELS } from "@/lib/guide/types";
import { DESTINATION_FLAGS } from "@/lib/guide/steps";
import type { DestinationCountry } from "@/lib/checklists";
import { cn } from "@/lib/cn";

const CATEGORY_ICONS: Record<GuideStepCategory, LucideIcon> = {
  registration: Landmark,
  banking: Building2,
  healthcare: HeartPulse,
  housing: Home,
  work: Briefcase,
  school: GraduationCap,
};

type GuideSidebarProps = {
  origin: string;
  destination: DestinationCountry;
  hasChildren: boolean;
  completed: number;
  total: number;
  steps: GuideStep[];
  checked: Record<string, boolean>;
  activeCategory: string | null;
  onCategoryClick: (category: GuideStepCategory) => void;
};

function categoryCounts(
  steps: GuideStep[],
  checked: Record<string, boolean>,
  category: GuideStepCategory
) {
  const inCategory = steps.filter((s) => s.category === category);
  const done = inCategory.filter((s) => checked[s.id]).length;
  return { done, total: inCategory.length };
}

export default function GuideSidebar({
  origin,
  destination,
  hasChildren,
  completed,
  total,
  steps,
  checked,
  activeCategory,
  onCategoryClick,
}: GuideSidebarProps) {
  const categories = [...new Set(steps.map((s) => s.category))];
  const progressPct = total > 0 ? (completed / total) * 100 : 0;

  const editParams = new URLSearchParams({
    destination,
    origin,
    ...(hasChildren ? { hasChildren: "true" } : {}),
  });

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 border-b border-[#E2E8F0] p-6 lg:w-[280px] lg:border-b-0 lg:border-r">
      <div className="rounded-xl bg-[#F8FAFC] p-4">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none" aria-hidden>
            {DESTINATION_FLAGS[destination]}
          </span>
          <p className="font-sans text-sm font-medium text-[#0F172A]">
            Moving to {destination}
          </p>
        </div>
        <p className="mt-1 font-sans text-sm text-[#475569]">
          From {origin}
          {hasChildren ? " · with children" : " · 2 adults"}
        </p>
        <Link
          href={`/?${editParams.toString()}`}
          className="mt-2 inline-block font-sans text-xs text-[#2563EB] no-underline hover:text-[#1D4ED8]"
        >
          Edit
        </Link>
      </div>

      <div>
        <p className="font-sans text-sm font-medium text-[#475569]">
          Your progress
        </p>
        <p className="mt-2 font-sans text-[32px] font-semibold leading-none text-[#0F172A]">
          {completed} / {total}
        </p>
        <p className="mt-1 font-sans text-sm text-[#475569]">steps completed</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-[3px] bg-[#E2E8F0]">
          <div
            className="h-full rounded-[3px] bg-[#2563EB] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <nav aria-label="Guide categories">
        <ul className="flex flex-col gap-1">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const { done, total: catTotal } = categoryCounts(steps, checked, cat);
            const isActive = activeCategory === cat;

            return (
              <li key={cat}>
                <button
                  type="button"
                  onClick={() => onCategoryClick(cat)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 font-sans text-sm transition-colors duration-150",
                    isActive
                      ? "bg-[#EFF6FF] font-medium text-[#2563EB]"
                      : "text-[#475569] hover:bg-[#F8FAFC]"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden />
                    {CATEGORY_LABELS[cat]}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 text-xs tabular-nums",
                      isActive ? "text-[#2563EB]" : "text-[#64748B]"
                    )}
                  >
                    {done}/{catTotal}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
