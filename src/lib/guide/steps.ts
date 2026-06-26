import {
  COUNTRIES,
  getCountryByName,
  type DestinationCountryName,
} from "@/data/countries";
import { toGuideSteps } from "@/data/countries/utils";
import type { DestinationCountry } from "@/lib/checklists";
import type { GuideStep } from "./types";

export function getGuideSteps(
  destination: DestinationCountry,
  hasChildren: boolean
): GuideStep[] {
  const country = getCountryByName(destination);
  if (!country) return [];
  return toGuideSteps(country.steps, hasChildren);
}

export function getProgressStorageKey(destination: DestinationCountry): string {
  return `relocateeu_progress_${destination.toLowerCase()}`;
}

export const DESTINATION_FLAGS = Object.fromEntries(
  COUNTRIES.map((country) => [country.name, country.flag])
) as Record<DestinationCountryName, string>;
