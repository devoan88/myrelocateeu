"use client";

import Link from "next/link";
import { useState } from "react";
import type { PaidPlanTier } from "@/lib/constants";
import {
  FAQ_ITEMS,
  FREE_FEATURES,
  PREMIUM_FEATURES,
  PRO_FEATURES,
  TRUST_ITEMS,
  type PlanFeature,
} from "@/lib/pricing/plans";
import { cn } from "@/lib/cn";

type BillingCycle = "monthly" | "yearly";

function CheckIcon({ included }: { included: boolean }) {
  if (included) {
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
        />
      </svg>
    );
  }
  return (
    <span className="flex h-4 w-4 shrink-0 items-center justify-center text-sm text-[#CBD5E1]">
      ✕
    </span>
  );
}

function FeatureList({ features }: { features: PlanFeature[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {features.map((f) => (
        <li
          key={f.text}
          className={cn(
            "flex items-start gap-2.5 font-sans text-sm",
            f.included ? "text-[#0F172A]" : "text-[#94A3B8]"
          )}
        >
          <CheckIcon included={f.included} />
          {f.text}
        </li>
      ))}
    </ul>
  );
}

function CheckoutButton({
  plan,
  billingCycle,
  userId,
  children,
  variant,
}: {
  plan: PaidPlanTier;
  billingCycle: BillingCycle;
  userId?: string | null;
  children: React.ReactNode;
  variant: "primary" | "outline";
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billingCycle, userId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Unable to start checkout. Check Stripe configuration.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "mt-8 w-full rounded-lg py-3 font-sans text-[15px] font-medium transition-colors disabled:opacity-50",
        variant === "primary"
          ? "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
          : "border border-[#0F172A] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
      )}
    >
      {loading ? "Redirecting to Stripe…" : children}
    </button>
  );
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-16 max-w-[640px]">
      <h2 className="text-center font-sans text-xl font-semibold text-[#0F172A]">
        Frequently asked questions
      </h2>
      <div className="mt-8 divide-y divide-[#E2E8F0] rounded-xl border border-[#E2E8F0] bg-white">
        {FAQ_ITEMS.map((item, index) => {
          const open = openIndex === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-sm font-medium text-[#0F172A]"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
              >
                {item.question}
                <span className="text-[#94A3B8]">{open ? "−" : "+"}</span>
              </button>
              {open && (
                <p className="px-5 pb-4 font-sans text-sm leading-relaxed text-[#475569]">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type PricingPageClientProps = {
  currentPlan: "free" | "premium" | "pro";
  userId?: string | null;
  successMessage?: string;
};

export default function PricingPageClient({
  currentPlan,
  userId,
  successMessage,
}: PricingPageClientProps) {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const isYearly = billing === "yearly";

  return (
    <div className="bg-white">
      {successMessage && (
        <div className="mx-auto max-w-3xl px-6 pt-6">
          <div className="rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-center font-sans text-sm text-[#16A34A]">
            {successMessage}
          </div>
        </div>
      )}

      <header className="px-6 pb-12 pt-20 text-center">
        <p className="font-sans text-[13px] font-medium uppercase tracking-wider text-[#2563EB]">
          Pricing
        </p>
        <h1 className="mt-3 font-sans text-[44px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]">
          Start free. Upgrade when ready.
        </h1>
        <p className="mt-4 font-sans text-lg text-[#475569]">
          No hidden fees. Cancel anytime.
        </p>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="inline-flex rounded-full border border-[#E2E8F0] bg-[#F8FAFC] p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={cn(
                "rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors",
                !isYearly
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B]"
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={cn(
                "rounded-full px-4 py-2 font-sans text-sm font-medium transition-colors",
                isYearly
                  ? "bg-white text-[#0F172A] shadow-sm"
                  : "text-[#64748B]"
              )}
            >
              Yearly (save 31%)
            </button>
          </div>
          {isYearly && (
            <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 font-sans text-xs font-medium text-[#2563EB]">
              2 months free
            </span>
          )}
        </div>
      </header>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-[960px] gap-4 lg:grid-cols-3 lg:items-start">
          {/* Free */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <p className="font-sans text-base font-medium text-[#475569]">Free</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-sans text-[40px] font-semibold text-[#0F172A]">
                €0
              </span>
              <span className="font-sans text-base text-[#94A3B8]">/forever</span>
            </div>
            <hr className="my-6 border-[#E2E8F0]" />
            <FeatureList features={FREE_FEATURES} />
            <Link
              href="/auth/register"
              className="mt-8 block w-full rounded-lg border border-[#0F172A] py-3 text-center font-sans text-[15px] font-medium text-[#0F172A] no-underline transition-colors hover:bg-[#F8FAFC]"
            >
              Get started free
            </Link>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border-2 border-[#3B82F6] bg-white p-6">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#EFF6FF] px-2.5 py-0.5 font-sans text-xs font-medium text-[#2563EB]">
              Most popular
            </span>
            <p className="font-sans text-base font-medium text-[#475569]">
              Premium
            </p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-sans text-[40px] font-semibold text-[#0F172A]">
                {isYearly ? "€99" : "€12"}
              </span>
              <span className="font-sans text-base text-[#94A3B8]">
                /{isYearly ? "yr" : "mo"}
              </span>
            </div>
            {isYearly && (
              <p className="mt-1 font-sans text-sm text-[#64748B]">
                €8.25/month, billed annually
              </p>
            )}
            <hr className="my-6 border-[#E2E8F0]" />
            <FeatureList features={PREMIUM_FEATURES} />
            {currentPlan === "premium" || currentPlan === "pro" ? (
              <div className="mt-8 rounded-lg bg-[#F0FDF4] py-3 text-center font-sans text-sm font-medium text-[#16A34A]">
                {currentPlan === "pro" ? "Included in Pro" : "Current plan"}
              </div>
            ) : (
              <CheckoutButton
                plan="premium"
                billingCycle={billing}
                userId={userId}
                variant="primary"
              >
                Start Premium
              </CheckoutButton>
            )}
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <p className="font-sans text-base font-medium text-[#475569]">Pro</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-sans text-[40px] font-semibold text-[#0F172A]">
                {isYearly ? "€249" : "€29"}
              </span>
              <span className="font-sans text-base text-[#94A3B8]">
                /{isYearly ? "yr" : "mo"}
              </span>
            </div>
            <hr className="my-6 border-[#E2E8F0]" />
            <FeatureList features={PRO_FEATURES} />
            {currentPlan === "pro" ? (
              <div className="mt-8 rounded-lg bg-[#F0FDF4] py-3 text-center font-sans text-sm font-medium text-[#16A34A]">
                Current plan
              </div>
            ) : (
              <CheckoutButton
                plan="pro"
                billingCycle={billing}
                userId={userId}
                variant="outline"
              >
                Start Pro
              </CheckoutButton>
            )}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-[960px] flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {TRUST_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 font-sans text-[13px] text-[#475569]"
            >
              <svg
                className="h-4 w-4 text-[#16A34A]"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3.5 8.5L6.5 11.5L12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
              {item}
            </span>
          ))}
        </div>

        <FaqAccordion />
      </section>
    </div>
  );
}
