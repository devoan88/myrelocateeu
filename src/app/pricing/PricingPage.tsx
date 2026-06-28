"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
    <ul className="mt-6 space-y-2">
      {features.map((f) => (
        <li
          key={f.text}
          className={cn(
            "flex items-start gap-2.5 font-sans text-[13px] leading-[1.8]",
            f.included ? "text-[#0F172A]" : "text-[#CBD5E1]"
          )}
        >
          <CheckIcon included={f.included} />
          {f.text}
        </li>
      ))}
    </ul>
  );
}

function handlePaddleCheckout(plan: string, cycle: string) {
  const priceIds = {
    premium_monthly: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_MONTHLY_ID,
    premium_yearly: process.env.NEXT_PUBLIC_PADDLE_PREMIUM_YEARLY_ID,
    pro_monthly: process.env.NEXT_PUBLIC_PADDLE_PRO_MONTHLY_ID,
    pro_yearly: process.env.NEXT_PUBLIC_PADDLE_PRO_YEARLY_ID,
  };
  const key = `${plan}_${cycle}` as keyof typeof priceIds;
  const priceId = priceIds[key];

  if (!priceId || !window.Paddle) {
    alert("Payment system loading — please try again in a moment.");
    return;
  }

  window.Paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    settings: {
      displayMode: "overlay",
      theme: "light",
      locale: "en",
    },
  });
}

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-[640px] py-[60px]">
      <h2 className="text-center font-sans text-2xl font-semibold text-[#0F172A]">
        Common questions
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

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const isYearly = billing === "yearly";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.onload = () => {
      const token = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      if (token && window.Paddle) {
        window.Paddle.Initialize({
          token,
          eventCallback(data) {
            if (data.name === "checkout.completed") {
              window.location.href = "/dashboard?upgraded=true";
            }
          },
        });
      }
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <header className="px-6 pb-12 pt-20 text-center">
        <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#2563EB]">
          Pricing
        </p>
        <h1 className="mt-3 font-sans text-[44px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]">
          Simple, honest pricing
        </h1>
        <p className="mt-4 font-sans text-lg text-[#475569]">
          Start free. Upgrade when you&apos;re ready.
        </p>

        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
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
                Yearly
              </button>
            </div>
            {isYearly && (
              <span className="rounded-md bg-[#DCFCE7] px-2 py-0.5 font-sans text-xs font-medium text-[#16A34A]">
                Save 31%
              </span>
            )}
          </div>
        </div>
      </header>

      <section className="px-6 pb-16">
        <div className="mx-auto grid max-w-[1000px] gap-5 lg:grid-cols-3 lg:items-start">
          {/* Free */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <p className="font-sans text-sm font-medium text-[#475569]">Free</p>
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
              className="mt-8 flex h-11 w-full items-center justify-center rounded-lg border border-[#E2E8F0] bg-white font-sans text-[15px] font-medium text-[#0F172A] no-underline transition-colors hover:bg-[#F8FAFC]"
            >
              Get started free
            </Link>
          </div>

          {/* Premium */}
          <div className="relative rounded-2xl border-2 border-[#2563EB] bg-white p-6">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#EFF6FF] px-2.5 py-0.5 font-sans text-xs font-medium text-[#2563EB]">
              Most popular
            </span>
            <p className="font-sans text-sm font-medium text-[#2563EB]">Premium</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-sans text-[40px] font-semibold text-[#0F172A]">
                {isYearly ? "€99" : "€12"}
              </span>
              <span className="font-sans text-base text-[#94A3B8]">
                /{isYearly ? "year" : "month"}
              </span>
            </div>
            {isYearly && (
              <p className="mt-1 font-sans text-sm text-[#64748B]">
                €8.25/month — 2 months free
              </p>
            )}
            <hr className="my-6 border-[#E2E8F0]" />
            <FeatureList features={PREMIUM_FEATURES} />
            <button
              type="button"
              onClick={() => handlePaddleCheckout("premium", billing)}
              className="mt-8 flex h-11 w-full items-center justify-center rounded-lg bg-[#2563EB] font-sans text-[15px] font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8]"
            >
              Start Premium
            </button>
          </div>

          {/* Pro */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <p className="font-sans text-sm font-medium text-[#475569]">Pro</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-sans text-[40px] font-semibold text-[#0F172A]">
                {isYearly ? "€249" : "€29"}
              </span>
              <span className="font-sans text-base text-[#94A3B8]">
                /{isYearly ? "year" : "month"}
              </span>
            </div>
            <hr className="my-6 border-[#E2E8F0]" />
            <FeatureList features={PRO_FEATURES} />
            <button
              type="button"
              onClick={() => handlePaddleCheckout("pro", billing)}
              className="mt-8 flex h-11 w-full items-center justify-center rounded-lg border border-[#E2E8F0] bg-white font-sans text-[15px] font-medium text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
            >
              Start Pro
            </button>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1000px] flex-wrap items-center justify-center gap-x-6 gap-y-2">
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
    </main>
  );
}
