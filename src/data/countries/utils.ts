import type { GuideStep } from "@/lib/guide/types";
import type { CountryStep } from "./types";

function formatDocuments(documents?: string | string[]): string {
  if (!documents) return "See official source";
  return Array.isArray(documents) ? documents.join(", ") : documents;
}

function formatTime(step: CountryStep): string {
  if (step.time) return step.time;
  if (step.estimatedDays === undefined) return "Varies";
  return typeof step.estimatedDays === "number"
    ? `~${step.estimatedDays} day${step.estimatedDays === 1 ? "" : "s"}`
    : String(step.estimatedDays);
}

function formatOfficialLabel(step: CountryStep): string {
  if (step.officialLabel) return step.officialLabel;
  if (!step.officialWebsite) return "Official source";
  try {
    return new URL(step.officialWebsite).hostname.replace(/^www\./, "");
  } catch {
    return "Official source";
  }
}

export function toGuideStep(step: CountryStep): GuideStep {
  return {
    id: step.id,
    category: step.category,
    title: step.title,
    description: step.description,
    verifiedDate: step.lastUpdated,
    documents: formatDocuments(step.documents),
    time: formatTime(step),
    cost: step.cost ?? "Varies",
    officialUrl: step.officialWebsite ?? "#",
    officialLabel: formatOfficialLabel(step),
    note: step.note ?? step.importantNote,
  };
}

export function toGuideSteps(
  steps: CountryStep[],
  hasChildren: boolean
): GuideStep[] {
  return steps
    .filter((step) => !step.forChildren || hasChildren)
    .map(toGuideStep);
}
