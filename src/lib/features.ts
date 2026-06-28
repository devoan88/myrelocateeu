export type PlanTier = "free" | "premium" | "pro";

export const PLAN_FEATURES = {
  free: {
    countries: 1,
    aiQuestionsPerDay: 3,
    visaCalculator: false,
    documentChecker: false,
    buddyMatching: false,
    emailReminders: false,
    documentTemplates: false,
  },
  premium: {
    countries: "all" as const,
    aiQuestionsPerDay: "unlimited" as const,
    visaCalculator: true,
    documentChecker: true,
    buddyMatching: true,
    emailReminders: true,
    documentTemplates: true,
  },
  pro: {
    countries: "all" as const,
    aiQuestionsPerDay: "unlimited" as const,
    visaCalculator: true,
    documentChecker: true,
    buddyMatching: true,
    emailReminders: true,
    documentTemplates: true,
    familyProfiles: 5,
    expertCall: true,
    prioritySupport: true,
    luxuryDestinations: true,
  },
} as const;

export type PlanFeatures = (typeof PLAN_FEATURES)[PlanTier];

export const DEFAULT_FREE_COUNTRY = "Austria";

export function canAccessCountry(
  plan: PlanTier,
  destination: string,
  userFreeCountry?: string | null
): boolean {
  const features = PLAN_FEATURES[plan];
  if (features.countries === "all") return true;
  return destination === (userFreeCountry || DEFAULT_FREE_COUNTRY);
}

export function getAiQuestionsLimit(plan: PlanTier): number | "unlimited" {
  return PLAN_FEATURES[plan].aiQuestionsPerDay;
}

export function hasPersonalizedGuide(plan: PlanTier): boolean {
  return plan !== "free";
}

export function hasPdfGuide(plan: PlanTier): boolean {
  return plan === "pro";
}
