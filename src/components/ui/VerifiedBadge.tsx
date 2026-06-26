import { cn } from "@/lib/cn";

export type VerifiedBadgeProps = {
  /** ISO date string or Date — shown as "Verified May 2026" */
  date: string | Date;
  className?: string;
};

function formatVerifiedMonth(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VerifiedBadge({ date, className }: VerifiedBadgeProps) {
  const label = `Verified ${formatVerifiedMonth(date)}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-verified-bg px-2.5 py-1 text-xs font-medium text-success",
        className
      )}
    >
      <CheckIcon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </span>
  );
}
