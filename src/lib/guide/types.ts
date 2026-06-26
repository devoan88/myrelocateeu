export type GuideStepCategory =
  | "registration"
  | "banking"
  | "healthcare"
  | "housing"
  | "work"
  | "school";

export type GuideStep = {
  id: string;
  category: GuideStepCategory;
  title: string;
  description: string;
  verifiedDate: string;
  documents: string;
  time: string;
  cost: string;
  officialUrl: string;
  officialLabel: string;
  note?: string;
};

export const CATEGORY_LABELS: Record<GuideStepCategory, string> = {
  registration: "Registration",
  banking: "Banking",
  healthcare: "Healthcare",
  housing: "Housing",
  work: "Work",
  school: "School",
};
