import type { CountryPageData } from "./types";

export const monaco: CountryPageData = {
  slug: "monaco",
  name: "Monaco",
  flag: "🇲🇨",
  tagline: "Premium destination — structured residency process",
  isPremiumDestination: true,
  navGroup: "premium",
  confidenceLevel: "new",
  disclaimer:
    "This is informational content only, not legal advice. Monaco residency involves significant financial requirements — always consult a specialized immigration advisor.",
  cardItems: [
    { icon: "⚠️", text: "Not EU — residence permit required for all nationals" },
    { icon: "🏠", text: "Secure accommodation — minimum 12-month lease required" },
    { icon: "🏦", text: "Bank reference letter — typically ~€500k deposit" },
    { icon: "📋", text: "Carte de Séjour — structured, document-heavy process" },
  ],
  quickFacts: [
    { label: "Capital", value: "Monaco" },
    {
      label: "Language",
      value: "French (official), English in business",
    },
    { label: "Currency", value: "Euro" },
    { label: "EU Member", value: "No" },
  ],
  keyFacts: [
    "Monaco is not an EU member — free movement rules do not apply, even for EU citizens",
    "Non-EU nationals must first obtain a French long-stay Type D visa before applying",
    "No personal income tax for most residents (French nationals remain taxed under a 1963 treaty)",
    "Most Monaco banks require a minimum deposit of around €500,000 for the reference letter needed in your application",
    "Minimum 3 months physical residence per year required to maintain the permit",
    "No golden visa or investment visa route — residency is a structured, document-heavy process",
  ],
  steps: [
    {
      id: "accommodation",
      category: "housing",
      title: "Secure accommodation in Monaco",
      description:
        "You must have a physical home in Monaco before applying — a hotel does not qualify. Lease or purchase, minimum 12-month term.",
      lastUpdated: "2026-05-01",
    },
    {
      id: "bank-reference",
      category: "banking",
      title: "Open a Monaco bank account and obtain reference letter",
      description:
        "Banks issue the reference letter required for your residency dossier. Requirements vary by institution.",
      importantNote:
        "There is no legally defined minimum, but most banks expect deposits around €500,000.",
      lastUpdated: "2026-05-01",
    },
    {
      id: "french-visa-non-eu",
      category: "registration",
      title: "French long-stay visa (non-EU nationals only)",
      description:
        "Monaco does not issue its own entry visas. Non-EU/EEA nationals must obtain a French Type D visa first, since Monaco's external border is administered jointly with France.",
      estimatedDays: "28-56 days",
      lastUpdated: "2026-05-10",
    },
    {
      id: "residency-application",
      category: "registration",
      title: "Submit application to Section de Résidents",
      description:
        "File your complete dossier including birth certificate, criminal record extracts, accommodation proof, and bank reference letter.",
      officialWebsite: "https://en.gouv.mc",
      lastUpdated: "2026-05-01",
    },
    {
      id: "interview",
      category: "registration",
      title: "Attend residency interview",
      description:
        "A mandatory in-person interview with Monaco's residency authorities.",
      lastUpdated: "2026-05-01",
    },
  ],
  visaTypes: [
    {
      name: "Carte de Séjour Temporaire",
      subtitle: "First-time residents — entry-level permit",
      requirements: [
        "Proof of accommodation in Monaco (lease or property deed, minimum 12 months)",
        "Bank reference letter (typically requires ~€500,000 deposit, bank-dependent, not a legal minimum)",
        "Clean criminal record certificate",
        "Comprehensive health insurance",
        "Non-EU: French long-stay visa (Type D) obtained first",
        "Validity: 1 year, renewable annually for up to 3 years",
        "Processing time: 2–4 months",
      ],
      url: "https://en.gouv.mc",
      verifiedDate: "2026-05-01",
    },
  ],
  costOfLiving: {
    heading: "Cost of living",
    note: "Monaco is consistently ranked among the most expensive places to live in the world. Property and rental prices are exceptionally high.",
    sourceNote:
      "General market data 2026 — verify with local real estate agents for current figures",
  },
  officialResources: [
    {
      label: "en.gouv.mc",
      url: "https://en.gouv.mc",
      description: "Monaco Government Portal",
    },
    {
      label: "Section de Résidents",
      url: "https://en.gouv.mc/Government-Institutions/The-Government/General-Directorates/Department-of-the-Interior/Direction-de-la-Surete-Publique/Residents-Section",
      description: "Residency applications & requirements",
    },
  ],
};
