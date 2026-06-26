"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import {
  formatLastUpdated,
  lastVerifiedLabels,
  reportOutdatedLabels,
} from "@/lib/relocation-info";
import type { RelocationInfo, RelocationLanguage } from "@/lib/supabase/types";
import { toastReportSubmitted } from "@/lib/toast";

type GuideVerificationFooterProps = {
  info: RelocationInfo;
  language: RelocationLanguage;
  destination?: string;
  origin?: string;
  className?: string;
};

export default function GuideVerificationFooter({
  info,
  language,
  destination,
  origin,
  className = "",
}: GuideVerificationFooterProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorText, setErrorText] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorText("");

    try {
      const response = await fetch("/api/report-outdated", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entryId: info.id,
          country: info.country,
          category: info.category,
          title: info.title,
          lastVerified: info.last_updated,
          sourceUrl: info.source_url,
          destination,
          origin,
          message: message.trim() || undefined,
          email: email.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        toastReportSubmitted();
        setMessage("");
        setEmail("");
      } else {
        setStatus("error");
        setErrorText(data.error ?? "Could not send report.");
      }
    } catch {
      setStatus("error");
      setErrorText("Connection error. Please try again.");
    }
  }

  function closeModal() {
    setModalOpen(false);
    setStatus("idle");
    setErrorText("");
  }

  function openModal(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setModalOpen(true);
  }

  const labels = reportOutdatedLabels[language];

  return (
    <>
      <div
        className={`flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between ${className}`}
      >
        <p className="text-xs text-slate-500">
          {lastVerifiedLabels[language]}:{" "}
          <time dateTime={info.last_updated} className="font-medium text-slate-700">
            {formatLastUpdated(info.last_updated, language)}
          </time>
        </p>
        <button
          type="button"
          onClick={openModal}
          className="inline-flex w-fit items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          {labels.button}
        </button>
      </div>

      <Modal
        open={modalOpen}
        onClose={closeModal}
        labelledBy="report-outdated-title"
      >
        {status === "success" ? (
          <div className="text-center">
            <p className="text-lg font-semibold text-green-800">
              {labels.successTitle}
            </p>
            <p className="mt-2 text-sm text-slate-600">{labels.successBody}</p>
            <button
              type="button"
              onClick={closeModal}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {labels.close}
            </button>
          </div>
        ) : (
          <>
            <h3
              id="report-outdated-title"
              className="text-lg font-bold text-slate-900"
            >
              {labels.modalTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{labels.modalHint}</p>
            <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
              <span className="font-medium">{info.title}</span>
              <span className="text-slate-400"> · </span>
              {lastVerifiedLabels[language]}:{" "}
              {formatLastUpdated(info.last_updated, language)}
            </p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  {labels.messageLabel}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={labels.messagePlaceholder}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700">
                  {labels.emailLabel}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={labels.emailPlaceholder}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {errorText && (
                <p className="text-sm text-red-600">{errorText}</p>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {status === "loading" ? labels.sending : labels.submit}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {labels.cancel}
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </>
  );
}
