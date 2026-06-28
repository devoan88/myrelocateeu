"use client";

import Link from "next/link";

const CHECKLIST = [
  {
    title: "Passport",
    description: "Valid for at least 6 months beyond your planned arrival date.",
  },
  {
    title: "Visa application form",
    description: "Completed and signed — use the official form for your destination country.",
  },
  {
    title: "Proof of accommodation",
    description: "Rental contract, hotel booking, or invitation letter with host details.",
  },
  {
    title: "Health insurance",
    description: "Coverage meeting minimum requirements for your visa type.",
  },
  {
    title: "Financial proof",
    description: "Bank statements or employment contract showing sufficient funds.",
  },
  {
    title: "Criminal record certificate",
    description: "Issued within the last 3–6 months, apostilled if required.",
  },
];

export default function DocumentChecker() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/dashboard?tab=tools"
          className="font-sans text-sm text-[#2563EB] no-underline hover:underline"
        >
          ← Back to tools
        </Link>
        <h1 className="mt-6 font-sans text-[28px] font-semibold text-[#0F172A]">
          Document checker
        </h1>
        <p className="mt-2 font-sans text-sm text-[#475569]">
          Review the standard documents required for most EU relocation visas.
          Always confirm with the official embassy for your specific case.
        </p>

        <ul className="mt-8 space-y-4">
          {CHECKLIST.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-[#E2E8F0] bg-white p-5"
            >
              <h2 className="font-sans text-base font-semibold text-[#0F172A]">
                {item.title}
              </h2>
              <p className="mt-1 font-sans text-sm text-[#475569]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
