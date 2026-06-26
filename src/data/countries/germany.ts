import type { CountryPageData } from "./types";

export const germany: CountryPageData = {
  slug: "germany",
  name: "Germany",
  flag: "🇩🇪",
  tagline: "Your complete relocation guide",
  navGroup: "core",
  confidenceLevel: "established",
  cardItems: [
    { icon: "🏛", text: "Anmeldung — required within 14 days" },
    { icon: "💼", text: "Work permit / EU Blue Card" },
    { icon: "🏥", text: "Krankenkasse — public health insurance" },
    { icon: "🏦", text: "Bank account — Deutsche Bank, N26, Commerzbank" },
  ],
  quickFacts: [
    { label: "Capital", value: "Berlin" },
    { label: "Language", value: "German" },
    { label: "Currency", value: "Euro" },
    { label: "EU Member", value: "Yes" },
  ],
  steps: [
    {
      id: "anmeldung",
      category: "registration",
      title: "Anmeldung (Address registration)",
      description: "Register at the Bürgeramt within 14 days of moving in.",
      documents: "Passport, Rental contract, Wohnungsgeberbestätigung",
      time: "~30 min",
      cost: "Free",
      officialWebsite: "https://www.service.bund.de",
      officialLabel: "service.bund.de",
      lastUpdated: "2026-06-01",
    },
    {
      id: "bank-de",
      category: "banking",
      title: "Open a bank account",
      description:
        "Girokonto required for salary and rent. Anmeldung is usually required first.",
      documents: "Passport, Anmeldung",
      time: "~1 hour",
      cost: "Free",
      officialWebsite: "https://www.bund.de",
      officialLabel: "bund.de",
      lastUpdated: "2026-06-01",
    },
    {
      id: "health-de",
      category: "healthcare",
      title: "Health insurance (Krankenversicherung)",
      description:
        "Mandatory health insurance — public or private depending on your status.",
      documents: "Passport, Anmeldung",
      time: "~1–2 weeks",
      cost: "Varies",
      officialWebsite: "https://www.bund.de",
      officialLabel: "bund.de",
      lastUpdated: "2026-06-01",
    },
    {
      id: "school-de",
      category: "school",
      title: "School enrollment",
      description:
        "Contact the local Schulamt for school placement and required documents.",
      documents: "Passport, Anmeldung, school records",
      time: "~2–4 weeks",
      cost: "Free",
      officialWebsite: "https://www.bildungsserver.de",
      officialLabel: "bildungsserver.de",
      forChildren: true,
      lastUpdated: "2026-06-01",
    },
  ],
  visaTypes: [
    {
      name: "EU Blue Card",
      subtitle: "Highly qualified professionals",
      requirements: [
        "Recognised university degree or comparable qualification",
        "Job offer meeting minimum salary threshold",
        "Health insurance and valid passport",
      ],
      url: "https://www.make-it-in-germany.com",
      verifiedDate: "2026-05-01",
    },
    {
      name: "Skilled Worker Visa",
      subtitle: "Qualified employment",
      requirements: [
        "Vocational qualification or degree recognised in Germany",
        "Concrete job offer from German employer",
        "Approval from Federal Employment Agency where required",
      ],
      url: "https://www.make-it-in-germany.com",
      verifiedDate: "2026-05-01",
    },
    {
      name: "Family Reunification Visa",
      subtitle: "Joining family in Germany",
      requirements: [
        "Spouse or parent with legal residence in Germany",
        "Proof of relationship and German language basics (often A1)",
        "Adequate housing and health insurance",
      ],
      url: "https://www.bamf.de",
      verifiedDate: "2026-05-01",
    },
    {
      name: "Student Visa",
      subtitle: "University studies",
      requirements: [
        "Admission to recognised German university",
        "Blocked account (Sperrkonto) or scholarship proof",
        "Health insurance valid in Germany",
      ],
      url: "https://www.bamf.de",
      verifiedDate: "2026-05-01",
    },
  ],
  costOfLiving: {
    heading: "Cost of living (Berlin 2026)",
    items: [
      { label: "1BR apartment city centre", value: "€1,200–€1,800/month" },
      { label: "1BR outside centre", value: "€900–€1,400/month" },
      { label: "Monthly transport (AB zone)", value: "€63–€86/month" },
      { label: "Groceries (1 person)", value: "€250–€450/month" },
      {
        label: "Health insurance (employed)",
        value: "~14.6% shared with employer (public)",
      },
    ],
    sourceNote: "Source: Numbeo, Destatis, 2026",
  },
  officialResources: [
    {
      label: "make-it-in-germany.com",
      url: "https://www.make-it-in-germany.com",
      description: "Official portal for skilled workers",
    },
    {
      label: "bamf.de",
      url: "https://www.bamf.de",
      description: "Federal Office for Migration",
    },
    {
      label: "arbeitsagentur.de",
      url: "https://www.arbeitsagentur.de",
      description: "Federal Employment Agency",
    },
    {
      label: "bildungsserver.de",
      url: "https://www.bildungsserver.de",
      description: "Education & training",
    },
    {
      label: "service-bw.de",
      url: "https://www.service-bund.de",
      description: "Federal services (Anmeldung info)",
    },
    {
      label: "deutschland.de",
      url: "https://www.deutschland.de",
      description: "Living in Germany guide",
    },
  ],
};
