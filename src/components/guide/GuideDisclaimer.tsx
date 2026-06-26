"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "relocateeu_guide_disclaimer_dismissed";

export default function GuideDisclaimer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(DISMISS_KEY) !== "1");
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="sticky top-0 z-10 mb-6 flex items-start gap-3 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3"
      role="alert"
    >
      <span className="shrink-0 text-base leading-none" aria-hidden>
        ⚠️
      </span>
      <p className="flex-1 font-sans text-sm text-[#0F172A]">
        Verify all steps on official government websites before acting.
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 font-sans text-sm text-[#64748B] hover:text-[#0F172A]"
        aria-label="Dismiss disclaimer"
      >
        ✕
      </button>
    </div>
  );
}
