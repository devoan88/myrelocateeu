import PricingPageClient from "@/components/pricing/PricingPageClient";
import { getUserPlan } from "@/lib/plans";
import { createClientIfConfigured } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free. Upgrade to Premium or Pro when you're ready. No hidden fees. Cancel anytime.",
};

type PricingPageProps = {
  searchParams: { success?: string };
};

const SUCCESS_MESSAGES: Record<string, string> = {
  premium:
    "Welcome to Premium! Your checklist, AI tools, and all countries are now unlocked.",
  pro: "Welcome to Pro! You now have priority support and family plan access.",
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const userPlan = await getUserPlan();
  const supabase = await createClientIfConfigured();
  const {
    data: { user },
  } = supabase
    ? await supabase.auth.getUser()
    : { data: { user: null } };

  const successMessage =
    searchParams.success && SUCCESS_MESSAGES[searchParams.success]
      ? SUCCESS_MESSAGES[searchParams.success]
      : undefined;

  return (
    <main className="min-h-screen bg-white">
      <PricingPageClient
        currentPlan={userPlan.plan}
        userId={user?.id ?? null}
        successMessage={successMessage}
      />
    </main>
  );
}
