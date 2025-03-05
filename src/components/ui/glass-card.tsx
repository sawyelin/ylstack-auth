import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function GlassCard({
  children,
  className,
  blur = "lg",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-xl shadow-xl",
        `backdrop-blur-${blur}`,
        className,
      )}
    >
      {children}
    </div>
  );
}
