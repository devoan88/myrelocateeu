import Link from "next/link";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import type { CountryPageData } from "@/data/countries/types";

function ResourceIcon() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ice text-lg">
      🔗
    </span>
  );
}

type CountryPageViewProps = {
  data: CountryPageData;
};

export default function CountryPageView({ data }: CountryPageViewProps) {
  const guideHref = `/guide?destination=${encodeURIComponent(data.name)}&origin=Other`;

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="border-b border-border bg-white px-6 py-16 text-center sm:py-20" style={{ borderBottomWidth: "0.5px" }}>
        <div className="mx-auto max-w-3xl">
          {(data.isPremiumDestination || data.confidenceLevel === "new") && (
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              {data.isPremiumDestination && (
                <span className="inline-block rounded-full border border-[#D4AF37]/50 bg-[#FFFBEB] px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-wide text-[#92400E]">
                  Premium destination
                </span>
              )}
              {data.confidenceLevel === "new" && (
                <span className="inline-block rounded-full border border-[#FCD34D]/60 bg-[#FFFBEB] px-4 py-1.5 font-body text-xs font-semibold text-[#92400E]">
                  New guide — under active review
                </span>
              )}
            </div>
          )}
          <span className="text-[80px] leading-none" role="img" aria-label={data.name}>
            {data.flag}
          </span>
          <h1 className="mt-4 font-display text-[48px] leading-tight text-navy">
            {data.name}
          </h1>
          <p className="mt-2 font-body text-lg text-text-mid">{data.tagline}</p>
          {data.disclaimer && (
            <p className="mx-auto mt-6 max-w-2xl rounded-lg border border-[#D4AF37]/30 bg-[#FFFBEB] px-4 py-3 font-body text-sm leading-relaxed text-[#78350F]">
              {data.disclaimer}
            </p>
          )}
          <Link
            href={guideHref}
            className="mt-8 inline-block rounded-[10px] bg-blue px-8 py-3.5 font-body text-base font-medium text-white transition-colors hover:bg-navy"
            style={{ padding: "14px 28px" }}
          >
            Start my {data.name} checklist →
          </Link>
        </div>
      </section>

      {/* Quick facts */}
      <section className="px-6 py-12 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.quickFacts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-card border border-border bg-white p-6 text-center"
              style={{ borderWidth: "0.5px" }}
            >
              <p className="font-body text-xs font-medium uppercase tracking-wide text-text-light">
                {fact.label}
              </p>
              <p className="mt-2 font-body text-lg font-semibold text-navy">
                {fact.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {data.keyFacts && data.keyFacts.length > 0 && (
        <section className="border-b border-border bg-[#FFFBEB] px-6 py-12 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-[28px] text-navy">Key facts</h2>
            <p className="mt-2 font-body text-sm text-text-mid">
              Essential information before you start your application.
            </p>
            <ul className="mt-6 space-y-3">
              {data.keyFacts.map((fact) => (
                <li
                  key={fact}
                  className="flex gap-3 rounded-lg border border-[#D4AF37]/25 bg-white px-4 py-3 font-body text-sm leading-relaxed text-[#78350F]"
                >
                  <span className="shrink-0 text-[#D4AF37]" aria-hidden>
                    ●
                  </span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Visa types */}
      <section className="bg-white px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[32px] text-navy">Visa types</h2>
          <p className="mt-2 font-body text-text-mid">
            Common pathways — always confirm requirements on official sites.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {data.visaTypes.map((visa) => (
              <article
                key={visa.name}
                className="rounded-xl border border-border bg-cream/30 p-6"
                style={{ borderWidth: "0.5px", padding: "24px" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-body text-lg font-semibold text-navy">
                      {visa.name}
                    </h3>
                    <p className="mt-0.5 font-body text-sm text-text-mid">
                      {visa.subtitle}
                    </p>
                  </div>
                  <VerifiedBadge date={visa.verifiedDate} />
                </div>
                <ul className="mt-4 list-inside list-disc space-y-1.5 font-body text-sm text-text-mid">
                  {visa.requirements.map((req) => (
                    <li key={req}>{req}</li>
                  ))}
                </ul>
                <a
                  href={visa.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 font-body text-sm font-medium text-blue hover:text-navy"
                >
                  → {new URL(visa.url).hostname.replace(/^www\./, "")}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cost of living */}
      <section className="px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-[32px] text-navy">
            {data.costOfLiving.heading}
          </h2>
          <div
            className="mt-8 rounded-card border border-border bg-white p-6 sm:p-8"
            style={{ borderWidth: "0.5px" }}
          >
            {data.costOfLiving.note && (
              <p className="font-body text-sm leading-relaxed text-text-mid">
                {data.costOfLiving.note}
              </p>
            )}
            {data.costOfLiving.items && data.costOfLiving.items.length > 0 && (
              <ul className="divide-y divide-border">
                {data.costOfLiving.items.map((item) => (
                  <li
                    key={item.label}
                    className="flex flex-col justify-between gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center"
                  >
                    <span className="font-body text-sm text-text-mid">
                      {item.label}
                    </span>
                    <span className="font-body text-sm font-medium text-navy">
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p
              className={`font-body text-xs text-text-light ${data.costOfLiving.note || (data.costOfLiving.items && data.costOfLiving.items.length > 0) ? "mt-6 border-t border-border pt-4" : ""}`}
            >
              {data.costOfLiving.sourceNote}
            </p>
          </div>
        </div>
      </section>

      {/* Official resources */}
      <section className="bg-white px-6 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-display text-[32px] text-navy">
            Official resources
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.officialResources.map((resource) => (
              <a
                key={resource.url}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 rounded-card border border-border bg-white p-5 transition-colors hover:border-blue"
                style={{ borderWidth: "0.5px" }}
              >
                <ResourceIcon />
                <div className="min-w-0">
                  <p className="font-body text-sm font-semibold text-blue group-hover:text-navy">
                    {resource.label}
                  </p>
                  <p className="mt-1 font-body text-xs text-text-mid">
                    {resource.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
