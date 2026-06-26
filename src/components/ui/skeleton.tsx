import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#F1F5F9]", className)}
      {...props}
    />
  );
}
