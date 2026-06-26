"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BillingTab from "@/components/dashboard/BillingTab";
import ChecklistsTab from "@/components/dashboard/ChecklistsTab";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import OverviewTab from "@/components/dashboard/OverviewTab";
import SettingsTab from "@/components/dashboard/SettingsTab";
import ToolsTab from "@/components/dashboard/ToolsTab";
import type { DashboardTab, UserProfile } from "@/lib/dashboard/utils";

type DashboardClientProps = {
  profile: UserProfile;
  progress: Record<string, boolean>;
  completedAt: Record<string, string>;
  progressByCountry: Record<string, Record<string, boolean>>;
  initialTab?: DashboardTab;
};

function isValidTab(value: string | null): value is DashboardTab {
  return (
    value === "overview" ||
    value === "checklists" ||
    value === "tools" ||
    value === "settings" ||
    value === "billing"
  );
}

export default function DashboardClient({
  profile: initialProfile,
  progress,
  completedAt,
  progressByCountry,
  initialTab = "overview",
}: DashboardClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<DashboardTab>(
    isValidTab(tabParam) ? tabParam : initialTab
  );
  const [profile, setProfile] = useState(initialProfile);

  const handleTabChange = useCallback(
    (tab: DashboardTab) => {
      setActiveTab(tab);
      router.replace(`/dashboard?tab=${tab}`, { scroll: false });
    },
    [router]
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-white lg:flex-row">
      <DashboardSidebar
        profile={profile}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <main className="min-w-0 flex-1 overflow-y-auto p-6 lg:p-8">
        {activeTab === "overview" && (
          <OverviewTab
            profile={profile}
            progress={progress}
            completedAt={completedAt}
          />
        )}
        {activeTab === "checklists" && (
          <ChecklistsTab profile={profile} progressByCountry={progressByCountry} />
        )}
        {activeTab === "tools" && <ToolsTab />}
        {activeTab === "settings" && (
          <SettingsTab profile={profile} onProfileUpdate={setProfile} />
        )}
        {activeTab === "billing" && <BillingTab profile={profile} />}
      </main>
    </div>
  );
}
