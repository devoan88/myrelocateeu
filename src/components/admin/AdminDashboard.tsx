"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ContentHealthTable from "@/components/admin/ContentHealthTable";
import ReportsQueue from "@/components/admin/ReportsQueue";
import type { AdminStats, ContentItem, OutdatedReport } from "@/lib/admin/content";
import { createClient } from "@/lib/supabase/client";

type AdminDashboardProps = {
  stats: AdminStats;
  contentItems: ContentItem[];
  reports: OutdatedReport[];
  adminEmail: string;
};

export default function AdminDashboard({
  stats: initialStats,
  contentItems: initialItems,
  reports: initialReports,
  adminEmail,
}: AdminDashboardProps) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [reports, setReports] = useState(initialReports);
  const [highlightItemId, setHighlightItemId] = useState<string | null>(null);

  const stats: AdminStats = {
    ...initialStats,
    pendingReports: reports.length,
    itemsNeedingReview: items.filter(
      (i) =>
        !i.verified_by ||
        !i.last_verified ||
        (() => {
          const days = Math.floor(
            (Date.now() - new Date(i.last_verified).getTime()) /
              (1000 * 60 * 60 * 24)
          );
          return days > 30;
        })()
    ).length,
  };

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  function handleItemUpdated(updated: ContentItem) {
    setItems((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  }

  function handleReportRemoved(id: string) {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }

  function handleOpenEdit(contentItemId: string) {
    setHighlightItemId(contentItemId);
    document
      .getElementById("content-health")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-sans text-xl font-semibold text-[#0F172A]">
              RelocateEU Admin
            </h1>
            <p className="font-sans text-sm text-[#64748B]">
              Content accuracy · {adminEmail}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="font-sans text-sm text-[#2563EB] no-underline hover:text-[#1D4ED8]"
            >
              User dashboard
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-[#E2E8F0] px-4 py-2 font-sans text-sm text-[#475569] hover:bg-[#F8FAFC]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total users" value={stats.totalUsers} />
          <StatCard label="Premium users" value={stats.premiumUsers} />
          <StatCard
            label="Pending reports"
            value={stats.pendingReports}
            alert={stats.pendingReports > 0}
          />
          <StatCard
            label="Items needing review"
            value={stats.itemsNeedingReview}
            alert={stats.itemsNeedingReview > 0}
            alertTone="warning"
          />
        </div>

        <div id="content-health">
          <ContentHealthTable
            items={items}
            adminEmail={adminEmail}
            onItemUpdated={handleItemUpdated}
            highlightItemId={highlightItemId}
          />
        </div>

        <ReportsQueue
          reports={reports}
          onReportAction={handleReportRemoved}
          onOpenEdit={handleOpenEdit}
        />
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  alert = false,
  alertTone = "default",
}: {
  label: string;
  value: number;
  alert?: boolean;
  alertTone?: "default" | "warning";
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        alert
          ? alertTone === "warning"
            ? "border-amber-200 bg-amber-50"
            : "border-red-200 bg-red-50"
          : "border-[#E2E8F0] bg-white"
      }`}
    >
      <p className="font-sans text-sm text-[#64748B]">{label}</p>
      <p
        className={`mt-1 font-sans text-3xl font-semibold ${
          alert
            ? alertTone === "warning"
              ? "text-amber-800"
              : "text-red-700"
            : "text-[#0F172A]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
