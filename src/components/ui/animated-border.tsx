import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  duration?: number;
  borderGradient?: string;
  pathLength?: number;
  animate?: boolean;
}

export function AnimatedBorder({
  children,
  className,
  containerClassName,
  duration = 8,
  borderGradient = "from-primary via-purple-500 to-blue-500",
  pathLength = 120,
  animate = true,
}: AnimatedBorderProps) {
  return (
    <div
      className={cn(
        "relative p-[1px] overflow-hidden rounded-lg",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden rounded-lg",
          animate && "[mask-image:linear-gradient(white,transparent)]",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 flex h-full",
            animate && "animate-spin-slow",
            `bg-gradient-to-r ${borderGradient}`,
          )}
          style={{ animationDuration: `${duration}s` }}
        />
      </div>
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center rounded-lg bg-background dark:bg-gray-900",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  pathLength = 120,
  animate = true,
}: AnimatedBorderProps) {
  return (
    <div className={cn("relative group", containerClassName)}>
      <div
        className={cn(
          "absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary via-purple-500 to-blue-500 opacity-75 blur-sm transition duration-1000",
          animate && "group-hover:opacity-100 group-hover:blur",
        )}
      />
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg bg-background dark:bg-gray-900",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function AnimatedPathBorder({
  children,
  className,
  containerClassName,
  pathLength = 120,
  animate = true,
}: AnimatedBorderProps) {
  return (
    <div className={cn("relative", containerClassName)}>
      <div className="absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            width="100%"
            height="100%"
            rx="16"
            ry="16"
            className="fill-none stroke-primary dark:stroke-primary/70"
            strokeWidth="1"
            strokeDasharray={pathLength}
            strokeDashoffset={animate ? pathLength : 0}
            style={{
              animation: animate
                ? `dash 4s linear forwards ${Math.random() * 2}s infinite`
                : "none",
            }}
          />
        </svg>
      </div>
      <div className={cn("relative rounded-lg", className)}>{children}</div>
    </div>
  );
}
