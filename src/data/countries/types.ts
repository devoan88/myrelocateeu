import type { GuideStepCategory } from "@/lib/guide/types";

export type QuickFact = {
  label: string;
  value: string;
};

export type VisaType = {
  name: string;
  subtitle: string;
  requirements: string[];
  url: string;
  verifiedDate: string;
};

export type CostItem = {
  label: string;
  value: string;
};

export type OfficialResource = {
  label: string;
  url: string;
  description: string;
};

export type CountryStep = {
  id: string;
  category: GuideStepCategory;
  title: string;
  description: string;
  documents?: string | string[];
  officialWebsite?: string;
  estimatedDays?: string | number;
  cost?: string;
  importantNote?: string;
  lastUpdated: string;
  time?: string;
  officialLabel?: string;
  note?: string;
  forChildren?: boolean;
};

export type CountryNavGroup = "core" | "premium" | "popular";

export type ConfidenceLevel = "established" | "new";

export type CountryCardItem = {
  icon: string;
  text: string;
};

export type CountryPageData = {
  slug: string;
  name: string;
  flag: string;
  tagline: string;
  quickFacts: QuickFact[];
  keyFacts?: string[];
  disclaimer?: string;
  isPremiumDestination?: boolean;
  navGroup: CountryNavGroup;
  confidenceLevel: ConfidenceLevel;
  cardItems: CountryCardItem[];
  steps: CountryStep[];
  visaTypes: VisaType[];
  costOfLiving: {
    heading: string;
    items?: CostItem[];
    note?: string;
    sourceNote: string;
  };
  officialResources: OfficialResource[];
};
