"use client";

import Image from "next/image";
import { SLIDESHOW_IMAGE_ENTRIES } from "@/lib/unsplash/slideshow-images";

/** Temporary dev preview for slideshow Unsplash URLs — remove before production. */
export default function UnsplashImagePicker() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div>
        <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#2563EB]">
          Temporary dev tool
        </p>
        <h1 className="mt-2 font-sans text-3xl font-semibold text-[#0F172A]">
          Slideshow image preview
        </h1>
        <p className="mt-2 max-w-2xl font-sans text-sm text-[#475569]">
          Direct <code className="text-xs">images.unsplash.com</code> URLs used
          by <code className="text-xs">CountrySlideshow</code>. Copy any URL to
          swap in <code className="text-xs">slideshow-images.ts</code>.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SLIDESHOW_IMAGE_ENTRIES.map((city) => (
          <article
            key={city.slug}
            className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white"
          >
            <div className="relative h-48">
              <Image
                src={city.imageUrl}
                alt={`${city.city}, ${city.country}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 33vw"
                unoptimized={true}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 50%)",
                }}
              />
              <p className="absolute bottom-3 left-3 font-sans text-lg font-semibold text-white">
                {city.city}
              </p>
            </div>

            <div className="space-y-3 p-4">
              <p className="font-sans text-sm text-[#475569]">{city.country}</p>
              <p className="break-all font-mono text-[11px] text-[#94A3B8]">
                {city.imageUrl}
              </p>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(city.imageUrl)}
                className="rounded-lg border border-[#E2E8F0] px-3 py-1.5 font-sans text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                Copy URL
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
