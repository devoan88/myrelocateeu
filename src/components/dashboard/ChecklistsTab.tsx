"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { DestinationCountry } from "@/lib/checklists";
import { DESTINATION_COUNTRIES, isDestinationCountry } from "@/lib/checklists";
import { getGuideSteps, DESTINATION_FLAGS } from "@/lib/guide/steps";
import type { UserProfile } from "@/lib/dashboard/utils";

type ChecklistsTabProps = {
  profile: UserProfile;
  progressByCountry: Record<string, Record<string, boolean>>;
};

export default function ChecklistsTab({
  profile,
  progressByCountry,
}: ChecklistsTabProps) {
  const destination = profile.destination_country;
  const destinations: DestinationCountry[] = useMemo(() => {
    if (destination && isDestinationCountry(destination)) {
      return [destination];
    }
    return DESTINATION_COUNTRIES.slice(0, 3);
  }, [destination]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-[28px] font-semibold text-[#0F172A]">
          My checklists
        </h1>
        <p className="mt-2 font-sans text-sm text-[#475569]">
          Continue your relocation guides.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((country) => {
          const steps = getGuideSteps(country, profile.has_children);
          const countryProgress = progressByCountry[country] ?? {};
          const completed = steps.filter((s) => countryProgress[s.id]).length;
          const pct =
            steps.length > 0
              ? Math.round((completed / steps.length) * 100)
              : 0;
          const origin = profile.origin_country ?? "Other";
          const params = new URLSearchParams({
            destination: country,
            origin,
            ...(profile.has_children ? { hasChildren: "true" } : {}),
          });

          return (
            <Link
              key={country}
              href={`/guide?${params.toString()}`}
              className="rounded-xl border border-[#E2E8F0] bg-white p-5 no-underline transition-colors hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl" aria-hidden>
                  {DESTINATION_FLAGS[country]}
                </span>
                <span className="font-sans text-base font-semibold text-[#0F172A]">
                  {country}
                </span>
              </div>
              <p className="mt-3 font-sans text-sm text-[#475569]">
                {completed} of {steps.length} steps · {pct}% complete
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  className="h-full rounded-full bg-[#2563EB]"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="mt-4 inline-block font-sans text-sm text-[#2563EB]">
                Open checklist →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
