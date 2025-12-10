import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

interface StreakIndicatorProps {
  days: number;
  className?: string;
  showLabel?: boolean;
}

export function StreakIndicator({ 
  days, 
  className,
  showLabel = true 
}: StreakIndicatorProps) {
  const isActive = days > 0;
  const isHot = days >= 7;
  const isOnFire = days >= 30;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300",
        isOnFire 
          ? "bg-gradient-to-br from-orange-500 to-red-500 shadow-lg" 
          : isHot
            ? "bg-gradient-to-br from-orange-400 to-amber-500 shadow-md"
            : isActive
              ? "bg-accent/20"
              : "bg-muted"
      )}>
        <Flame 
          className={cn(
            "w-5 h-5 transition-all duration-300",
            isOnFire 
              ? "text-white streak-fire animate-pulse" 
              : isHot
                ? "text-white"
                : isActive
                  ? "text-accent"
                  : "text-muted-foreground"
          )} 
        />
        
        {isOnFire && (
          <div className="absolute inset-0 rounded-xl animate-ping bg-orange-500/30" />
        )}
      </div>
      
      {showLabel && (
        <div className="flex flex-col">
          <span className={cn(
            "text-lg font-bold tabular-nums",
            isOnFire ? "text-orange-500" : isHot ? "text-accent" : "text-foreground"
          )}>
            {days}
          </span>
          <span className="text-xs text-muted-foreground">
            day{days !== 1 ? "s" : ""} streak
          </span>
        </div>
      )}
    </div>
  );
}
