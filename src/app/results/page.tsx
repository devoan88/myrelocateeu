import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ChecklistGuide from "@/components/ChecklistGuide";
import PersonalizedGuide from "@/components/PersonalizedGuide";
import { getChecklist, isDestinationCountry } from "@/lib/checklists";
import { hasPersonalizedGuide } from "@/lib/features";
import { getUserPlan } from "@/lib/plans";
import { generatePersonalizedGuide } from "@/lib/rag/guide";
import {
  getRelocationInfo,
  getRelocationInfoByCategory,
} from "@/lib/relocation-info";
import type { RelocationLanguage } from "@/lib/supabase/types";

type ResultsPageProps = {
  searchParams: { destination?: string; origin?: string; lang?: string };
};

export async function generateMetadata({
  searchParams,
}: ResultsPageProps): Promise<Metadata> {
  const destination = searchParams.destination ?? "Europe";
  return {
    title: `${destination} Relocation Results`,
    description: `Your personalised relocation checklist and resources for moving to ${destination}.`,
  };
}

function parseLanguage(value?: string): RelocationLanguage {
  if (value === "ka" || value === "de" || value === "en") return value;
  return "en";
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const { destination, origin, lang } = searchParams;

  if (!destination || !origin || !isDestinationCountry(destination)) {
    redirect("/");
  }

  const language = parseLanguage(lang);
  const userPlan = await getUserPlan();
  const relocationRows = await getRelocationInfo(destination, language);
  const infoByCategory = getRelocationInfoByCategory(relocationRows);
  const checklist = getChecklist(destination);

  const enrichedItems = checklist.map((item) => ({
    ...item,
    relocationInfo: infoByCategory[item.category] ?? null,
  }));

  const personalizedGuide = hasPersonalizedGuide(userPlan.plan)
    ? await generatePersonalizedGuide({
        destination,
        origin,
        language,
        relocationRows,
      })
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to home
          </Link>

          <header className="mt-6 mb-10">
            <p className="text-sm font-medium text-blue-600">
              Step-by-step guide
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Your checklist for {destination}
            </h1>
            <p className="mt-3 text-lg text-slate-600">
              Follow these steps to complete your relocation from {origin} to{" "}
              {destination}. Check off each item as you go.
            </p>
            <p className="mt-3 text-sm text-slate-500">
              Each step shows when our team last verified the information. Spot
              something wrong? Use &ldquo;Report outdated info&rdquo; on any step.
            </p>
          </header>

          {personalizedGuide && (
            <PersonalizedGuide
              content={personalizedGuide}
              origin={origin}
              destination={destination}
            />
          )}

          <ChecklistGuide
            items={enrichedItems}
            destination={destination}
            origin={origin}
            userPlan={userPlan}
            language={language}
          />
        </div>
    </main>
  );
}
