"use client";

import { useState } from "react";
import type { PaidPlanTier } from "@/lib/constants";
import { PRICING } from "@/lib/constants";

type SubscribeButtonProps = {
  plan: PaidPlanTier;
  variant?: "primary" | "pro";
};

export default function SubscribeButton({
  plan,
  variant = "primary",
}: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const price = PRICING[plan].price;

  async function handleSubscribe() {
    setLoading(true);
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billingCycle: "monthly" }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Unable to start checkout. Please check Stripe configuration.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const styles =
    variant === "pro"
      ? "bg-slate-900 hover:bg-slate-800 shadow-slate-900/20"
      : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20";

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      disabled={loading}
      className={`w-full rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all disabled:cursor-not-allowed disabled:opacity-70 ${styles}`}
    >
      {loading ? "Redirecting to Stripe…" : `Subscribe for €${price}/month`}
    </button>
  );
}
