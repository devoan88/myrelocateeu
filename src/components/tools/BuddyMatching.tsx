"use client";

import Link from "next/link";

const BUDDIES = [
  {
    name: "Nino K.",
    from: "Georgia",
    to: "Vienna, Austria",
    bio: "Moved in 2024. Happy to help with Anmeldung, health insurance, and finding an apartment.",
  },
  {
    name: "Oleksandr M.",
    from: "Ukraine",
    to: "Berlin, Germany",
    bio: "Software engineer. Can advise on Blue Card process and German language courses.",
  },
  {
    name: "Priya S.",
    from: "India",
    to: "Zurich, Switzerland",
    bio: "Relocated with family. Experience with school enrollment and work permits.",
  },
];

export default function BuddyMatching() {
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
          Expat Buddy matching
        </h1>
        <p className="mt-2 font-sans text-sm text-[#475569]">
          Connect with people who have already made the move. Message a buddy to
          ask questions about daily life, paperwork, and settling in.
        </p>

        <div className="mt-8 space-y-4">
          {BUDDIES.map((buddy) => (
            <div
              key={buddy.name}
              className="rounded-xl border border-[#E2E8F0] bg-white p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-sans text-base font-semibold text-[#0F172A]">
                    {buddy.name}
                  </h2>
                  <p className="mt-0.5 font-sans text-xs text-[#64748B]">
                    {buddy.from} → {buddy.to}
                  </p>
                  <p className="mt-2 font-sans text-sm text-[#475569]">
                    {buddy.bio}
                  </p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-lg bg-[#2563EB] px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-[#1D4ED8]"
                >
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
