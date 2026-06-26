import { Calendar, Shield, Users } from "lucide-react";

const PROCESS_CARDS = [
  {
    icon: Shield,
    title: "Primary sources only",
    text: "Every fact is sourced directly from official government websites — migration.gv.at, bamf.de, sem.admin.ch. Never from forums, blogs, or aggregators.",
  },
  {
    icon: Calendar,
    title: "Monthly review cycle",
    text: "Our team checks every guide section once per month. Each entry shows its last verified date. If something is flagged as changed, we update within 48 hours.",
  },
  {
    icon: Users,
    title: "Community flags",
    text: "Registered users can flag any information they believe has changed. Every flag is reviewed within 24 hours and traced back to an official source.",
  },
] as const;

const DISCLAIMER =
  "RelocateEU provides informational content only. This is not legal or immigration advice. Always verify with official authorities before acting.";

export default function TrustSection() {
  return (
    <section
      className="bg-[#F8FAFC] px-6 py-20"
      aria-labelledby="trust-verification-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="trust-verification-heading"
          className="text-center font-sans text-[36px] font-semibold tracking-[-0.02em] text-[#0F172A]"
        >
          How we keep information accurate
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROCESS_CARDS.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-xl border border-[#E2E8F0] bg-white p-6"
            >
              <Icon
                className="h-6 w-6 text-[#2563EB]"
                strokeWidth={1.75}
                aria-hidden
              />
              <h3 className="mt-4 font-sans text-base font-semibold text-[#0F172A]">
                {title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#475569]">
                {text}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-12 text-center font-sans text-[13px] italic text-[#94A3B8]">
          {DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
