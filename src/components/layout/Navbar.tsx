"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  COUNTRIES,
  NAV_COUNTRY_GROUPS,
} from "@/data/countries";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Guides" },
  { href: "/stories", label: "Stories" },
] as const;

const TOOLS_MENU_LINKS = [
  { href: "/tools/schengen-calculator", label: "Schengen calculator" },
  { href: "/tools/visa-calculator", label: "Visa calculator" },
  { href: "/tools/cost-simulator", label: "Cost simulator" },
  { href: "/tools/document-checker", label: "Document checker" },
  { href: "/tools/buddy-matching", label: "Expat Buddy" },
] as const;

const countryBySlug = Object.fromEntries(
  COUNTRIES.map((country) => [country.slug, country])
);

function Logo({
  onClick,
  light = false,
}: {
  onClick?: () => void;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="inline-flex shrink-0 items-baseline font-sans text-[20px] font-medium leading-none"
    >
      <span className={light ? "text-white" : "text-[#0F172A]"}>Relocate</span>
      <span className={light ? "text-[#93C5FD]" : "text-[#2563EB]"}>EU</span>
    </Link>
  );
}

function isToolsActive(pathname: string): boolean {
  return pathname.startsWith("/tools");
}

function isLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/stories") return pathname === "/stories";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isCountriesActive(pathname: string): boolean {
  return pathname === "/" || pathname.startsWith("/countries");
}

function NavLink({
  href,
  label,
  active,
  onClick,
  className,
  light = false,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "font-sans text-sm transition-colors duration-150",
        light
          ? "text-white/90 hover:text-white"
          : "text-[#475569] hover:text-[#0F172A]",
        active && (light ? "font-medium text-white" : "font-medium text-[#0F172A]"),
        className
      )}
    >
      {label}
    </Link>
  );
}

function CountriesMenu({
  active,
  onNavigate,
  className,
  light = false,
}: {
  active: boolean;
  onNavigate?: () => void;
  className?: string;
  light?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 font-sans text-sm transition-colors duration-150",
          light
            ? "text-white/90 hover:text-white"
            : "text-[#475569] hover:text-[#0F172A]",
          active && (light ? "font-medium text-white" : "font-medium text-[#0F172A]")
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        Countries
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[320px] -translate-x-1/2 rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-relocate">
          {NAV_COUNTRY_GROUPS.map((group) => (
            <div key={group.id} className="not-first:mt-4">
              <p className="px-2 font-sans text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">
                {group.label}
              </p>
              <ul className="mt-2 space-y-1">
                {group.slugs.map((slug) => {
                  const country = countryBySlug[slug];
                  if (!country) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/countries/${slug}`}
                        className="flex items-center gap-2 rounded-lg px-2 py-2 font-sans text-sm text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
                        onClick={() => {
                          setOpen(false);
                          onNavigate?.();
                        }}
                      >
                        <span aria-hidden>{country.flag}</span>
                        <span>{country.name}</span>
                        {country.isPremiumDestination && (
                          <span className="ml-auto rounded-full bg-[#FFFBEB] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#92400E]">
                            Premium
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="mt-4 border-t border-[#E2E8F0] pt-3">
            <Link
              href="/#countries"
              className="block rounded-lg px-2 py-2 font-sans text-sm text-[#2563EB] hover:bg-[#F8FAFC]"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            >
              View all countries →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function ToolsMenu({
  active,
  onNavigate,
  className,
  light = false,
}: {
  active: boolean;
  onNavigate?: () => void;
  className?: string;
  light?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 font-sans text-sm transition-colors duration-150",
          light
            ? "text-white/90 hover:text-white"
            : "text-[#475569] hover:text-[#0F172A]",
          active && (light ? "font-medium text-white" : "font-medium text-[#0F172A]")
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        Tools
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 mt-3 w-[240px] -translate-x-1/2 rounded-xl border border-[#E2E8F0] bg-white p-2 shadow-relocate">
          <ul className="space-y-1">
            {TOOLS_MENU_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2 font-sans text-sm text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;
  const countriesActive = isCountriesActive(pathname);
  const toolsActive = isToolsActive(pathname);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "top-0 z-50 w-full transition-all duration-200",
          isHome ? "fixed" : "sticky",
          transparent
            ? "border-b border-transparent bg-transparent"
            : "border-b border-[#E2E8F0] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
        )}
      >
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-6">
          <Logo light={transparent} />

          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex"
            aria-label="Main"
          >
            {NAV_LINKS.slice(0, 1).map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                active={isLinkActive(pathname, link.href)}
                light={transparent}
              />
            ))}
            <CountriesMenu active={countriesActive} light={transparent} />
            <ToolsMenu active={toolsActive} light={transparent} />
            {NAV_LINKS.slice(1).map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                label={link.label}
                active={isLinkActive(pathname, link.href)}
                light={transparent}
              />
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/auth/login"
              className={cn(
                "font-sans text-sm transition-colors duration-150",
                transparent
                  ? "text-white/90 hover:text-white"
                  : "text-[#475569] hover:text-[#0F172A]"
              )}
            >
              Sign in
            </Link>
            <Link
              href="/"
              className="rounded-lg bg-[#2563EB] px-4 py-2 font-sans text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8]"
            >
              Get started
            </Link>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X
                className={cn("h-5 w-5", transparent ? "text-white" : "text-[#475569]")}
                strokeWidth={1.75}
                aria-hidden
              />
            ) : (
              <Menu
                className={cn("h-5 w-5", transparent ? "text-white" : "text-[#475569]")}
                strokeWidth={1.75}
                aria-hidden
              />
            )}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[60] bg-black/40 transition-opacity duration-200 md:hidden",
          menuOpen
            ? "opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        id="mobile-nav-drawer"
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-[320px] flex-col border-l border-[#E2E8F0] bg-white transition-transform duration-300 ease-out md:hidden",
          menuOpen
            ? "translate-x-0"
            : "pointer-events-none invisible translate-x-full"
        )}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#E2E8F0] px-6">
          <Logo onClick={() => setMenuOpen(false)} />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <X className="h-5 w-5 text-[#475569]" strokeWidth={1.75} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-4 py-2" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              href={link.href}
              label={link.label}
              active={isLinkActive(pathname, link.href)}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center px-2"
            />
          ))}

          <div className="px-2 py-3">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Countries
            </p>
            {NAV_COUNTRY_GROUPS.map((group) => (
              <div key={group.id} className="mt-3">
                <p className="px-2 font-sans text-[11px] font-medium text-[#94A3B8]">
                  {group.label}
                </p>
                <ul className="mt-1">
                  {group.slugs.map((slug) => {
                    const country = countryBySlug[slug];
                    if (!country) return null;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/countries/${slug}`}
                          onClick={() => setMenuOpen(false)}
                          className="flex min-h-10 items-center gap-2 px-2 font-sans text-sm text-[#0F172A]"
                        >
                          <span aria-hidden>{country.flag}</span>
                          {country.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <Link
              href="/#countries"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex min-h-10 items-center px-2 font-sans text-sm text-[#2563EB]"
            >
              View all countries →
            </Link>
          </div>

          <div className="px-2 py-3">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#94A3B8]">
              Tools
            </p>
            <ul className="mt-1">
              {TOOLS_MENU_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-10 items-center px-2 font-sans text-sm text-[#0F172A]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <NavLink
            href="/auth/login"
            label="Sign in"
            active={pathname === "/auth/login" || pathname === "/sign-in"}
            onClick={() => setMenuOpen(false)}
            className="flex min-h-12 items-center px-2"
          />
        </nav>

        <div className="shrink-0 border-t border-[#E2E8F0] p-4">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex min-h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] font-sans text-sm font-medium text-white transition-colors duration-150 hover:bg-[#1D4ED8]"
          >
            Get started
          </Link>
        </div>
      </aside>
    </>
  );
}
