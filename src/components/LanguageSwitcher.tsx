"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/i18n/translations";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  variant = "default",
}: {
  variant?: "default" | "footer";
}) {
  const { locale, setLocale, locales } = useLanguage();
  const isFooter = variant === "footer";

  return (
    <div
      className={cn(
        "flex rounded-lg border p-0.5",
        isFooter
          ? "border-[#1E293B] bg-transparent"
          : "border-blue-200 bg-white"
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code as Locale)}
          className={cn(
            "rounded-md px-2.5 py-1.5 font-sans text-xs font-medium transition-colors",
            locale === code
              ? isFooter
                ? "bg-[#2563EB] text-white"
                : "bg-blue-600 text-white"
              : isFooter
                ? "text-[#64748B] hover:text-[#94A3B8]"
                : "text-blue-700 hover:bg-blue-50"
          )}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
