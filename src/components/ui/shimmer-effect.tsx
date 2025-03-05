import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerEffectProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerEffect({ children, className }: ShimmerEffectProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ShimmerButton({ children, className }: ShimmerEffectProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
}
