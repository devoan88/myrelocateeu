import type { CountryPageData } from "./types";

export const netherlands: CountryPageData = {
  slug: "netherlands",
  name: "Netherlands",
  flag: "🇳🇱",
  tagline: "Your complete relocation guide",
  navGroup: "popular",
  confidenceLevel: "new",
  disclaimer: "This is informational content only, not legal advice.",
  cardItems: [
    { icon: "🏛", text: "BRP registration — get your BSN within 4 months" },
    { icon: "💼", text: "Highly Skilled Migrant — fast-track IND route" },
    { icon: "🏥", text: "Dutch health insurance — mandatory within 4 months" },
    { icon: "📋", text: "30% ruling — tax benefit for qualifying employees" },
  ],
  quickFacts: [
    { label: "Capital", value: "Amsterdam" },
    { label: "Language", value: "Dutch" },
    { label: "Currency", value: "Euro" },
    { label: "EU Member", value: "Yes" },
  ],
  keyFacts: [
    "Famous for the 30% ruling tax benefit for qualifying incoming employees",
    "EU/EEA citizens do not need a work or residence permit",
    "Non-EU highly skilled migrants benefit from a fast-track IND procedure",
  ],
  steps: [
    {
      id: "brp-registration",
      category: "registration",
      title: "Register at the municipality (BRP)",
      description:
        "Mandatory if staying more than 4 months. You receive your BSN (citizen service number) — required for banking, work, and healthcare.",
      estimatedDays: 1,
      officialWebsite: "https://www.government.nl",
      lastUpdated: "2026-05-15",
    },
    {
      id: "health-insurance-nl",
      category: "healthcare",
      title: "Get Dutch health insurance",
      description:
        "Mandatory within 4 months of becoming a resident or starting work.",
      estimatedDays: 30,
      lastUpdated: "2026-05-01",
    },
    {
      id: "bank-account-nl",
      category: "banking",
      title: "Open a Dutch bank account",
      description: "Options: ING, ABN AMRO, Rabobank, bunq, N26. BSN required.",
      documents: ["Passport", "BSN", "Proof of address"],
      estimatedDays: 3,
      lastUpdated: "2026-05-15",
    },
    {
      id: "thirty-percent-ruling",
      category: "work",
      title: "Apply for the 30% ruling (if eligible)",
      description:
        "Tax facility allowing up to 30% of gross salary to be paid tax-free, designed to offset relocation costs.",
      importantNote:
        "Key requirement: you must have lived more than 150km from the Dutch border for at least 16 of the 24 months before starting work. This excludes most residents of Belgium, Luxembourg, and nearby regions of Germany and France. 2026 salary threshold: €48,013/year standard, €36,497/year for under-30 with qualifying master's.",
      officialWebsite: "https://www.belastingdienst.nl",
      lastUpdated: "2026-06-01",
    },
  ],
  visaTypes: [
    {
      name: "Highly Skilled Migrant (Kennismigrant)",
      subtitle:
        "Non-EU professionals with a job offer from an IND-recognized sponsor",
      requirements: [
        "Job offer from IND recognized sponsor employer",
        "Minimum gross salary: €5,942/month (30+) or lower threshold under 30 with qualifying master's — 2026 figures",
        "No EU-wide job search proof required (fast track)",
        "Processing time: 2-4 weeks typical",
      ],
      url: "https://ind.nl/en",
      verifiedDate: "2026-06-01",
    },
    {
      name: "EU Blue Card",
      subtitle: "Highly qualified non-EU professionals",
      requirements: [
        "University degree",
        "Salary threshold similar to highly skilled migrant route",
      ],
      url: "https://ind.nl/en",
      verifiedDate: "2026-06-01",
    },
  ],
  costOfLiving: {
    heading: "Cost of living (Amsterdam 2026)",
    items: [
      { label: "1BR apartment city centre", value: "€1,400–€2,000/month" },
      { label: "1BR outside centre", value: "€1,100–€1,500/month" },
      { label: "Monthly transport", value: "€100–€120/month" },
      { label: "Groceries (1 person)", value: "€280–€420/month" },
    ],
    sourceNote: "Source: Numbeo, CBS 2026",
  },
  officialResources: [
    {
      label: "ind.nl",
      url: "https://ind.nl/en",
      description: "Immigration & Naturalisation Service (IND)",
    },
    {
      label: "belastingdienst.nl",
      url: "https://www.belastingdienst.nl",
      description: "Tax Authority (30% ruling)",
    },
    {
      label: "business.gov.nl",
      url: "https://business.gov.nl",
      description: "Business & employment information",
    },
  ],
};
