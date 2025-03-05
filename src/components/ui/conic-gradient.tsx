import React from "react";
import { cn } from "@/lib/utils";

interface ConicGradientProps {
  children?: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export function ConicGradient({
  children,
  className,
  from = "from-primary",
  via = "via-purple-500",
  to = "to-primary",
  animate = true,
}: ConicGradientProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-conic",
          from,
          via,
          to,
          animate && "animate-conic",
        )}
      />
      {children}
    </div>
  );
}
