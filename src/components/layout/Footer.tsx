import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { COUNTRIES, NAV_COUNTRY_GROUPS } from "@/data/countries";

const countryBySlug = Object.fromEntries(
  COUNTRIES.map((country) => [country.slug, country])
);

const GUIDE_LINKS = [
  ...NAV_COUNTRY_GROUPS.flatMap((group) =>
    group.slugs.map((slug) => {
      const country = countryBySlug[slug];
      return country
        ? { href: `/countries/${slug}`, label: country.name }
        : null;
    })
  ).filter((link): link is { href: string; label: string } => link !== null),
  { href: "/#countries", label: "All countries" },
] as const;

const TOOL_LINKS = [
  { href: "/tools/visa-calculator", label: "Visa calculator" },
  { href: "/tools/cost-simulator", label: "Cost simulator" },
  { href: "/guide", label: "Document checker" },
] as const;

const COMPANY_LINKS = [
  { href: "/", label: "About" },
  { href: "/stories", label: "Stories" },
  { href: "mailto:hello@relocateeu.com", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/privacy-policy", label: "Terms" },
] as const;

const FOOTER_DISCLAIMER =
  "RelocateEU provides general informational content only. Nothing on this platform constitutes legal, immigration, financial or professional advice. Always verify information directly on official government websites. Content reviewed monthly — last review June 2026. RelocateEU is not affiliated with any government authority.";

const FOOTER_TECH_NOTE =
  "Some features use automated assistance technology to personalise information.";

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="font-sans text-sm font-medium text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="font-sans text-sm text-[#64748B] no-underline transition-colors duration-200 hover:text-[#94A3B8]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] px-6 pt-16 pb-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-8">
          <div>
            <Link
              href="/"
              className="font-sans text-[18px] font-medium text-white no-underline"
            >
              RelocateEU
            </Link>
            <p className="mt-2 font-sans text-sm text-[#64748B]">
              Move with confidence.
            </p>
          </div>

          <FooterLinkGroup title="Guides" links={GUIDE_LINKS} />
          <FooterLinkGroup title="Tools" links={TOOL_LINKS} />
          <FooterLinkGroup title="Company" links={COMPANY_LINKS} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1E293B] pt-6 sm:flex-row">
          <p className="font-sans text-xs text-[#475569]">
            © {year} RelocateEU. All rights reserved.
          </p>
          <LanguageSwitcher variant="footer" />
        </div>

        <div className="mt-8 space-y-3">
          <p className="mx-auto max-w-[700px] text-center font-sans text-[11px] leading-relaxed text-[#334155]">
            {FOOTER_DISCLAIMER}
          </p>
          <p className="mx-auto max-w-[700px] text-center font-sans text-[11px] leading-relaxed text-[#334155]">
            {FOOTER_TECH_NOTE}
          </p>
        </div>
      </div>
    </footer>
  );
}
