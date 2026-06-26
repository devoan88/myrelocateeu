import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement>;

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card card-hover border border-border bg-card p-6",
        className
      )}
      style={{ borderWidth: "0.5px" }}
      {...props}
    >
      {children}
    </div>
  );
}
