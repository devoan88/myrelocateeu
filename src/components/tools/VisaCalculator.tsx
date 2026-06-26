"use client";

import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Info,
} from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  BAND_COLORS,
  calculateScore,
  getImprovements,
  getScoreBand,
  getSourceNote,
  getStrengths,
  originFromNationality,
  type CalculatorAnswers,
  type Destination,
  type Education,
  type GermanLevel,
  type VisaType,
} from "@/lib/visa-calculator/scoring";

const DESTINATIONS: { value: Destination; flag: string }[] = [
  { value: "Austria", flag: "🇦🇹" },
  { value: "Germany", flag: "🇩🇪" },
  { value: "Switzerland", flag: "🇨🇭" },
];

const VISA_TYPES: VisaType[] = [
  "Work",
  "Family reunification",
  "Student",
  "Digital Nomad",
  "Retirement",
];

const EDUCATION_OPTIONS: Education[] = [
  "High school",
  "Bachelor's",
  "Master's",
  "PhD",
];

const GERMAN_LEVELS: GermanLevel[] = [
  "None",
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
];

const NATIONALITIES = [
  "Georgia",
  "Ukraine",
  "India",
  "United States",
  "United Kingdom",
  "Turkey",
  "Russia",
  "China",
  "Pakistan",
  "Nigeria",
  "Brazil",
  "Philippines",
  "Egypt",
  "Morocco",
  "Serbia",
  "Albania",
  "Vietnam",
  "Indonesia",
  "Bangladesh",
  "Other",
] as const;

const STEP_LABELS = [
  "Where are you moving?",
  "What type of permit?",
  "Your profile",
  "Your situation",
] as const;

const INITIAL: CalculatorAnswers = {
  destination: null,
  visaType: null,
  education: null,
  workExperience: 0,
  germanLevel: null,
  jobOffer: false,
  monthlyIncome: 0,
  nationality: null,
  movingWithFamily: false,
  euStatus: false,
};

function StepProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10 flex items-center justify-center">
      {[1, 2, 3, 4].map((n, index) => {
        const completed = n < currentStep;
        const active = n === currentStep;

        return (
          <div key={n} className="flex items-center">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full font-sans text-sm font-medium transition-colors",
                completed && "bg-[#16A34A] text-white",
                active && "bg-[#2563EB] text-white",
                !completed &&
                  !active &&
                  "border border-[#CBD5E1] bg-white text-[#64748B]"
              )}
            >
              {completed ? (
                <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
              ) : (
                n
              )}
            </div>
            {index < 3 && (
              <div
                className={cn(
                  "h-px w-10 sm:w-16",
                  n < currentStep ? "bg-[#16A34A]" : "bg-[#E2E8F0]"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function SelectCard({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-xl border-2 p-5 text-left transition-colors duration-150",
        selected
          ? "border-[#2563EB] bg-[#EFF6FF]"
          : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]",
        className
      )}
    >
      {children}
    </button>
  );
}

function InputCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5">
      <p className="font-sans text-sm font-medium text-[#0F172A]">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function YesNoToggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <InputCard label={label}>
      <div className="flex gap-3">
        {[true, false].map((option) => (
          <button
            key={String(option)}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "flex-1 rounded-lg border-2 py-3 font-sans text-sm font-medium transition-colors",
              value === option
                ? "border-[#2563EB] bg-[#2563EB] text-white"
                : "border-[#E2E8F0] bg-white text-[#475569] hover:border-[#CBD5E1]"
            )}
          >
            {option ? "Yes" : "No"}
          </button>
        ))}
      </div>
    </InputCard>
  );
}

function ScoreRing({ score, band }: { score: number; band: "high" | "medium" | "low" }) {
  const r = 80;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  const { stroke } = BAND_COLORS[band];

  return (
    <div className="relative mx-auto h-52 w-52">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180" aria-hidden>
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="10"
        />
        <circle
          cx="90"
          cy="90"
          r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="10"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "font-sans text-[48px] font-semibold leading-none",
            BAND_COLORS[band].text
          )}
        >
          {score}%
        </span>
      </div>
    </div>
  );
}

function TopDisclaimer() {
  return (
    <div
      className="mb-8 flex gap-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-4"
      role="note"
    >
      <AlertTriangle
        className="mt-0.5 h-5 w-5 shrink-0 text-[#D97706]"
        aria-hidden
      />
      <div>
        <p className="font-sans text-sm font-semibold text-[#0F172A]">
          Important — read before using
        </p>
        <p className="mt-1 font-sans text-sm leading-relaxed text-[#475569]">
          This calculator estimates general eligibility based on publicly
          available criteria. It does not account for your individual
          circumstances. Immigration decisions involve many factors not captured
          here. This is not legal advice. Always consult a licensed immigration
          lawyer for your specific situation.
        </p>
      </div>
    </div>
  );
}

export default function VisaCalculator() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<CalculatorAnswers>(INITIAL);
  const [showResult, setShowResult] = useState(false);

  const score = useMemo(() => calculateScore(answers), [answers]);
  const band = getScoreBand(score);
  const strengths = useMemo(() => getStrengths(answers), [answers]);
  const improvements = useMemo(() => getImprovements(answers), [answers]);

  function next() {
    if (step < 4) setStep((s) => s + 1);
    else setShowResult(true);
  }

  function back() {
    if (showResult) {
      setShowResult(false);
      return;
    }
    if (step > 1) setStep((s) => s - 1);
  }

  const canNext =
    (step === 1 && answers.destination) ||
    (step === 2 && answers.visaType) ||
    (step === 3 && answers.education && answers.germanLevel !== null) ||
    (step === 4 && answers.nationality);

  const guideHref = answers.destination
    ? `/guide?destination=${encodeURIComponent(answers.destination)}&origin=${encodeURIComponent(originFromNationality(answers.nationality))}${
        answers.movingWithFamily ? "&hasChildren=true" : ""
      }`
    : "/";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="mx-auto max-w-[800px] px-6 py-8 lg:px-8 lg:py-10">
        <TopDisclaimer />

        {!showResult ? (
          <>
            <StepProgress currentStep={step} />

            <h1 className="font-sans text-[28px] font-semibold text-[#0F172A]">
              {STEP_LABELS[step - 1]}
            </h1>

            <div className="mt-8">
              {step === 1 && (
                <div>
                  <p className="font-sans text-base text-[#475569]">
                    Select your destination
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {DESTINATIONS.map((d) => (
                      <SelectCard
                        key={d.value}
                        selected={answers.destination === d.value}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, destination: d.value }))
                        }
                        className="text-center"
                      >
                        <span className="text-[40px] leading-none">{d.flag}</span>
                        <p className="mt-2 font-sans text-base font-semibold text-[#0F172A]">
                          {d.value}
                        </p>
                      </SelectCard>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {VISA_TYPES.map((type) => (
                    <SelectCard
                      key={type}
                      selected={answers.visaType === type}
                      onClick={() =>
                        setAnswers((a) => ({ ...a, visaType: type }))
                      }
                    >
                      <p className="font-sans text-sm font-medium text-[#0F172A]">
                        {type}
                      </p>
                    </SelectCard>
                  ))}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <InputCard label="Highest completed education">
                    <div className="flex flex-wrap gap-2">
                      {EDUCATION_OPTIONS.map((edu) => (
                        <button
                          key={edu}
                          type="button"
                          onClick={() =>
                            setAnswers((a) => ({ ...a, education: edu }))
                          }
                          className={cn(
                            "rounded-full px-4 py-2 font-sans text-sm transition-colors",
                            answers.education === edu
                              ? "bg-[#2563EB] text-white"
                              : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                          )}
                        >
                          {edu}
                        </button>
                      ))}
                    </div>
                  </InputCard>

                  <InputCard label="Years of relevant work experience">
                    <div className="flex items-center justify-between gap-4">
                      <input
                        type="range"
                        min={0}
                        max={25}
                        step={1}
                        value={answers.workExperience}
                        onChange={(e) =>
                          setAnswers((a) => ({
                            ...a,
                            workExperience: Number(e.target.value),
                          }))
                        }
                        className="min-w-0 flex-1 accent-[#2563EB]"
                      />
                      <span className="shrink-0 font-sans text-[28px] font-semibold tabular-nums text-[#0F172A]">
                        {answers.workExperience}{" "}
                        <span className="text-base font-normal text-[#64748B]">
                          years
                        </span>
                      </span>
                    </div>
                  </InputCard>

                  <InputCard label="German language level (or French for Switzerland)">
                    <select
                      value={answers.germanLevel ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({
                          ...a,
                          germanLevel: e.target.value as GermanLevel,
                        }))
                      }
                      className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 font-sans text-sm text-[#0F172A] outline-none focus:border-[#2563EB]"
                    >
                      <option value="" disabled>
                        Select level
                      </option>
                      {GERMAN_LEVELS.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </InputCard>

                  <YesNoToggle
                    label="Do you have a job offer in the destination country?"
                    value={answers.jobOffer}
                    onChange={(jobOffer) =>
                      setAnswers((a) => ({ ...a, jobOffer }))
                    }
                  />

                  <InputCard label="Your current monthly net income">
                    <div className="flex items-center justify-between gap-4">
                      <input
                        type="range"
                        min={0}
                        max={8000}
                        step={100}
                        value={answers.monthlyIncome}
                        onChange={(e) =>
                          setAnswers((a) => ({
                            ...a,
                            monthlyIncome: Number(e.target.value),
                          }))
                        }
                        className="min-w-0 flex-1 accent-[#2563EB]"
                      />
                      <span className="shrink-0 font-sans text-[28px] font-semibold tabular-nums text-[#0F172A]">
                        €{answers.monthlyIncome.toLocaleString()}
                        <span className="text-base font-normal text-[#64748B]">
                          {" "}
                          / month
                        </span>
                      </span>
                    </div>
                  </InputCard>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <InputCard label="Nationality">
                    <select
                      value={answers.nationality ?? ""}
                      onChange={(e) =>
                        setAnswers((a) => ({
                          ...a,
                          nationality: e.target.value,
                        }))
                      }
                      className="w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 font-sans text-sm text-[#0F172A] outline-none focus:border-[#2563EB]"
                    >
                      <option value="" disabled>
                        Select nationality
                      </option>
                      {NATIONALITIES.map((nat) => (
                        <option key={nat} value={nat}>
                          {nat}
                        </option>
                      ))}
                    </select>
                  </InputCard>

                  <YesNoToggle
                    label="Moving with family?"
                    value={answers.movingWithFamily}
                    onChange={(movingWithFamily) =>
                      setAnswers((a) => ({ ...a, movingWithFamily }))
                    }
                  />

                  <YesNoToggle
                    label="Current visa/status in any EU country?"
                    value={answers.euStatus}
                    onChange={(euStatus) =>
                      setAnswers((a) => ({ ...a, euStatus }))
                    }
                  />
                </div>
              )}

              <div className="mt-8 flex justify-between gap-4 border-t border-[#E2E8F0] pt-6">
                <button
                  type="button"
                  onClick={back}
                  disabled={step === 1}
                  className="rounded-lg border border-[#E2E8F0] px-5 py-2.5 font-sans text-sm text-[#475569] transition-colors hover:bg-[#F8FAFC] disabled:opacity-40"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={next}
                  disabled={!canNext}
                  className="rounded-lg bg-[#2563EB] px-6 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-50"
                >
                  {step === 4 ? "See results" : "Continue"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <ScoreRing score={score} band={band} />

            <p className="mt-6 text-center font-sans text-base text-[#475569]">
              Estimated eligibility for{" "}
              <span className="font-medium text-[#0F172A]">
                {answers.destination} {answers.visaType}
              </span>
            </p>

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-sans text-sm font-semibold text-[#0F172A]">
                  Factors working for you
                </h2>
                <ul className="mt-4 space-y-3">
                  {strengths.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 font-sans text-sm text-[#475569]"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-sans text-sm font-semibold text-[#0F172A]">
                  Areas to strengthen
                </h2>
                <ul className="mt-4 space-y-3">
                  {improvements.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 font-sans text-sm text-[#475569]"
                    >
                      <ArrowRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]"
                        strokeWidth={2}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex gap-3 rounded-lg border border-[#DBEAFE] bg-[#EFF6FF] p-4">
              <Info
                className="mt-0.5 h-5 w-5 shrink-0 text-[#2563EB]"
                aria-hidden
              />
              <p className="font-sans text-sm leading-relaxed text-[#475569]">
                {getSourceNote(answers.destination)}
              </p>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={guideHref}
                className="inline-flex items-center justify-center rounded-lg bg-[#2563EB] px-8 py-3 font-sans text-sm font-medium text-white no-underline transition-colors hover:bg-[#1D4ED8]"
              >
                Get your full {answers.destination} checklist →
              </Link>
              <button
                type="button"
                onClick={() => {
                  setShowResult(false);
                  setStep(1);
                  setAnswers(INITIAL);
                }}
                className="font-sans text-sm text-[#64748B] hover:text-[#0F172A]"
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
