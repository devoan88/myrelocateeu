export type { PlanTier } from "@/lib/features";
import type { PlanTier } from "@/lib/features";

export type PaidPlanTier = "premium" | "pro";

export const FREE_STEP_LIMIT = 3;
export const PREMIUM_PRICE_EUR = 12;
export const PRO_PRICE_EUR = 29;
export const PREMIUM_CHAT_LIMIT = 50;

export const PRICING = {
  free: {
    id: "free" as const,
    name: "Free",
    price: 0,
    features: [
      "Basic relocation checklist",
      "3 categories covered",
      "Progress tracking",
    ],
  },
  premium: {
    id: "premium" as const,
    name: "Premium",
    price: PREMIUM_PRICE_EUR,
    features: [
      "Full checklist — all categories",
      "AI chat — 50 messages/month",
      "Email support",
      "Verified source citations",
    ],
  },
  pro: {
    id: "pro" as const,
    name: "Pro",
    price: PRO_PRICE_EUR,
    features: [
      "Everything in Premium",
      "Unlimited AI chat",
      "Priority human consultant within 24h",
      "Downloadable PDF relocation guide",
    ],
  },
} as const;

export function isPaidPlan(plan: string): plan is PaidPlanTier {
  return plan === "premium" || plan === "pro";
}

export function getStripePlanDetails(plan: PaidPlanTier) {
  const plans = {
    premium: {
      name: "RelocateEU Premium",
      description: "Full checklist, AI chat (50 msg/month), email support",
      amount: PREMIUM_PRICE_EUR * 100,
    },
    pro: {
      name: "RelocateEU Pro",
      description:
        "Everything in Premium + priority consultant + PDF guide",
      amount: PRO_PRICE_EUR * 100,
    },
  };
  return plans[plan];
}
