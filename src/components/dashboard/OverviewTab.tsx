"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import type { DestinationCountry } from "@/lib/checklists";
import { getGuideSteps } from "@/lib/guide/steps";
import type { GuideStep, GuideStepCategory } from "@/lib/guide/types";
import { CATEGORY_LABELS } from "@/lib/guide/types";
import { formatRelativeTime, getGreeting } from "@/lib/dashboard/utils";
import type { UserProfile } from "@/lib/dashboard/utils";
import { cn } from "@/lib/cn";

const CATEGORY_ICONS: Record<GuideStepCategory, LucideIcon> = {
  registration: Landmark,
  banking: Building2,
  healthcare: HeartPulse,
  housing: Home,
  work: Briefcase,
  school: GraduationCap,
};

type OverviewTabProps = {
  profile: UserProfile;
  progress: Record<string, boolean>;
  completedAt: Record<string, string>;
};

function ProgressRing({ percentage }: { percentage: number }) {
  const [animated, setAnimated] = useState(0);
  const r = 70;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - animated / 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160" aria-hidden>
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke="#2563EB"
          strokeWidth="10"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-sans text-[36px] font-semibold leading-none text-[#0F172A]">
          {percentage}%
        </span>
        <span className="mt-1 font-sans text-sm text-[#64748B]">complete</span>
      </div>
    </div>
  );
}

function buildGuideHref(profile: UserProfile): string {
  const destination = profile.destination_country ?? "Austria";
  const origin = profile.origin_country ?? "Other";
  const params = new URLSearchParams({
    destination,
    origin,
    ...(profile.has_children ? { hasChildren: "true" } : {}),
  });
  return `/guide?${params.toString()}`;
}

export default function OverviewTab({
  profile,
  progress,
  completedAt,
}: OverviewTabProps) {
  const destination = (profile.destination_country ?? "Austria") as DestinationCountry;
  const steps = useMemo(
    () => getGuideSteps(destination, profile.has_children),
    [destination, profile.has_children]
  );

  const completedCount = steps.filter((s) => progress[s.id]).length;
  const percentage =
    steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  const categories = useMemo(() => {
    const seen = new Set<GuideStepCategory>();
    const list: GuideStepCategory[] = [];
    for (const step of steps) {
      if (!seen.has(step.category)) {
        seen.add(step.category);
        list.push(step.category);
      }
    }
    return list;
  }, [steps]);

  const nextSteps = steps.filter((s) => !progress[s.id]).slice(0, 3);

  const recentActivity = useMemo(() => {
    return steps
      .filter((s) => progress[s.id])
      .map((step) => ({
        step,
        at: completedAt[step.id] ?? new Date().toISOString(),
      }))
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
      .slice(0, 5);
  }, [steps, progress, completedAt]);

  const firstName =
    profile.full_name?.trim().split(/\s+/)[0] ??
    profile.email.split("@")[0];

  const guideHref = buildGuideHref(profile);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-sans text-[28px] font-semibold text-[#0F172A]">
          {getGreeting()}, {firstName}.
        </h1>
        <p className="mt-2 font-sans text-base text-[#475569]">
          Your {destination} relocation is {percentage}% complete.
        </p>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        <ProgressRing percentage={percentage} />

        <div className="grid w-full flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const inCategory = steps.filter((s) => s.category === cat);
            const done = inCategory.filter((s) => progress[s.id]).length;
            const total = inCategory.length;
            const pct = total > 0 ? (done / total) * 100 : 0;

            return (
              <div
                key={cat}
                className="rounded-lg border border-[#E2E8F0] bg-white p-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden />
                  <span className="font-sans text-xs font-medium text-[#0F172A]">
                    {CATEGORY_LABELS[cat]}
                  </span>
                </div>
                <p className="mt-2 font-sans text-xs text-[#64748B]">
                  {done} of {total}
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#E2E8F0]">
                  <div
                    className="progress-bar h-full rounded-full bg-[#2563EB]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <section>
        <h2 className="font-sans text-lg font-semibold text-[#0F172A]">
          Up next
        </h2>
        <div className="mt-4 space-y-3">
          {nextSteps.length === 0 ? (
            <p className="font-sans text-sm text-[#475569]">
              All steps complete — well done!
            </p>
          ) : (
            nextSteps.map((step) => (
              <CompactStepCard
                key={step.id}
                step={step}
                guideHref={guideHref}
              />
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="font-sans text-lg font-semibold text-[#0F172A]">
          Recent activity
        </h2>
        {recentActivity.length === 0 ? (
          <p className="mt-4 font-sans text-sm text-[#475569]">
            No completed steps yet.{" "}
            <Link href={guideHref} className="text-[#2563EB] no-underline">
              Start your checklist →
            </Link>
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {recentActivity.map(({ step, at }) => (
              <li key={step.id} className="flex gap-3">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#2563EB]"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-sm text-[#0F172A]">
                    You completed{" "}
                    <span className="font-medium">{step.title}</span>
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-[#94A3B8]">
                    {formatRelativeTime(at)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function CompactStepCard({
  step,
  guideHref,
}: {
  step: GuideStep;
  guideHref: string;
}) {
  return (
    <article className="flex items-start justify-between gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-sans text-sm font-medium text-[#0F172A]">
            {step.title}
          </h3>
          <VerifiedBadge date={step.verifiedDate} />
        </div>
        <p className="mt-1 line-clamp-2 font-sans text-xs leading-relaxed text-[#475569]">
          {step.description}
        </p>
      </div>
      <Link
        href={`${guideHref}#step-${step.id}`}
        className="shrink-0 font-sans text-sm text-[#2563EB] no-underline hover:text-[#1D4ED8]"
      >
        Continue →
      </Link>
    </article>
  );
}
