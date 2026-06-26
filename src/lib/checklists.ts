import {
  DESTINATION_COUNTRY_NAMES,
  getCountryByName,
  isDestinationCountryName,
  type DestinationCountryName,
} from "@/data/countries";

export type DestinationCountry = DestinationCountryName;

export const DESTINATION_COUNTRIES: DestinationCountry[] = [
  ...DESTINATION_COUNTRY_NAMES,
];

export const isDestinationCountry = isDestinationCountryName;

export type ChecklistItem = {
  id: string;
  category: "visa" | "bank" | "school" | "healthcare" | "work";
  title: string;
  description: string;
  details: string[];
};

function mapStepCategory(
  category: string
): ChecklistItem["category"] {
  switch (category) {
    case "banking":
      return "bank";
    case "healthcare":
      return "healthcare";
    case "school":
      return "school";
    case "work":
      return "work";
    default:
      return "visa";
  }
}

export function getChecklist(country: DestinationCountry): ChecklistItem[] {
  const data = getCountryByName(country);
  if (!data) return [];

  return data.steps
    .filter((step) => !step.forChildren)
    .map((step) => ({
      id: step.id,
      category: mapStepCategory(step.category),
      title: step.title,
      description: step.description,
      details: step.documents
        ? Array.isArray(step.documents)
          ? step.documents
          : [step.documents]
        : [],
    }));
}
