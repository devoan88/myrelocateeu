"use client";

import { useState } from "react";

const DESTINATIONS = ["Austria", "Germany", "Switzerland"] as const;
const ORIGINS = ["Georgia", "Ukraine", "Armenia", "Other"] as const;

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
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-900 shadow-sm transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");

  const canStart = destination && origin;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white px-6 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute top-32 -right-20 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
          AI-powered relocation guidance
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Move to Europe with{" "}
          <span className="text-blue-600">confidence</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Your AI-powered relocation guide for Austria, Germany and Switzerland
        </p>

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-lg shadow-blue-100/50 sm:p-8">
          <div className="flex flex-col gap-5">
            <SelectField
              id="destination"
              label="Destination country"
              value={destination}
              onChange={setDestination}
              options={DESTINATIONS}
              placeholder="Select destination"
            />
            <SelectField
              id="origin"
              label="Origin country"
              value={origin}
              onChange={setOrigin}
              options={ORIGINS}
              placeholder="Select origin"
            />
          </div>

          <button
            type="button"
            disabled={!canStart}
            className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
