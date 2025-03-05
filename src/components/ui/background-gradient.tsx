import { cn } from "@/lib/utils";

interface BackgroundGradientProps {
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "purple" | "blue" | "green" | "cyan";
  animate?: boolean;
}

export function BackgroundGradient({
  className,
  children,
  variant = "default",
  animate = true,
}: BackgroundGradientProps) {
  const variants = {
    default: "from-primary/20 via-primary/10 to-background",
    purple: "from-purple-500/20 via-purple-500/10 to-background",
    blue: "from-blue-500/20 via-blue-500/10 to-background",
    green: "from-green-500/20 via-green-500/10 to-background",
    cyan: "from-cyan-500/20 via-cyan-500/10 to-background",
  };

  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden bg-background",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-96 w-full bg-gradient-to-b",
          variants[variant],
          animate && "animate-pulse duration-5000",
        )}
      />
      {children}
    </div>
  );
}

export function BackgroundPattern({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <svg
        className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-800 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg
          x="50%"
          y="-1"
          className="overflow-visible fill-gray-50 dark:fill-gray-900/20"
        >
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
        />
      </svg>
      {children}
    </div>
  );
}

export function BackgroundBlobs({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute -top-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
      <div className="absolute -bottom-40 -left-20 h-[30rem] w-[30rem] rounded-full bg-primary/20 blur-3xl dark:bg-primary/10" />
      {children}
    </div>
  );
}
