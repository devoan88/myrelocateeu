"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.classList.toggle("light", theme === "light");
}

function resolveTheme(): "light" | "dark" {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const resolved = resolveTheme();
    setTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-surface hover:text-foreground",
        className
      )}
      aria-label={mounted && theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mounted && theme === "dark" ? (
        <Sun className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
