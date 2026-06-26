"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { PREMIUM_FEATURES } from "@/lib/pricing/plans";
import type { UserProfile } from "@/lib/dashboard/utils";

type BillingTabProps = {
  profile: UserProfile;
};

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BillingTab({ profile }: BillingTabProps) {
  const [loading, setLoading] = useState(false);
  const isPremium = profile.plan === "premium" || profile.plan === "pro";

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "premium", billingCycle: "monthly" }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error ?? "Unable to start checkout.");
      }
    } catch {
      alert("Unable to start checkout.");
    } finally {
      setLoading(false);
    }
  }

  if (isPremium) {
    return (
      <div className="max-w-xl space-y-6">
        <div>
          <h1 className="font-sans text-[28px] font-semibold text-[#0F172A]">
            Billing
          </h1>
          <p className="mt-2 font-sans text-sm text-[#475569]">
            Manage your subscription.
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
          <p className="font-sans text-sm text-[#64748B]">Current plan</p>
          <p className="mt-1 font-sans text-xl font-semibold capitalize text-[#0F172A]">
            {profile.plan}
          </p>
          <p className="mt-4 font-sans text-sm text-[#475569]">
            Renews on{" "}
            <span className="font-medium text-[#0F172A]">
              {formatDate(profile.plan_expires_at)}
            </span>
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block font-sans text-sm text-[#2563EB] no-underline hover:text-[#1D4ED8]"
          >
            Manage or cancel subscription →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="font-sans text-[28px] font-semibold text-[#0F172A]">
          Billing
        </h1>
        <p className="mt-2 font-sans text-sm text-[#475569]">
          Upgrade to unlock the full RelocateEU experience.
        </p>
      </div>

      <div className="rounded-xl border border-[#E2E8F0] bg-white p-6">
        <h2 className="font-sans text-lg font-semibold text-[#0F172A]">
          Unlock the full guide
        </h2>
        <ul className="mt-4 space-y-2.5">
          {PREMIUM_FEATURES.filter((f) => f.included).slice(1).map((feature) => (
            <li
              key={feature.text}
              className="flex items-start gap-2 font-sans text-sm text-[#475569]"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]"
                strokeWidth={2.5}
                aria-hidden
              />
              {feature.text}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={handleUpgrade}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#2563EB] py-3 font-sans text-[15px] font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-50 sm:w-auto sm:px-8"
        >
          {loading ? "Redirecting…" : "Upgrade to Premium — €12/month"}
        </button>
      </div>

      <p className="font-sans text-xs text-[#94A3B8]">
        Secure payment via Stripe. Cancel anytime from your account settings.
      </p>
    </div>
  );
}
