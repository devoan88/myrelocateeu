import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalPageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <article className="mx-auto max-w-[800px] font-sans text-[#475569]">
        <h1 className="text-[32px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]">
          {title}
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">Last updated: June 2026</p>
        <div className="mt-10 space-y-10">{children}</div>
        <p className="mt-12">
          <Link
            href="/"
            className="text-sm text-[#2563EB] no-underline transition-colors hover:text-[#1D4ED8]"
          >
            ← Back to home
          </Link>
        </p>
      </article>
    </main>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-[#0F172A]">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-[#2563EB] no-underline transition-colors hover:text-[#1D4ED8]"
    >
      {children}
    </a>
  );
}
