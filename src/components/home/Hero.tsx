"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";

const DESTINATIONS = [
  { value: "Austria", label: "Austria 🇦🇹" },
  { value: "Germany", label: "Germany 🇩🇪" },
  { value: "Switzerland", label: "Switzerland 🇨🇭" },
] as const;

const ORIGINS = [
  { value: "Georgia", label: "Georgia 🇬🇪" },
  { value: "Ukraine", label: "Ukraine 🇺🇦" },
  { value: "Armenia", label: "Armenia 🇦🇲" },
  { value: "India", label: "India 🇮🇳" },
  { value: "Other", label: "Other" },
] as const;

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-success"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
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
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <label htmlFor={id} className="font-body text-sm font-medium text-text-dark">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-[10px] border border-border bg-white py-3 pl-4 pr-10 font-body text-sm text-text-dark outline-none transition-colors focus:border-blue focus:ring-2 focus:ring-blue/15"
          style={{ borderWidth: "1px", paddingRight: "2.5rem" }}
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
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-text-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

const TRUST_ITEMS = [
  "Official sources only",
  "Updated weekly",
  "Free to start",
] as const;

export default function Hero() {
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
    <section
      className="bg-ice px-6 py-20 sm:px-8"
      style={{ paddingTop: "80px", paddingBottom: "80px" }}
    >
      <div className="mx-auto max-w-3xl">
        <span
          className="inline-block rounded-[20px] px-3.5 py-1.5 font-body text-xs font-medium"
          style={{ backgroundColor: "#E6F1FB", color: "#185FA5" }}
        >
          Trusted by 2,400+ expats across Europe
        </span>

        <h1 className="mt-6 font-display text-4xl leading-[1.15] tracking-tight text-navy sm:text-[52px]">
          Move to Europe
          <br />
          with{" "}
          <span className="text-gold">confidence</span>
          <span className="text-navy">.</span>
        </h1>

        <div className="mt-6 max-w-[480px] font-body text-[17px] leading-[1.65] text-text-mid">
          <p>
            Step-by-step relocation guides for Austria, Germany and Switzerland.
          </p>
          <p className="mt-1">
            Verified information. Official sources. Always up to date.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-end">
          <SelectField
            id="destination"
            label="I am moving to..."
            value={destination}
            onChange={setDestination}
            options={DESTINATIONS}
            placeholder="Select country"
          />
          <SelectField
            id="origin"
            label="I am from..."
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
            "mt-6 rounded-[10px] bg-blue font-body text-base font-medium text-white transition-colors",
            "hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
          )}
          style={{ padding: "14px 32px" }}
        >
          Get my free guide →
        </button>

        <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 font-body text-[13px] text-text-mid"
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
