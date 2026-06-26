import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-blue-dark border border-transparent",
  secondary:
    "border border-border bg-background text-foreground hover:border-border-strong hover:bg-surface",
  ghost:
    "bg-transparent text-text-secondary hover:bg-surface hover:text-foreground border border-transparent",
  gold: "bg-amber text-white hover:opacity-90 border border-transparent",
} as const;

type ButtonVariant = keyof typeof variants;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({
  variant = "primary",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium shadow-relocate transition-all duration-hover ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
