import { austria } from "./austria";
import { france } from "./france";
import { germany } from "./germany";
import { luxembourg } from "./luxembourg";
import { monaco } from "./monaco";
import { netherlands } from "./netherlands";
import { switzerland } from "./switzerland";
import type { CountryNavGroup, CountryPageData } from "./types";

export const COUNTRIES: CountryPageData[] = [
  austria,
  germany,
  switzerland,
  france,
  monaco,
  luxembourg,
  netherlands,
];

export const COUNTRY_SLUGS = COUNTRIES.map((country) => country.slug);

export type DestinationCountryName = (typeof COUNTRIES)[number]["name"];

export const DESTINATION_COUNTRY_NAMES = COUNTRIES.map(
  (country) => country.name
) as DestinationCountryName[];

export const HERO_DESTINATIONS = COUNTRIES.map((country) => ({
  value: country.name,
  label: `${country.name} ${country.flag}`,
}));

export const NAV_COUNTRY_GROUPS: {
  id: CountryNavGroup;
  label: string;
  slugs: string[];
}[] = [
  {
    id: "core",
    label: "Core guides",
    slugs: ["austria", "germany", "switzerland"],
  },
  {
    id: "premium",
    label: "Premium guides",
    slugs: ["monaco", "luxembourg"],
  },
  {
    id: "popular",
    label: "Popular guides",
    slugs: ["france", "netherlands"],
  },
];

export function getCountryBySlug(slug: string): CountryPageData | undefined {
  return COUNTRIES.find((country) => country.slug === slug);
}

export function getCountryByName(name: string): CountryPageData | undefined {
  return COUNTRIES.find((country) => country.name === name);
}

export function isCountrySlug(value: string): boolean {
  return COUNTRY_SLUGS.includes(value);
}

export function isDestinationCountryName(
  value: string | undefined
): value is DestinationCountryName {
  return DESTINATION_COUNTRY_NAMES.includes(value as DestinationCountryName);
}

export {
  austria,
  france,
  germany,
  luxembourg,
  monaco,
  netherlands,
  switzerland,
};

export type {
  ConfidenceLevel,
  CountryCardItem,
  CountryNavGroup,
  CountryPageData,
  CountryStep,
} from "./types";
