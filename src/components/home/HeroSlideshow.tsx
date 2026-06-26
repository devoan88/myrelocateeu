"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HERO_DESTINATIONS } from "@/data/countries";
import { SLIDESHOW_IMAGE_ENTRIES } from "@/lib/unsplash/slideshow-images";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 5000;

const ORIGINS = [
  { value: "Georgia", label: "Georgia 🇬🇪" },
  { value: "Ukraine", label: "Ukraine 🇺🇦" },
  { value: "Armenia", label: "Armenia 🇦🇲" },
  { value: "India", label: "India 🇮🇳" },
  { value: "Other", label: "Other" },
] as const;

function HeroSelect({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-white/90">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-[44px] w-full appearance-none rounded-lg border-0 bg-white/90",
            "py-[10px] pl-[14px] pr-10 font-sans text-sm text-[#0F172A] outline-none",
            "focus:ring-2 focus:ring-[#2563EB]/40"
          )}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default function HeroSlideshow() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [destination, setDestination] = useState("");
  const [origin, setOrigin] = useState("");
  const [paused, setPaused] = useState(false);

  const slides = SLIDESHOW_IMAGE_ENTRIES;
  const activeSlide = slides[activeIndex];
  const canStart = Boolean(destination && origin);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, slides.length]);

  function handleGetGuide() {
    if (!canStart) return;
    const params = new URLSearchParams({ destination, origin });
    router.push(`/guide?${params.toString()}`);
  }

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      aria-label="Hero slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.slug}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={slide.imageUrl}
            alt={`${slide.city}, ${slide.country}`}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={index < 2}
            unoptimized
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-end pb-28">
        <p className="font-sans text-[48px] font-semibold leading-none text-white">
          {activeSlide.city}
        </p>
        <p className="mt-2 font-sans text-[20px] font-light text-white/90">
          {activeSlide.country}
        </p>
      </div>

      <div className="absolute bottom-8 left-8 z-10">
        <span
          className={cn(
            "inline-block rounded-full px-3 py-1 font-sans text-[11px] font-medium",
            activeSlide.isPremium
              ? "border border-[#D4AF37]/60 bg-[#FFFBEB]/90 text-[#92400E]"
              : "border border-[#93C5FD] bg-[#EFF6FF]/90 text-[#2563EB]"
          )}
        >
          {activeSlide.isPremium ? "Premium guide" : "Core guide"}
        </span>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
        role="tablist"
        aria-label="Slideshow navigation"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`Go to ${slide.city}`}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full bg-white/50 transition-all duration-300 hover:bg-white/80",
              index === activeIndex ? "w-6 bg-white" : "w-2"
            )}
          />
        ))}
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center px-6 pt-16">
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center text-center">
          <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-sans text-xs text-white backdrop-blur-md">
            7 European countries · Official sources · Updated monthly
          </span>

          <h1 className="mt-6 font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-[56px] lg:text-[64px]">
            Relocate to Europe
          </h1>
          <p className="font-sans text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] text-[#93C5FD] sm:text-[56px] lg:text-[64px]">
            without the confusion.
          </p>

          <p className="mt-5 max-w-[520px] font-sans text-lg text-white/90">
            Step-by-step guides verified against official government sources.
          </p>

          <div
            className="mt-8 w-full max-w-[560px] rounded-2xl p-6 text-left"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <HeroSelect
                id="hero-destination"
                label="I'm moving to..."
                value={destination}
                onChange={setDestination}
                options={HERO_DESTINATIONS}
                placeholder="Select country"
              />
              <HeroSelect
                id="hero-origin"
                label="I'm from..."
                value={origin}
                onChange={setOrigin}
                options={ORIGINS}
                placeholder="Select country"
              />
            </div>

            <button
              type="button"
              disabled={!canStart}
              onClick={handleGetGuide}
              className={cn(
                "mt-4 flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] font-sans text-[15px] font-medium text-white transition-colors duration-150",
                "hover:bg-[#1D4ED8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              Get my free guide →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
