"use client";

import { cn } from "@/lib/cn";
import type { DashboardTab, UserProfile } from "@/lib/dashboard/utils";
import { DASHBOARD_TABS, getInitials } from "@/lib/dashboard/utils";

type DashboardSidebarProps = {
  profile: UserProfile;
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
};

function PlanBadge({ plan }: { plan: string }) {
  const isPremium = plan === "premium" || plan === "pro";

  return (
    <span
      className={cn(
        "mt-2 inline-block rounded-full px-2.5 py-0.5 font-sans text-xs font-medium capitalize",
        isPremium
          ? "bg-[#EFF6FF] text-[#2563EB]"
          : "bg-[#F1F5F9] text-[#475569]"
      )}
    >
      {isPremium ? "Premium" : "Free"}
    </span>
  );
}

export default function DashboardSidebar({
  profile,
  activeTab,
  onTabChange,
}: DashboardSidebarProps) {
  const displayName = profile.full_name?.trim() || profile.email.split("@")[0];
  const initials = getInitials(profile.full_name, profile.email);

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#E2E8F0] lg:w-[280px] lg:border-b-0 lg:border-r">
      <div className="border-b border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] font-sans text-lg font-semibold text-[#2563EB]">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate font-sans text-base font-semibold text-[#0F172A]">
              {displayName}
            </p>
            <PlanBadge plan={profile.plan} />
          </div>
        </div>
      </div>

      <nav className="p-4" aria-label="Dashboard">
        <ul className="space-y-1">
          {DASHBOARD_TABS.map(({ id, label }) => {
            const isActive = activeTab === id;
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onTabChange(id)}
                  className={cn(
                    "w-full rounded-r-lg py-2.5 pl-4 pr-3 text-left font-sans text-sm transition-colors",
                    isActive
                      ? "border-l-2 border-[#2563EB] bg-[#F8FAFC] font-medium text-[#0F172A]"
                      : "border-l-2 border-transparent text-[#475569] hover:bg-[#F8FAFC]"
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
