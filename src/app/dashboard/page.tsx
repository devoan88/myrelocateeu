import { Suspense } from "react";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/dashboard/DashboardClient";
import type { DashboardTab, UserProfile } from "@/lib/dashboard/utils";
import { isDestinationCountry } from "@/lib/checklists";
import { createClientIfConfigured } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your relocation progress, settings, and tools.",
};

type DashboardPageProps = {
  searchParams: { tab?: string };
};

function isValidTab(value: string | undefined): value is DashboardTab {
  return (
    value === "overview" ||
    value === "checklists" ||
    value === "tools" ||
    value === "settings" ||
    value === "billing"
  );
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const supabase = await createClientIfConfigured();

  if (!supabase) {
    redirect("/auth/login?error=not-configured&next=/dashboard");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login?next=/dashboard");
  }

  const { data: profileRow } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  const profile: UserProfile = profileRow ?? {
    id: user.id,
    email: user.email ?? "",
    full_name:
      (user.user_metadata?.full_name as string | undefined) ??
      (user.user_metadata?.name as string | undefined) ??
      null,
    origin_country: null,
    destination_country:
      (user.user_metadata?.destination_country as string | undefined) ?? null,
    has_children: false,
    num_children: 0,
    plan: "free",
    plan_expires_at: null,
  };

  const destination =
    profile.destination_country && isDestinationCountry(profile.destination_country)
      ? profile.destination_country
      : "Austria";

  const { data: progressRows } = await supabase
    .from("guide_progress")
    .select("step_id, completed, completed_at, country")
    .eq("user_id", user.id);

  const progress: Record<string, boolean> = {};
  const completedAt: Record<string, string> = {};
  const progressByCountry: Record<string, Record<string, boolean>> = {};

  for (const row of progressRows ?? []) {
    if (!row.completed) continue;

    if (!progressByCountry[row.country]) {
      progressByCountry[row.country] = {};
    }
    progressByCountry[row.country][row.step_id] = true;

    if (row.country === destination) {
      progress[row.step_id] = true;
      if (row.completed_at) {
        completedAt[row.step_id] = row.completed_at;
      }
    }
  }

  const initialTab = isValidTab(searchParams.tab) ? searchParams.tab : "overview";

  return (
    <Suspense>
      <DashboardClient
        profile={profile}
        progress={progress}
        completedAt={completedAt}
        progressByCountry={progressByCountry}
        initialTab={initialTab}
      />
    </Suspense>
  );
}
