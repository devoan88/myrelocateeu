export type PlanFeature = {
  text: string;
  included: boolean;
};

export const FREE_FEATURES: PlanFeature[] = [
  { text: "Relocation checklist for 1 country", included: true },
  { text: "Official government source links", included: true },
  { text: "Progress tracker", included: true },
  { text: "Cost of life simulator (basic)", included: true },
  { text: "3 AI assistant questions per day", included: true },
  { text: "Visa probability calculator", included: false },
  { text: "Document checker", included: false },
  { text: "Expat Buddy matching", included: false },
  { text: "All 7 countries", included: false },
  { text: "Email deadline reminders", included: false },
];

export const PREMIUM_FEATURES: PlanFeature[] = [
  { text: "Everything in Free", included: true },
  { text: "All 7 countries + future countries", included: true },
  { text: "Unlimited AI assistant", included: true },
  { text: "Visa probability calculator", included: true },
  { text: "Document checker", included: true },
  { text: "Expat Buddy matching", included: true },
  { text: "Email reminders & deadlines", included: true },
  { text: "Document templates", included: true },
  { text: "Priority content updates", included: true },
];

export const PRO_FEATURES: PlanFeature[] = [
  { text: "Everything in Premium", included: true },
  { text: "Family plan — up to 5 profiles", included: true },
  { text: "1 expert consultation call per month", included: true },
  { text: "Priority support — 24h response", included: true },
  { text: "Custom relocation timeline", included: true },
  { text: "White-glove document review", included: true },
  { text: "Monaco & luxury destination guides", included: true },
];

export const FAQ_ITEMS = [
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel from your account settings with one click. You keep access until the end of your current billing period. No questions asked.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "All payments are processed securely. RelocateEU never stores your card details.",
  },
  {
    question: "Can I switch plans?",
    answer:
      "Yes, upgrade or downgrade anytime. Changes take effect immediately.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes — full refund within 30 days, no questions asked. Email support@relocateeu.com.",
  },
  {
    question: "What happens after I subscribe?",
    answer:
      "You get immediate access to all Premium or Pro features. Your checklist, progress, and settings are saved to your account.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "The Free plan is yours forever — no time limit. Upgrade when you need more.",
  },
] as const;

export const TRUST_ITEMS = [
  "30-day money back guarantee",
  "Cancel anytime",
  "Secure payment",
] as const;
