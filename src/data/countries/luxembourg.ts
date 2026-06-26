import type { CountryPageData } from "./types";

export const luxembourg: CountryPageData = {
  slug: "luxembourg",
  name: "Luxembourg",
  flag: "🇱🇺",
  tagline: "Your complete relocation guide",
  navGroup: "premium",
  confidenceLevel: "new",
  disclaimer: "This is informational content only, not legal advice.",
  cardItems: [
    { icon: "🏛", text: "Commune registration — within 8 days of arrival" },
    { icon: "💼", text: "EU free movement or salaried worker permit" },
    { icon: "🏥", text: "CNS — mandatory health fund registration" },
    { icon: "🏦", text: "Bank account — BGL, Spuerkeess, ING Luxembourg" },
  ],
  quickFacts: [
    { label: "Capital", value: "Luxembourg City" },
    {
      label: "Language",
      value: "Luxembourgish, French, German (all official)",
    },
    { label: "Currency", value: "Euro" },
    { label: "EU Member", value: "Yes" },
  ],
  keyFacts: [
    "EU/EEA citizens have free movement rights — no work permit needed",
    "Non-EU citizens need a residence permit tied to employment, study, or family reunification",
    "Major financial services hub — high concentration of banking and fund management jobs",
    "Highest minimum wage in the EU",
  ],
  steps: [
    {
      id: "commune-registration",
      category: "registration",
      title: "Register with your local commune",
      description:
        "Mandatory within 8 days of arrival. You will receive your residence certificate.",
      estimatedDays: 1,
      officialWebsite: "https://guichet.public.lu",
      lastUpdated: "2026-05-20",
    },
    {
      id: "cns-registration",
      category: "healthcare",
      title: "Register with CNS (national health fund)",
      description:
        "Caisse Nationale de Santé — mandatory health insurance registration.",
      estimatedDays: 14,
      officialWebsite: "https://cns.public.lu",
      lastUpdated: "2026-05-01",
    },
    {
      id: "bank-account-lu",
      category: "banking",
      title: "Open a Luxembourg bank account",
      description: "Options: BGL BNP Paribas, Spuerkeess, ING Luxembourg, Revolut.",
      documents: ["Passport", "Proof of address", "Employment contract"],
      estimatedDays: 3,
      lastUpdated: "2026-05-20",
    },
  ],
  visaTypes: [
    {
      name: "EU Citizen Registration",
      subtitle: "EU/EEA/Swiss citizens",
      requirements: [
        "Valid ID/passport",
        "Register with commune within 8 days of arrival if staying over 3 months",
        "Processing time: Same day",
      ],
      url: "https://guichet.public.lu",
      verifiedDate: "2026-05-20",
    },
    {
      name: "Residence permit for salaried workers",
      subtitle: "Non-EU nationals with a job offer",
      requirements: [
        "Signed employment contract",
        "Work permit application by employer",
        "Proof of qualifications",
        "Processing time: 90 days (standard procedure)",
      ],
      url: "https://guichet.public.lu",
      verifiedDate: "2026-05-20",
    },
  ],
  costOfLiving: {
    heading: "Cost of living (Luxembourg City 2026)",
    items: [
      { label: "1BR apartment city centre", value: "€1,300–€1,900/month" },
      { label: "1BR outside centre", value: "€1,000–€1,500/month" },
      {
        label: "Monthly transport",
        value: "Free — Luxembourg offers free public transport nationwide",
      },
      { label: "Groceries (1 person)", value: "€300–€480/month" },
    ],
    sourceNote: "Source: Numbeo, STATEC 2026",
  },
  officialResources: [
    {
      label: "guichet.public.lu",
      url: "https://guichet.public.lu",
      description: "Official government portal",
    },
    {
      label: "cns.public.lu",
      url: "https://cns.public.lu",
      description: "National health fund (CNS)",
    },
    {
      label: "maee.gouvernement.lu",
      url: "https://maee.gouvernement.lu",
      description: "Immigration Directorate",
    },
  ],
};
