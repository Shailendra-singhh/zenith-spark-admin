import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Achievement {
  id: string;
  name: string;
  description: string;
  xp: number;
  icon: string;
  unlockedAt?: Date;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked?: boolean;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
  className?: string;
}

export function AchievementBadge({ 
  achievement, 
  unlocked = false,
  size = "md",
  showTooltip = true,
  className 
}: AchievementBadgeProps) {
  const sizeClasses = {
    sm: "w-10 h-10 text-lg",
    md: "w-14 h-14 text-2xl",
    lg: "w-20 h-20 text-4xl",
  };

  const badge = (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl transition-all duration-300",
        sizeClasses[size],
        unlocked
          ? "bg-gradient-achievement shadow-glow-accent animate-badge-pop"
          : "bg-muted/50 grayscale opacity-50",
        className
      )}
    >
      <span className={cn(!unlocked && "opacity-40")}>{achievement.icon}</span>
      
      {unlocked && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );

  if (!showTooltip) return badge;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-[200px]">
        <div className="space-y-1">
          <p className="font-semibold">{achievement.name}</p>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
          <p className="text-xs text-primary font-medium">+{achievement.xp} XP</p>
          {unlocked && achievement.unlockedAt && (
            <p className="text-xs text-muted-foreground">
              Unlocked {achievement.unlockedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
