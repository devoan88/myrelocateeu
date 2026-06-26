import type { CountryPageData } from "./types";

export const france: CountryPageData = {
  slug: "france",
  name: "France",
  flag: "🇫🇷",
  tagline: "Your complete relocation guide",
  navGroup: "popular",
  confidenceLevel: "new",
  cardItems: [
    { icon: "🏛", text: "OFII visa validation — within 3 months of arrival" },
    { icon: "🏥", text: "Carte Vitale — French health insurance card" },
    { icon: "🏦", text: "Bank account — BNP, Société Générale, Boursorama" },
    { icon: "🏠", text: "CAF housing assistance — if eligible" },
  ],
  quickFacts: [
    { label: "Capital", value: "Paris" },
    { label: "Language", value: "French" },
    { label: "Currency", value: "Euro" },
    { label: "EU Member", value: "Yes" },
  ],
  steps: [
    {
      id: "ofii-validation",
      category: "registration",
      title: "OFII visa validation",
      description:
        "Within 3 months of arrival, validate your long-stay visa with the French Office for Immigration and Integration (OFII).",
      documents: [
        "Passport with visa",
        "Proof of address",
        "OFII stamp fee receipt",
      ],
      cost: "Approx €200 (varies by visa type)",
      estimatedDays: 1,
      officialWebsite: "https://www.ofii.fr",
      lastUpdated: "2026-06-01",
    },
    {
      id: "carte-vitale",
      category: "healthcare",
      title: "Apply for Carte Vitale (health insurance card)",
      description:
        "Register with French social security (Assurance Maladie) to receive your health card.",
      estimatedDays: 30,
      cost: "Free",
      officialWebsite: "https://www.ameli.fr",
      lastUpdated: "2026-05-15",
    },
    {
      id: "bank-account-fr",
      category: "banking",
      title: "Open a French bank account",
      description: "Options: BNP Paribas, Société Générale, Boursorama (online), N26.",
      documents: [
        "Passport",
        "Proof of address (justificatif de domicile)",
        "Visa or residence permit",
      ],
      estimatedDays: 3,
      lastUpdated: "2026-06-01",
    },
    {
      id: "caf-registration",
      category: "housing",
      title: "Register with CAF for housing assistance",
      description:
        "If eligible, CAF (Caisse d'Allocations Familiales) provides housing benefit (APL) to reduce rent costs.",
      estimatedDays: 14,
      officialWebsite: "https://www.caf.fr",
      lastUpdated: "2026-05-01",
    },
  ],
  visaTypes: [
    {
      name: "Passeport Talent",
      subtitle: "Highly skilled workers, researchers, entrepreneurs",
      requirements: [
        "Job offer or qualifying activity",
        "Relevant diploma or 5+ years experience",
        "Salary threshold",
      ],
      url: "https://france-visas.gouv.fr",
      verifiedDate: "2026-06-01",
    },
    {
      name: "Long-stay visa (VLS-TS)",
      subtitle: "Work, study, family reunification over 90 days",
      requirements: [
        "Purpose-specific documents",
        "Proof of accommodation",
        "Health insurance",
      ],
      url: "https://france-visas.gouv.fr",
      verifiedDate: "2026-06-01",
    },
  ],
  costOfLiving: {
    heading: "Cost of living (Paris 2026)",
    items: [
      { label: "1BR apartment city centre", value: "€1,100–€1,600/month" },
      { label: "1BR outside centre", value: "€800–€1,200/month" },
      { label: "Monthly transport (Navigo pass)", value: "€86.40/month" },
      { label: "Groceries (1 person)", value: "€280–€450/month" },
    ],
    sourceNote: "Source: Numbeo, INSEE 2026",
  },
  officialResources: [
    {
      label: "france-visas.gouv.fr",
      url: "https://france-visas.gouv.fr",
      description: "Visa applications & requirements",
    },
    {
      label: "ofii.fr",
      url: "https://www.ofii.fr",
      description: "Immigration integration & visa validation",
    },
    {
      label: "ameli.fr",
      url: "https://www.ameli.fr",
      description: "Public health insurance (Assurance Maladie)",
    },
    {
      label: "caf.fr",
      url: "https://www.caf.fr",
      description: "Housing benefits (APL)",
    },
    {
      label: "service-public.fr",
      url: "https://www.service-public.fr",
      description: "Government services portal",
    },
  ],
};
