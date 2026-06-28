import Link from "next/link";
import {
  Calculator,
  Calendar,
  Coins,
  FileCheck,
  Users,
} from "lucide-react";

const TOOLS = [
  {
    href: "/tools/schengen-calculator",
    icon: Calendar,
    title: "Schengen Day Counter",
    description:
      "Check your 90/180 day allowance and avoid costly overstay fines.",
    badge: "Free tool",
    featured: true,
  },
  {
    href: "/tools/visa-calculator",
    icon: Calculator,
    title: "Visa eligibility calculator",
    description:
      "Estimate your work permit chances for Austria, Germany, or Switzerland.",
    badge: "Premium",
    featured: false,
  },
  {
    href: "/tools/cost-simulator",
    icon: Coins,
    title: "Cost of living simulator",
    description:
      "Compare monthly expenses across Vienna, Berlin, Munich, and more.",
    badge: "Free tool",
    featured: false,
  },
  {
    href: "/tools/document-checker",
    icon: FileCheck,
    title: "Document checker",
    description:
      "Verify your documents against official relocation requirements.",
    badge: "Premium",
    featured: false,
  },
  {
    href: "/tools/buddy-matching",
    icon: Users,
    title: "Expat Buddy matching",
    description: "Connect with fellow expats at your destination.",
    badge: "Premium",
    featured: false,
  },
] as const;

export default function ToolsSection() {
  return (
    <section className="bg-[#F8FAFC] px-6 py-20">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-center font-sans text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]">
          Planning tools
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center font-sans text-base text-[#475569]">
          Calculators and checklists to help you plan your move — or stay
          compliant while traveling.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map(({ href, icon: Icon, title, description, badge, featured }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-2xl border bg-white p-6 no-underline transition-colors hover:border-[#93C5FD] hover:shadow-sm ${
                featured
                  ? "border-[#2563EB] ring-1 ring-[#2563EB]/20"
                  : "border-[#E2E8F0]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF]">
                  <Icon className="h-5 w-5 text-[#2563EB]" aria-hidden />
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide ${
                    badge === "Free tool"
                      ? "bg-[#DCFCE7] text-[#16A34A]"
                      : "bg-[#EFF6FF] text-[#2563EB]"
                  }`}
                >
                  {badge}
                </span>
              </div>
              <h3 className="mt-4 font-sans text-lg font-semibold text-[#0F172A]">
                {title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-[#475569]">
                {description}
              </p>
              <span className="mt-4 inline-block font-sans text-sm font-medium text-[#2563EB]">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
