"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  ALL_CITIES,
  BREAKDOWN_META,
  buildSummaryLabel,
  calculateMonthlyCosts,
  CITY_FLAGS,
  estimateGrossSalary,
  formatComparisonDiff,
  type ApartmentSize,
  type City,
  type CostInputs,
  type Lifestyle,
} from "@/lib/cost-simulator/calculate";

const APARTMENTS: ApartmentSize[] = [
  "Studio",
  "1 bedroom",
  "2 bedrooms",
  "3 bedrooms",
];

const LIFESTYLES: Lifestyle[] = [
  "Budget",
  "Standard",
  "Comfortable",
  "Premium",
];

const DEFAULT_INPUTS: CostInputs = {
  city: "Vienna",
  adults: 2,
  children: 1,
  apartment: "2 bedrooms",
  lifestyle: "Standard",
  hasCar: false,
  privateInsurance: false,
  internationalSchool: false,
};

function SliderRow({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-3">
      <div className="flex items-center justify-between font-sans text-sm font-medium text-[#0F172A]">
        <span>{label}</span>
        <span className="tabular-nums text-[#475569]">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#2563EB]"
      />
    </div>
  );
}

function PillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="font-sans text-sm font-medium text-[#0F172A]">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full px-3 py-1.5 font-sans text-sm transition-colors",
              value === opt
                ? "bg-[#2563EB] text-white"
                : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ExtraCheckbox({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 font-sans text-sm text-[#475569]",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-[#CBD5E1] accent-[#2563EB]"
      />
      {label}
    </label>
  );
}

export default function CostSimulator() {
  const [inputs, setInputs] = useState<CostInputs>(DEFAULT_INPUTS);

  const result = useMemo(() => calculateMonthlyCosts(inputs), [inputs]);

  const comparisons = useMemo(
    () =>
      ALL_CITIES.map((city) => ({
        city,
        ...calculateMonthlyCosts(inputs, city),
      })),
    [inputs]
  );

  const patch = (partial: Partial<CostInputs>) =>
    setInputs((prev) => {
      const next = { ...prev, ...partial };
      if (partial.children === 0) {
        next.internationalSchool = false;
      }
      return next;
    });

  const grossSalary = estimateGrossSalary(result.total);
  const summaryLabel = buildSummaryLabel(inputs);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 lg:flex-row lg:items-start lg:gap-10 lg:py-10">
        {/* Left panel — controls */}
        <aside className="w-full shrink-0 space-y-5 lg:sticky lg:top-8 lg:w-[40%]">
          <div>
            <p className="font-sans text-xs font-medium uppercase tracking-wide text-[#64748B]">
              Configure your life
            </p>
            <h2 className="mt-1 font-sans text-base font-semibold text-[#0F172A]">
              Your situation
            </h2>
          </div>

          <div>
            <p className="mb-2 font-sans text-sm font-medium text-[#0F172A]">
              City
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ALL_CITIES.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => patch({ city })}
                  className={cn(
                    "rounded-lg border px-2.5 py-2.5 font-sans text-sm transition-colors",
                    inputs.city === city
                      ? "border-[#2563EB] bg-[#2563EB] text-white"
                      : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#CBD5E1]"
                  )}
                >
                  {city} {CITY_FLAGS[city]}
                </button>
              ))}
            </div>
          </div>

          <SliderRow
            label="Adults"
            value={inputs.adults}
            min={1}
            max={4}
            onChange={(adults) => patch({ adults })}
          />

          <SliderRow
            label="Children"
            value={inputs.children}
            min={0}
            max={5}
            onChange={(children) => patch({ children })}
          />

          <PillGroup
            label="Apartment size"
            options={APARTMENTS}
            value={inputs.apartment}
            onChange={(apartment) => patch({ apartment })}
          />

          <PillGroup
            label="Lifestyle"
            options={LIFESTYLES}
            value={inputs.lifestyle}
            onChange={(lifestyle) => patch({ lifestyle })}
          />

          <div className="space-y-3 rounded-lg border border-[#E2E8F0] bg-white p-4">
            <p className="font-sans text-sm font-medium text-[#0F172A]">Extras</p>
            <ExtraCheckbox
              label="Car ownership"
              checked={inputs.hasCar}
              onChange={(hasCar) => patch({ hasCar })}
            />
            <ExtraCheckbox
              label="Private health insurance"
              checked={inputs.privateInsurance}
              onChange={(privateInsurance) => patch({ privateInsurance })}
            />
            <ExtraCheckbox
              label="International school"
              checked={inputs.internationalSchool}
              onChange={(internationalSchool) => patch({ internationalSchool })}
              disabled={inputs.children === 0}
            />
          </div>
        </aside>

        {/* Right panel — results */}
        <div className="min-w-0 flex-1 lg:w-[60%]">
          <p className="font-sans text-xs font-medium uppercase tracking-wide text-[#64748B]">
            Your estimated costs
          </p>

          <p className="mt-4 font-sans text-[40px] font-semibold leading-none text-[#0F172A]">
            €{result.total.toLocaleString()}
            <span className="text-2xl font-normal text-[#64748B]"> / month</span>
          </p>
          <p className="mt-2 font-sans text-sm text-[#475569]">{summaryLabel}</p>
          <p className="mt-1 font-sans text-sm text-[#475569]">
            You need approximately €{grossSalary.toLocaleString()} gross salary
          </p>

          <div className="mt-8 space-y-4">
            {BREAKDOWN_META.map(({ key, label, icon }) => {
              const amount = result[key];
              if (key === "childcare" && inputs.children === 0 && amount === 0) {
                return null;
              }
              const pct =
                result.total > 0
                  ? Math.round((amount / result.total) * 100)
                  : 0;

              return (
                <div key={key}>
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="font-sans text-sm text-[#475569]">
                      {icon} {label}
                    </span>
                    <span className="shrink-0 font-sans text-sm font-medium text-[#0F172A]">
                      €{amount.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded bg-[#E2E8F0]">
                    <div
                      className="h-2 rounded bg-[#2563EB] transition-all duration-300 ease-out"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <p className="font-sans text-sm font-semibold text-[#0F172A]">
              vs other cities
            </p>
            <div className="mt-3 overflow-hidden rounded-lg border border-[#E2E8F0]">
              <table className="w-full font-sans text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-left">
                    <th className="px-4 py-2.5 font-medium text-[#475569]">
                      City
                    </th>
                    <th className="px-4 py-2.5 font-medium text-[#475569]">
                      Monthly total
                    </th>
                    <th className="px-4 py-2.5 font-medium text-[#475569]">
                      vs your city
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map(({ city, total }) => {
                    const selected = city === inputs.city;
                    return (
                      <tr
                        key={city}
                        className={cn(
                          "border-b border-[#E2E8F0] last:border-0",
                          selected && "bg-[#EFF6FF]"
                        )}
                      >
                        <td className="px-4 py-2.5 font-medium text-[#0F172A]">
                          {city} {CITY_FLAGS[city]}
                        </td>
                        <td className="px-4 py-2.5 tabular-nums text-[#0F172A]">
                          €{total.toLocaleString()}
                        </td>
                        <td className="px-4 py-2.5 text-[#475569]">
                          {selected
                            ? "—"
                            : formatComparisonDiff(result.total, total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-8 font-sans text-xs italic leading-relaxed text-[#94A3B8]">
            Estimates based on 2026 data from Numbeo, Statistik Austria, and
            Destatis. Actual costs vary based on neighborhood, lifestyle, and
            individual spending.
          </p>
        </div>
      </div>
    </div>
  );
}
