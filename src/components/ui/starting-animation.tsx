import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StartingAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
  initialOpacity?: number;
}

export function StartingAnimation({
  children,
  className,
  delay = 0,
  duration = 0.3,
  initialScale = 0.8,
  initialOpacity = 0,
}: StartingAnimationProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ scale: initialScale, opacity: initialOpacity }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
