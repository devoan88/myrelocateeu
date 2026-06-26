export type PlanFeature = {
  text: string;
  included: boolean;
};

export const FREE_FEATURES: PlanFeature[] = [
  { text: "Complete checklist for 1 country", included: true },
  { text: "Official government source links", included: true },
  { text: "Progress tracking", included: true },
  { text: "Cost simulator (basic view)", included: true },
  { text: "3 assistant questions per day", included: true },
  { text: "Visa probability calculator", included: false },
  { text: "Document checker", included: false },
  { text: "Expat Buddy matching", included: false },
  { text: "Email deadline reminders", included: false },
  { text: "Document templates", included: false },
];

export const PREMIUM_FEATURES: PlanFeature[] = [
  { text: "Everything in Free", included: true },
  { text: "Unlimited assistant questions", included: true },
  { text: "Visa probability calculator", included: true },
  { text: "Document checker", included: true },
  { text: "Expat Buddy matching", included: true },
  { text: "Email reminders and deadlines", included: true },
  { text: "Document templates (10+)", included: true },
  { text: "All countries access", included: true },
  { text: "Priority content updates", included: true },
];

export const PRO_FEATURES: PlanFeature[] = [
  { text: "Everything in Premium", included: true },
  { text: "1 immigration expert call per month (30 min)", included: true },
  { text: "Priority support (24h response)", included: true },
  { text: "Family plan (up to 5 profiles)", included: true },
  { text: "Custom relocation timeline", included: true },
  { text: "White-glove document review", included: true },
];

export const FAQ_ITEMS = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes. Cancel from your account settings in one click. You keep access until the end of your billing period.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Yes. All payments are processed by Stripe. RelocateEU never stores your card details.",
  },
  {
    question: "Can I switch plans?",
    answer:
      "Yes, upgrade or downgrade anytime. Changes take effect immediately.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, full refund within 30 days if you're not satisfied. No questions asked.",
  },
] as const;

export const TRUST_ITEMS = [
  "30-day money back guarantee",
  "Cancel anytime",
  "Secure payment via Stripe",
] as const;
