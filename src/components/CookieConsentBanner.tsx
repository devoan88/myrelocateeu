"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_KEY = "relocateeu_cookie_consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  function setConsent(value: "accepted" | "declined") {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white p-4 shadow-lg sm:p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-600">
          <p className="font-medium text-slate-900">We use cookies</p>
          <p className="mt-1">
            RelocateEU uses essential cookies for authentication and preferences,
            and optional analytics cookies to improve our service. See our{" "}
            <Link href="/privacy-policy" className="text-blue-600 underline">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CONSENT_KEY) === "accepted";
}
