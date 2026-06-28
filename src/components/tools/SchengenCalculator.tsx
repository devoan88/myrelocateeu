"use client";

import Link from "next/link";
import { Calendar, ExternalLink, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  calculateSchengenDays,
  createEmptyVisit,
  FINE_ESTIMATES,
  formatDisplayDate,
  getDaysRemaining,
  getEarliestSafeEntryDate,
  getNextRefreshDate,
  getTimelineDays,
  getUsageColor,
  MAX_SCHENGEN_DAYS,
  SCHENGEN_COUNTRIES,
  type SchengenVisit,
} from "@/lib/schengen-calculator/calculate";

function VisitRow({
  visit,
  onChange,
  onRemove,
  canRemove,
}: {
  visit: SchengenVisit;
  onChange: (updated: SchengenVisit) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="grid flex-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="font-sans text-xs font-medium text-[#64748B]">
              Country
            </span>
            <select
              value={visit.country}
              onChange={(e) =>
                onChange({
                  ...visit,
                  country: e.target.value as SchengenVisit["country"],
                })
              }
              className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 font-sans text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
            >
              {SCHENGEN_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="font-sans text-xs font-medium text-[#64748B]">
              Entry date
            </span>
            <input
              type="date"
              value={visit.entryDate}
              onChange={(e) =>
                onChange({ ...visit, entryDate: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 font-sans text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE]"
            />
          </label>

          <label className={cn("block", visit.stillHere && "opacity-50")}>
            <span className="font-sans text-xs font-medium text-[#64748B]">
              Exit date
            </span>
            <input
              type="date"
              value={visit.exitDate}
              disabled={visit.stillHere}
              min={visit.entryDate || undefined}
              onChange={(e) =>
                onChange({ ...visit, exitDate: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 font-sans text-sm text-[#0F172A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] disabled:bg-[#F8FAFC]"
            />
          </label>

          <label className="flex items-end gap-2 pb-1">
            <input
              type="checkbox"
              checked={visit.stillHere}
              onChange={(e) =>
                onChange({
                  ...visit,
                  stillHere: e.target.checked,
                  exitDate: e.target.checked ? "" : visit.exitDate,
                })
              }
              className="h-4 w-4 rounded border-[#CBD5E1] text-[#2563EB] focus:ring-[#2563EB]"
            />
            <span className="font-sans text-sm text-[#475569]">Still here</span>
          </label>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-[#FEF2F2] hover:text-[#DC2626]"
            aria-label="Remove visit"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}

function TimelineBar({
  days,
}: {
  days: ReturnType<typeof getTimelineDays>;
}) {
  return (
    <div className="mt-3">
      <div className="flex h-8 overflow-hidden rounded-lg border border-[#E2E8F0]">
        {days.map((day) => (
          <div
            key={day.date.toISOString()}
            title={formatDisplayDate(day.date)}
            className={cn(
              "min-w-0 flex-1",
              day.inSchengen ? "bg-[#16A34A]" : "bg-[#E2E8F0]",
              day.isToday && "ring-2 ring-inset ring-[#DC2626]"
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between font-sans text-[11px] text-[#94A3B8]">
        <span>180 days ago</span>
        <span className="text-[#DC2626]">Today</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-4 font-sans text-xs text-[#64748B]">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-[#16A34A]" />
          In Schengen
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-[#E2E8F0]" />
          Outside Schengen
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm ring-2 ring-[#DC2626]" />
          Today
        </span>
      </div>
    </div>
  );
}

export default function SchengenCalculator() {
  const [visits, setVisits] = useState<SchengenVisit[]>([createEmptyVisit()]);
  const today = useMemo(() => new Date(), []);

  const daysUsed = useMemo(
    () => calculateSchengenDays(visits, today),
    [visits, today]
  );
  const daysRemaining = useMemo(
    () => getDaysRemaining(visits, today),
    [visits, today]
  );
  const isOverstayed = daysUsed > MAX_SCHENGEN_DAYS;
  const overstayDays = Math.max(0, daysUsed - MAX_SCHENGEN_DAYS);
  const usageColor = getUsageColor(daysUsed);
  const usagePercent = Math.min(100, (daysUsed / MAX_SCHENGEN_DAYS) * 100);
  const nextRefresh = useMemo(
    () => getNextRefreshDate(visits, today),
    [visits, today]
  );
  const earliestSafeEntry = useMemo(
    () => getEarliestSafeEntryDate(visits, today),
    [visits, today]
  );
  const timelineDays = useMemo(
    () => getTimelineDays(visits, today),
    [visits, today]
  );

  function updateVisit(id: string, updated: SchengenVisit) {
    setVisits((prev) => prev.map((v) => (v.id === id ? updated : v)));
  }

  function removeVisit(id: string) {
    setVisits((prev) => prev.filter((v) => v.id !== id));
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#EFF6FF]">
            <Calendar className="h-6 w-6 text-[#2563EB]" aria-hidden />
          </div>
          <h1 className="mt-4 font-sans text-[28px] font-semibold text-[#0F172A] sm:text-[32px]">
            Schengen Stay Calculator
          </h1>
          <p className="mt-2 font-sans text-base text-[#475569]">
            Check how many days you have left — and avoid fines
          </p>
        </div>

        <div className="mt-8 border-l-4 border-[#2563EB] bg-[#EFF6FF] px-5 py-4">
          <p className="font-sans text-sm leading-relaxed text-[#1E40AF]">
            Georgian citizens can stay in the Schengen Area for up to 90 days in
            any 180-day rolling window — visa free. Overstaying can result in
            fines, deportation, and a future entry ban.{" "}
            <span className="font-medium">
              Source: European Commission · Verified June 2026
            </span>
          </p>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-sans text-lg font-semibold text-[#0F172A]">
              Add your Schengen visits
            </h2>
            <button
              type="button"
              onClick={() => setVisits((prev) => [...prev, createEmptyVisit()])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 font-sans text-sm font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Add visit
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {visits.map((visit) => (
              <VisitRow
                key={visit.id}
                visit={visit}
                onChange={(updated) => updateVisit(visit.id, updated)}
                onRemove={() => removeVisit(visit.id)}
                canRemove={visits.length > 1}
              />
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <p className="font-sans text-sm font-medium text-[#64748B]">
              Days used
            </p>
            <p
              className="mt-2 font-sans text-5xl font-semibold tabular-nums"
              style={{ color: usageColor }}
            >
              {daysUsed}
            </p>
            <p className="mt-1 font-sans text-sm text-[#475569]">
              You have used {daysUsed} of {MAX_SCHENGEN_DAYS} days
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${usagePercent}%`,
                  backgroundColor: usageColor,
                }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <p className="font-sans text-sm font-medium text-[#64748B]">
              Days remaining
            </p>
            <p
              className="mt-2 font-sans text-5xl font-semibold tabular-nums"
              style={{ color: isOverstayed ? "#DC2626" : usageColor }}
            >
              {isOverstayed ? 0 : daysRemaining}
            </p>
            <p className="mt-1 font-sans text-sm text-[#475569]">
              {isOverstayed
                ? "You have exceeded the 90-day limit"
                : `You have ${daysRemaining} days left in this 180-day window`}
            </p>
          </div>
        </section>

        {nextRefresh && !isOverstayed && daysUsed >= MAX_SCHENGEN_DAYS && (
          <div className="mt-4 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4">
            <p className="font-sans text-sm text-[#92400E]">
              Your 90-day allowance starts refreshing on{" "}
              <strong>{formatDisplayDate(nextRefresh)}</strong>
            </p>
          </div>
        )}

        <div className="mt-4 rounded-xl border border-[#E2E8F0] bg-white p-5">
          <p className="font-sans text-sm font-medium text-[#0F172A]">
            Next reset date
          </p>
          <p className="mt-1 font-sans text-sm text-[#475569]">
            {nextRefresh
              ? `Your 90-day allowance starts refreshing on ${formatDisplayDate(nextRefresh)}.`
              : daysUsed < MAX_SCHENGEN_DAYS
                ? "You still have days available in your current 180-day window."
                : "Calculate your visits to see when days become available again."}
          </p>
          <p className="mt-2 font-sans text-xs text-[#94A3B8]">
            The 180-day window rolls daily — it is not a fixed calendar period.
          </p>
        </div>

        {earliestSafeEntry && (
          <div className="mt-4 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-5">
            <p className="font-sans text-sm font-medium text-[#1E40AF]">
              Earliest safe entry date: {formatDisplayDate(earliestSafeEntry)}
            </p>
            <p className="mt-1 font-sans text-sm text-[#475569]">
              Based on your visit history, this is the first date when your
              rolling 180-day count drops below 90 days.
            </p>
          </div>
        )}

        {isOverstayed && (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-5">
              <p className="font-sans text-base font-semibold text-[#DC2626]">
                ⚠️ You have overstayed by {overstayDays} day
                {overstayDays === 1 ? "" : "s"}
              </p>

              <div className="mt-4">
                <p className="font-sans text-sm font-medium text-[#0F172A]">
                  Fine estimates by country
                </p>
                <ul className="mt-2 space-y-2">
                  {FINE_ESTIMATES.map(({ country, fine }) => (
                    <li
                      key={country}
                      className="font-sans text-sm text-[#475569]"
                    >
                      <strong className="text-[#0F172A]">{country}:</strong>{" "}
                      {fine}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-sans text-xs text-[#64748B]">
                  These are estimates. Actual fines vary by circumstances and
                  are set by each country&apos;s immigration authority.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-5">
              <p className="font-sans text-sm font-semibold text-[#991B1B]">
                Potential consequences of overstaying:
              </p>
              <ul className="mt-2 space-y-1 font-sans text-sm text-[#7F1D1D]">
                <li>· Deportation at your own expense</li>
                <li>· Entry ban (1–5 years or permanent)</li>
                <li>· Difficulty obtaining future Schengen visas</li>
                <li>· Criminal record in some countries</li>
              </ul>
              <Link
                href="/guide?destination=Germany&origin=Georgia"
                className="mt-4 inline-flex items-center gap-1 font-sans text-sm font-medium text-[#DC2626] no-underline hover:underline"
              >
                Get help understanding your options →
              </Link>
            </div>
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-6">
          <h2 className="font-sans text-lg font-semibold text-[#0F172A]">
            180-day timeline
          </h2>
          <p className="mt-1 font-sans text-sm text-[#475569]">
            Your last 180 days at a glance — green shows days spent in Schengen.
          </p>
          <TimelineBar days={timelineDays} />
        </section>

        <section className="mt-8 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-5">
          <p className="font-sans text-sm font-medium text-[#92400E]">
            Important disclaimer
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-[#78350F]">
            This calculator is for informational purposes only. Immigration
            rules can change. Always verify with the official European
            Commission website before travel. This is not legal advice.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
            <a
              href="https://www.schengenvisainfo.com/visa-calculator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans text-sm text-[#2563EB] no-underline hover:underline"
            >
              Schengen visa calculator
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a
              href="https://ec.europa.eu/home-affairs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans text-sm text-[#2563EB] no-underline hover:underline"
            >
              European Commission — Home Affairs
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
