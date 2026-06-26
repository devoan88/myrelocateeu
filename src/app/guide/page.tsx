import { redirect } from "next/navigation";
import type { Metadata } from "next";
import GuideClient from "@/components/guide/GuideClient";
import { getCountryByName } from "@/data/countries";
import { createClientIfConfigured } from "@/lib/supabase/server";

type GuidePageProps = {
  searchParams: {
    destination?: string;
    origin?: string;
    hasChildren?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: GuidePageProps): Promise<Metadata> {
  const destination = searchParams.destination ?? "Europe";
  const origin = searchParams.origin ?? "your country";

  return {
    title: `${destination} Relocation Guide`,
    description: `Personalised step-by-step relocation guide for ${origin} citizens moving to ${destination}. Every step verified against official government sources.`,
  };
}

function parseHasChildren(value?: string): boolean {
  if (!value) return false;
  return value === "true" || value === "1" || value === "yes";
}

export default async function GuidePage({ searchParams }: GuidePageProps) {
  const { destination, origin, hasChildren } = searchParams;

  if (!destination || !origin || !getCountryByName(destination)) {
    redirect("/");
  }

  const supabase = await createClientIfConfigured();
  const {
    data: { user },
  } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  return (
    <GuideClient
      destination={destination}
      origin={origin}
      hasChildren={parseHasChildren(hasChildren)}
      userId={user?.id ?? null}
    />
  );
}
