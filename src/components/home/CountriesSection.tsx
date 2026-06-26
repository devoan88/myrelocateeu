import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { cn } from "@/lib/utils";

export default function CountriesSection() {
  return (
    <section
      id="countries"
      className="bg-white px-6 py-20"
      aria-labelledby="countries-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="countries-heading"
          className="text-center font-sans text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]"
        >
          Where are you moving?
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COUNTRIES.map((country) => (
            <article
              key={country.slug}
              className={cn(
                "rounded-2xl bg-white p-7 transition-all duration-200",
                country.isPremiumDestination
                  ? "border-2 border-[#C8A96E] hover:-translate-y-0.5 hover:border-[#C8A96E]"
                  : "border border-[#E2E8F0] hover:-translate-y-0.5 hover:border-[#93C5FD]"
              )}
            >
              {country.isPremiumDestination && (
                <span className="mb-4 inline-block rounded-full border border-[#C8A96E]/60 bg-[#FFFBEB] px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wide text-[#C8A96E]">
                  Premium
                </span>
              )}
              <div className="inline-flex items-center gap-3">
                <span
                  className="text-[40px] leading-none"
                  role="img"
                  aria-label={`${country.name} flag`}
                >
                  {country.flag}
                </span>
                <h3 className="font-sans text-[20px] font-semibold text-[#0F172A]">
                  {country.name}
                </h3>
              </div>

              <hr className="my-5 border-0 border-t border-[#E2E8F0]" />

              <ul className="space-y-3">
                {country.cardItems.map((item) => (
                  <li
                    key={item.text}
                    className="flex gap-2 font-sans text-sm leading-snug text-[#475569]"
                  >
                    <span className="shrink-0" aria-hidden>
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/countries/${country.slug}`}
                className="mt-6 inline-block font-sans text-sm text-[#2563EB] no-underline transition-colors duration-150 hover:text-[#1D4ED8]"
              >
                View guide →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
