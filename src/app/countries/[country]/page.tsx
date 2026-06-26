import CountryPageView from "@/components/countries/CountryPageView";
import {
  COUNTRY_SLUGS,
  getCountryBySlug,
} from "@/data/countries";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type CountryPageProps = {
  params: { country: string };
};

export function generateStaticParams() {
  return COUNTRY_SLUGS.filter((country) => country !== "monaco").map(
    (country) => ({ country })
  );
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const data = getCountryBySlug(params.country);
  if (!data) {
    return { title: "Country not found" };
  }

  return {
    title: `Relocate to ${data.name}`,
    description: `Visa types, cost of living, and official resources for relocating to ${data.name}.`,
  };
}

export default function CountryPage({ params }: CountryPageProps) {
  const data = getCountryBySlug(params.country);
  if (!data) notFound();
  return <CountryPageView data={data} />;
}
