"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { COUNTRIES } from "@/data/countries";
import type { CountryNavGroup } from "@/data/countries/types";
import { SLIDESHOW_IMAGES } from "@/lib/unsplash/slideshow-images";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 4000;

const CITY_LABELS: Record<string, string> = {
  austria: "Vienna",
  germany: "Berlin",
  switzerland: "Zurich",
  france: "Paris",
  monaco: "Monte Carlo",
  luxembourg: "Luxembourg City",
  netherlands: "Amsterdam",
};

function guideTag(navGroup: CountryNavGroup): {
  label: string;
  className: string;
} {
  if (navGroup === "premium") {
    return {
      label: "Premium guide",
      className:
        "border border-[#D4AF37]/50 bg-[#FFFBEB] text-[#92400E]",
    };
  }
  return {
    label: "Core guide",
    className: "border border-[#93C5FD] bg-[#EFF6FF] text-[#2563EB]",
  };
}

export default function CountrySlideshow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, moved: false });
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const slides = COUNTRIES.map((country) => ({
    slug: country.slug,
    city: CITY_LABELS[country.slug] ?? country.name,
    country: country.name,
    flag: country.flag,
    image: SLIDESHOW_IMAGES[country.slug],
    tag: guideTag(country.navGroup),
  }));

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement | undefined;
    if (!child) return;

    const offset =
      child.offsetLeft - (container.clientWidth - child.clientWidth) / 2;
    container.scrollTo({ left: Math.max(0, offset), behavior });
    setActiveIndex(index);
  }, []);

  const updateActiveFromScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || dragState.current.active) return;

    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % slides.length;
        scrollToIndex(next);
        return next;
      });
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused, scrollToIndex, slides.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => container.removeEventListener("scroll", updateActiveFromScroll);
  }, [updateActiveFromScroll]);

  function pauseBriefly() {
    setPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setPaused(false), SLIDE_INTERVAL_MS * 2);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container) return;
    dragState.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: container.scrollLeft,
      moved: false,
    };
    container.setPointerCapture(e.pointerId);
    setPaused(true);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container || !dragState.current.active) return;
    const delta = e.clientX - dragState.current.startX;
    if (Math.abs(delta) > 4) dragState.current.moved = true;
    container.scrollLeft = dragState.current.scrollLeft - delta;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const container = scrollRef.current;
    if (!container) return;
    dragState.current.active = false;
    container.releasePointerCapture(e.pointerId);
    updateActiveFromScroll();
    pauseBriefly();
  }

  return (
    <section
      className="w-full bg-white"
      aria-label="Destination cities slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => pauseBriefly()}
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex h-[300px] gap-4 overflow-x-auto px-6 pb-2",
          "cursor-grab active:cursor-grabbing",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "snap-x snap-mandatory"
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {slides.map((slide, index) => (
          <Link
            key={slide.slug}
            href={`/countries/${slide.slug}`}
            className={cn(
              "relative h-full w-[380px] shrink-0 snap-center overflow-hidden rounded-2xl",
              "transition-opacity duration-200 hover:opacity-95"
            )}
            onClick={(e) => {
              if (dragState.current.moved) {
                e.preventDefault();
                dragState.current.moved = false;
              }
            }}
            aria-label={`${slide.city}, ${slide.country}`}
          >
            {slide.image && (
              <Image
                src={slide.image}
                alt={`${slide.city}, ${slide.country}`}
                fill
                className="object-cover object-center"
                sizes="380px"
                priority={index < 2}
                draggable={false}
                unoptimized
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 55%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <p className="font-sans text-xl font-semibold text-white">
                <span className="mr-2" aria-hidden>
                  {slide.flag}
                </span>
                {slide.city}
              </p>
              <p className="mt-1 font-sans text-[13px] text-[#CBD5E1]">
                {slide.country}
              </p>
              <span
                className={cn(
                  "mt-3 inline-block rounded-full px-2.5 py-1 font-sans text-[11px] font-medium",
                  slide.tag.className
                )}
              >
                {slide.tag.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-2 pb-6"
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
            onClick={() => scrollToIndex(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === activeIndex
                ? "w-6 bg-[#2563EB]"
                : "w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]"
            )}
          />
        ))}
      </div>
    </section>
  );
}
