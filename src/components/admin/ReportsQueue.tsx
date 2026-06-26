"use client";

import { useState } from "react";
import type { OutdatedReport } from "@/lib/admin/content";

type ReportsQueueProps = {
  reports: OutdatedReport[];
  onReportAction: (id: string) => void;
  onOpenEdit: (contentItemId: string) => void;
};

export default function ReportsQueue({
  reports,
  onReportAction,
  onOpenEdit,
}: ReportsQueueProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleAction(
    id: string,
    action: "resolve" | "dismiss"
  ) {
    setLoadingId(id);
    const res = await fetch(`/api/admin/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      onReportAction(id);
    }
    setLoadingId(null);
  }

  if (reports.length === 0) {
    return (
      <section className="rounded-xl border border-[#E2E8F0] bg-white p-6">
        <h2 className="font-sans text-lg font-semibold text-[#0F172A]">
          Reports queue
        </h2>
        <p className="mt-2 font-sans text-sm text-[#64748B]">
          No pending outdated reports.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 font-sans text-lg font-semibold text-[#0F172A]">
        Reports queue
      </h2>
      <div className="space-y-3">
        {reports.map((report) => {
          const title =
            report.content_item?.title ?? "Unknown content item";
          const reporterName =
            report.reporter?.full_name ??
            report.reporter?.email ??
            "Anonymous";
          const date = new Date(report.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              key={report.id}
              className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-sans text-sm font-semibold text-[#0F172A]">
                    {title}
                  </p>
                  <p className="mt-1 font-sans text-xs text-[#64748B]">
                    Reported by {reporterName} · {date}
                  </p>
                  {report.reason && (
                    <p className="mt-2 font-sans text-sm text-[#475569]">
                      &ldquo;{report.reason}&rdquo;
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={loadingId === report.id}
                    onClick={() => handleAction(report.id, "resolve")}
                    className="rounded-lg bg-[#16A34A] px-3 py-1.5 text-xs font-medium text-white hover:bg-green-700 disabled:opacity-50"
                  >
                    Mark resolved
                  </button>
                  {report.content_item_id && (
                    <button
                      type="button"
                      onClick={() => onOpenEdit(report.content_item_id!)}
                      className="rounded-lg bg-[#EFF6FF] px-3 py-1.5 text-xs font-medium text-[#2563EB] hover:bg-[#DBEAFE]"
                    >
                      Open edit
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={loadingId === report.id}
                    onClick={() => handleAction(report.id, "dismiss")}
                    className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-50"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
