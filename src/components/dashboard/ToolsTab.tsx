"use client";

import Link from "next/link";
import { Calculator, Calendar, Coins, FileCheck, Users } from "lucide-react";

const TOOLS = [
  {
    href: "/tools/schengen-calculator",
    icon: Calendar,
    title: "Schengen day counter",
    description: "Check your 90/180 day allowance and avoid overstay fines.",
    premium: false,
  },
  {
    href: "/tools/visa-calculator",
    icon: Calculator,
    title: "Visa eligibility calculator",
    description: "Estimate your work permit chances for Austria, Germany, or Switzerland.",
    premium: true,
  },
  {
    href: "/tools/document-checker",
    icon: FileCheck,
    title: "Document checker",
    description: "Verify your documents against official relocation requirements.",
    premium: true,
  },
  {
    href: "/tools/buddy-matching",
    icon: Users,
    title: "Expat Buddy matching",
    description: "Connect with fellow expats at your destination.",
    premium: true,
  },
  {
    href: "/tools/cost-simulator",
    icon: Coins,
    title: "Cost of living simulator",
    description: "Compare monthly expenses across Vienna, Berlin, Munich, and more.",
    premium: false,
  },
] as const;

export default function ToolsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-[28px] font-semibold text-[#0F172A]">
          Tools
        </h1>
        <p className="mt-2 font-sans text-sm text-[#475569]">
          Planning tools to help you relocate with confidence.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map(({ href, icon: Icon, title, description, premium }) => (
          <Link
            key={href}
            href={href}
            className="rounded-xl border border-[#E2E8F0] bg-white p-5 no-underline transition-colors hover:border-[#93C5FD] hover:bg-[#F8FAFC]"
          >
            <Icon className="h-6 w-6 text-[#2563EB]" aria-hidden />
            <h2 className="mt-3 font-sans text-base font-semibold text-[#0F172A]">
              {title}
              {premium && (
                <span className="ml-2 rounded bg-[#EFF6FF] px-1.5 py-0.5 font-sans text-[10px] font-medium uppercase text-[#2563EB]">
                  Premium
                </span>
              )}
            </h2>
            <p className="mt-1 font-sans text-sm text-[#475569]">{description}</p>
            <span className="mt-4 inline-block font-sans text-sm text-[#2563EB]">
              Open tool →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
