"use client";

import Link from "next/link";
import { usePlan } from "@/hooks/usePlan";
import { cn } from "@/lib/cn";

type PremiumFeatureGateProps = {
  feature: keyof typeof import("@/lib/features").PLAN_FEATURES.free;
  featureLabel?: string;
  children: React.ReactNode;
  className?: string;
};

export default function PremiumFeatureGate({
  feature,
  featureLabel = "Premium feature",
  children,
  className,
}: PremiumFeatureGateProps) {
  const { features, loading } = usePlan();

  if (loading) {
    return <div className={cn("animate-pulse rounded-2xl bg-[#F1F5F9]", className)} />;
  }

  const value = features[feature as keyof typeof features];
  const unlocked = value === true || value === "unlimited" || value === "all";

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none select-none blur-sm">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 p-6">
        <div className="max-w-sm rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center shadow-lg">
          <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#2563EB]">
            {featureLabel}
          </p>
          <h3 className="mt-2 font-sans text-lg font-semibold text-[#0F172A]">
            Upgrade to unlock
          </h3>
          <p className="mt-2 font-sans text-sm text-[#475569]">
            This tool is included with Premium and Pro plans.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#2563EB] font-sans text-sm font-medium text-white no-underline transition-colors hover:bg-[#1D4ED8]"
          >
            View plans
          </Link>
        </div>
      </div>
    </div>
  );
}
