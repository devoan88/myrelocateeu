import Link from "next/link";
import VerifiedBadge from "@/components/ui/VerifiedBadge";
import { monaco } from "@/data/countries/monaco";

const VERIFIED_DATE = "2026-05-01";

const KEY_FACTS = [
  {
    value: "0%",
    label: "Personal income tax for most residents",
  },
  {
    value: "Not EU",
    label: "Monaco is not an EU member state",
  },
  {
    value: "~€500K",
    label: "Typical bank reference threshold",
  },
  {
    value: "3 months",
    label: "Minimum annual residence required",
  },
] as const;

const PROCESS_STEPS = [
  {
    number: 1,
    title: "Secure accommodation",
    description:
      "Lease or purchase a home in Monaco with a minimum 12-month term. A hotel stay does not qualify.",
    link: null,
    note: null,
  },
  {
    number: 2,
    title: "Open Monaco bank account + obtain reference letter",
    description:
      "Banks issue the reference letter required for your residency dossier. Requirements vary by institution — most expect deposits around €500,000.",
    link: null,
    note: null,
  },
  {
    number: 3,
    title: "Obtain French Type D long-stay visa",
    description:
      "Non-EU/EEA nationals only. Monaco does not issue entry visas; the French Type D visa is required first.",
    link: "https://france-visas.gouv.fr",
    linkLabel: "france-visas.gouv.fr",
    note: "Non-EU nationals only",
  },
  {
    number: 4,
    title: "Submit residency dossier to Section de Résidents",
    description:
      "File your complete dossier including birth certificate, criminal record extracts, accommodation proof, and bank reference letter.",
    link: "https://en.gouv.mc/Government-Institutions/The-Government/General-Directorates/Department-of-the-Interior/Direction-de-la-Surete-Publique/Residents-Section",
    linkLabel: "Section de Résidents",
    note: null,
  },
  {
    number: 5,
    title: "Attend mandatory interview",
    description:
      "A required in-person interview with Monaco's residency authorities.",
    link: null,
    note: null,
  },
  {
    number: 6,
    title: "Receive Carte de Séjour Temporaire",
    description:
      "Valid for 1 year, renewable annually for up to 3 years before progressing to an ordinary residence card.",
    link: "https://en.gouv.mc",
    linkLabel: "en.gouv.mc",
    note: null,
  },
] as const;

const RESIDENCE_CARD_TYPES = [
  {
    type: "Temporary",
    detail: "1 year, renewable up to 3×",
  },
  {
    type: "Ordinary",
    detail: "3 years, renewable once",
  },
  {
    type: "Privileged",
    detail: "10 years, after 10 years continuous residence",
  },
] as const;

function GoldVerifiedBadge() {
  return (
    <VerifiedBadge
      date={VERIFIED_DATE}
      className="border border-[#C8A96E]/30 bg-[#C8A96E]/10 text-[#C8A96E]"
    />
  );
}

export default function MonacoCountryPageView() {
  const guideHref = `/guide?destination=${encodeURIComponent(monaco.name)}&origin=Other`;

  return (
    <div className="bg-[#020617] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[#0F172A]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0F172A]/85 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(200,169,110,0.18) 0%, transparent 60%)",
          }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <span
            className="inline-block rounded-[20px] border border-[#C8A96E] px-4 py-1.5 font-sans text-xs text-[#C8A96E]"
            style={{ backgroundColor: "rgba(200,169,110,0.15)" }}
          >
            Ultra-high-net-worth destination
          </span>

          <div className="mt-8 flex flex-col items-center gap-4">
            <span
              className="text-[80px] leading-none"
              role="img"
              aria-label="Monaco flag"
            >
              {monaco.flag}
            </span>
            <h1 className="font-sans text-[48px] font-semibold leading-tight text-white">
              Monaco
            </h1>
            <p className="max-w-xl font-sans text-lg text-[#CBD5E1]">
              An exceptional residency, for an exceptional profile.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <GoldVerifiedBadge />
            <span className="inline-block rounded-full border border-[#FCD34D]/60 bg-[#FFFBEB]/10 px-4 py-1.5 font-sans text-xs font-semibold text-[#FCD34D]">
              New guide — under active review
            </span>
          </div>

          <Link
            href={guideHref}
            className="mt-10 inline-block rounded-[10px] border border-[#C8A96E] bg-[#C8A96E]/15 px-8 py-3.5 font-sans text-base font-medium text-[#C8A96E] transition-colors hover:bg-[#C8A96E]/25"
          >
            Start my Monaco checklist →
          </Link>
        </div>
      </section>

      {/* Key facts bar */}
      <section className="border-y border-[#1E293B] bg-[#0F172A] px-6 py-12">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="rounded-lg border border-[#1E293B] bg-[#0F172A] p-6 text-center"
            >
              <p className="font-sans text-[32px] font-semibold leading-none text-[#C8A96E]">
                {fact.value}
              </p>
              <p className="mt-3 font-sans text-sm leading-snug text-[#CBD5E1]">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <div className="bg-[#F8FAFC] text-[#0F172A]">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          {/* Before you begin */}
          <div
            className="rounded-lg border-l-4 border-[#C8A96E] bg-[#FFFBEB] p-5"
            style={{ padding: "20px" }}
          >
            <h2 className="font-sans text-lg font-semibold text-[#78350F]">
              Before you begin
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-[#78350F]">
              Monaco residency is a structured, document-heavy process with no
              investment-visa shortcut. Most applicants work with specialized
              immigration advisors and private bankers throughout. This guide
              explains the official process — it does not replace professional
              advice for a process of this complexity.
            </p>
          </div>

          {/* Process timeline */}
          <section className="mt-16">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-sans text-[32px] font-semibold text-[#0F172A]">
                Residency process
              </h2>
              <GoldVerifiedBadge />
            </div>
            <p className="mt-2 font-sans text-sm text-[#475569]">
              Official pathway to Carte de Séjour Temporaire
            </p>

            <ol className="relative mt-10 space-y-0">
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.number} className="relative flex gap-5 pb-10">
                  {index < PROCESS_STEPS.length - 1 && (
                    <span
                      className="absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-px bg-[#1E293B]"
                      aria-hidden
                    />
                  )}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C8A96E] bg-[#FFFBEB] font-sans text-sm font-semibold text-[#C8A96E]">
                    {step.number}
                  </span>
                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-sans text-lg font-semibold text-[#0F172A]">
                        {step.title}
                      </h3>
                      {step.note && (
                        <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 font-sans text-[11px] font-medium text-[#64748B]">
                          {step.note}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-[#475569]">
                      {step.description}
                    </p>
                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex font-sans text-sm font-medium text-[#B8860B] hover:text-[#92400E]"
                      >
                        → {step.linkLabel}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Tax residency note */}
          <section className="mt-4 rounded-xl border border-[#E2E8F0] bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="font-sans text-xl font-semibold text-[#0F172A]">
                Tax residency note
              </h2>
              <GoldVerifiedBadge />
            </div>
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#475569]">
              Residency permit ≠ automatic tax residency in your home
              country&apos;s eyes. A separate tax residency certificate may be
              required. French nationals remain subject to French taxation under
              a 1963 bilateral treaty even when resident in Monaco.
            </p>
          </section>

          {/* Residence card types */}
          <section className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-sans text-[32px] font-semibold text-[#0F172A]">
                Residence card progression
              </h2>
              <GoldVerifiedBadge />
            </div>
            <div className="mt-8 overflow-hidden rounded-xl border border-[#E2E8F0] bg-white">
              <table className="w-full border-collapse font-sans text-sm">
                <thead>
                  <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
                    <th className="px-5 py-4 text-left font-semibold text-[#0F172A]">
                      Card type
                    </th>
                    <th className="px-5 py-4 text-left font-semibold text-[#0F172A]">
                      Terms
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {RESIDENCE_CARD_TYPES.map((row, index) => (
                    <tr
                      key={row.type}
                      className={
                        index < RESIDENCE_CARD_TYPES.length - 1
                          ? "border-b border-[#E2E8F0]"
                          : undefined
                      }
                    >
                      <td className="px-5 py-4 font-medium text-[#C8A96E]">
                        {row.type}
                      </td>
                      <td className="px-5 py-4 text-[#475569]">
                        {row.detail}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Official links */}
          <section className="mt-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-sans text-[32px] font-semibold text-[#0F172A]">
                Official links
              </h2>
              <GoldVerifiedBadge />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {monaco.officialResources.map((resource) => (
                <a
                  key={resource.url}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-xl border border-[#E2E8F0] bg-white p-5 transition-colors hover:border-[#C8A96E]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFFBEB] text-lg">
                    🔗
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-semibold text-[#B8860B] group-hover:text-[#92400E]">
                      {resource.label}
                    </p>
                    <p className="mt-1 font-sans text-xs text-[#64748B]">
                      {resource.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mt-16 border-t border-[#E2E8F0] pt-10">
            <p className="font-sans text-sm leading-relaxed text-[#64748B]">
              {monaco.disclaimer}
            </p>
            <p className="mt-4 font-sans text-xs text-[#94A3B8]">
              RelocateEU provides general informational content only. Nothing on
              this platform constitutes legal, immigration, financial or
              professional advice. Always verify information directly on official
              government websites.
            </p>
            <div className="mt-4">
              <GoldVerifiedBadge />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
