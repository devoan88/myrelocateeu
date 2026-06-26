import { cn } from "@/lib/utils";

export type VerifiedBadgeProps = {
  /** ISO date string or Date — shown as "Verified May 2026" */
  date: string | Date;
  className?: string;
};

function formatVerifiedMonth(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function VerifiedBadge({ date, className }: VerifiedBadgeProps) {
  const label = formatVerifiedMonth(date);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-sans font-medium",
        className
      )}
      style={{
        fontSize: "11px",
        borderRadius: "6px",
        padding: "2px 8px",
        backgroundColor: "hsl(var(--green-bg))",
        color: "hsl(var(--green))",
      }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "hsl(var(--green))",
        }}
        aria-hidden
      />
      Verified {label}
    </span>
  );
}

export default VerifiedBadge;
