import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
}

export function AnimatedGradientText({
  children,
  className,
  from = "from-primary",
  via = "via-purple-500",
  to = "to-blue-500",
}: AnimatedGradientTextProps) {
  return (
    <span
      className={cn(
        "bg-clip-text text-transparent bg-gradient-to-r animate-gradient-x bg-300%",
        from,
        via,
        to,
        className,
      )}
    >
      {children}
    </span>
  );
}
