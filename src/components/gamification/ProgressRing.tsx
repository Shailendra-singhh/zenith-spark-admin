import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  className?: string;
  variant?: "primary" | "accent" | "success" | "warning" | "destructive";
}

export function ProgressRing({
  value,
  max,
  size = 80,
  strokeWidth = 6,
  label,
  sublabel,
  className,
  variant = "primary",
}: ProgressRingProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const variantClasses = {
    primary: "stroke-primary",
    accent: "stroke-accent",
    success: "stroke-success",
    warning: "stroke-warning",
    destructive: "stroke-destructive",
  };

  const glowClasses = {
    primary: "drop-shadow(0 0 4px hsl(var(--primary) / 0.5))",
    accent: "drop-shadow(0 0 4px hsl(var(--accent) / 0.5))",
    success: "drop-shadow(0 0 4px hsl(var(--success) / 0.5))",
    warning: "drop-shadow(0 0 4px hsl(var(--warning) / 0.5))",
    destructive: "drop-shadow(0 0 4px hsl(var(--destructive) / 0.5))",
  };

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg
        width={size}
        height={size}
        className="-rotate-90"
        style={{ filter: percentage > 0 ? glowClasses[variant] : undefined }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className="stroke-muted"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          className={cn(
            "transition-all duration-700 ease-out",
            variantClasses[variant]
          )}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && (
          <span className="text-lg font-bold tabular-nums text-foreground">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="text-[10px] text-muted-foreground uppercase tracking-wide">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
