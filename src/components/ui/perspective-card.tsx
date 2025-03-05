import React from "react";
import { cn } from "@/lib/utils";

interface PerspectiveCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  depth?: number;
  hoverEffect?: boolean;
}

export function PerspectiveCard({
  children,
  className,
  contentClassName,
  depth = 20,
  hoverEffect = true,
}: PerspectiveCardProps) {
  return (
    <div
      className={cn(
        "perspective-1000 transform-style-3d backface-hidden transition-all duration-500 ease-out-expo",
        hoverEffect && "hover:rotate-y-15 hover:rotate-x-15",
        className,
      )}
    >
      <div
        className={cn("transform-style-3d backface-hidden", contentClassName)}
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, {
              style: {
                ...((child as React.ReactElement).props.style || {}),
                transform: `translateZ(${depth}px)`,
              },
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
