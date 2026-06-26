"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HERO_DESTINATIONS } from "@/data/countries";
import { cn } from "@/lib/utils";

const DESTINATIONS = HERO_DESTINATIONS;

const ORIGINS = [
  { value: "Georgia", label: "Georgia 🇬🇪" },
  { value: "Ukraine", label: "Ukraine 🇺🇦" },
  { value: "Armenia", label: "Armenia 🇦🇲" },
  { value: "India", label: "India 🇮🇳" },
  { value: "Other", label: "Other" },
] as const;

const TRUST_ITEMS = [
  "Official government sources only",
  "Information verified every 30 days",
  "Free to start — no credit card",
] as const;

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-[#16A34A]"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-[#0F172A]">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-[44px] w-full appearance-none rounded-lg border border-[#E2E8F0] bg-white",
            "py-[10px] pl-[14px] pr-10 font-sans text-sm text-[#0F172A] outline-none transition-colors",
            "focus:border-[#3B82F6] focus:ring-[3px] focus:ring-[#EFF6FF]"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default function HeroSection({
  headline = "Relocate to Europe without the confusion.",
  headlineColor = "#2563EB",
  headlineSize = "56px",
}: {
  headline?: string;
  headlineColor?: string;
  headlineSize?: string;
}) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");

  const canStart = Boolean(destination && origin);

  function handleGetGuide() {
    if (!canStart) return;
    const params = new URLSearchParams({ destination, origin });
    router.push(`/guide?${params.toString()}`);
  }

  return (
    <section className="bg-white px-6 pt-[90px] pb-[60px]">
      <div className="mx-auto max-w-[1200px]">
        <span className="inline-block rounded-full border border-[#DBEAFE] bg-[#EFF6FF] px-3 py-1.5 font-sans text-xs text-[#2563EB]">
          7 countries · Updated monthly · Official sources only
        </span>

        <h1
          className="mt-6 max-w-[640px] font-sans font-semibold leading-[1.1] tracking-[-0.03em]"
          style={{ color: headlineColor, fontSize: headlineSize }}
        >
          {headline}
        </h1>

        <p className="mt-5 max-w-[520px] font-sans text-[17px] leading-[1.6] text-[#475569]">
          A step-by-step relocation guide for Austria, Germany, Switzerland,
          France, Monaco, Luxembourg, and the Netherlands. Every step links to
          official government sources.
        </p>

        <div className="mt-8 max-w-[560px] rounded-xl border border-[#E2E8F0] bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <SelectField
              id="hero-destination"
              label="I'm moving to..."
              value={destination}
              onChange={setDestination}
              options={DESTINATIONS}
              placeholder="Select country"
            />
            <SelectField
              id="hero-origin"
              label="I'm from..."
              value={origin}
              onChange={setOrigin}
              options={ORIGINS}
              placeholder="Select country"
            />
          </div>

          <button
            type="button"
            disabled={!canStart}
            onClick={handleGetGuide}
            className={cn(
              "mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] font-sans text-[15px] font-medium text-white transition-colors duration-150",
              "hover:bg-[#1D4ED8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            Get my free guide →
          </button>
        </div>

        <ul className="mt-4 flex max-w-[560px] flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-sans text-[13px] text-[#475569]"
            >
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
