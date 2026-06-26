import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

const variants = {
  blue: "bg-blue/10 text-blue border-blue/20",
  green: "bg-success/10 text-success border-success/20",
  gold: "bg-gold/15 text-warning border-gold/30",
  gray: "bg-ice text-text-mid border-border",
} as const;

type BadgeVariant = keyof typeof variants;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export default function Badge({
  variant = "gray",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
