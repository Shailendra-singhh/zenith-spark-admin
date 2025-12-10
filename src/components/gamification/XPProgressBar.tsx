import { cn } from "@/lib/utils";
import { brandConfig } from "@/lib/brand-config";

interface XPProgressBarProps {
  currentXP: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function XPProgressBar({ 
  currentXP, 
  className,
  showLabel = true,
  size = "md" 
}: XPProgressBarProps) {
  const levels = brandConfig.gamification.levels;
  
  // Find current level
  const currentLevelData = [...levels]
    .reverse()
    .find(l => currentXP >= l.xpRequired) || levels[0];
  
  const currentLevelIndex = levels.findIndex(l => l.level === currentLevelData.level);
  const nextLevel = levels[currentLevelIndex + 1];
  
  const xpInCurrentLevel = currentXP - currentLevelData.xpRequired;
  const xpNeededForNextLevel = nextLevel 
    ? nextLevel.xpRequired - currentLevelData.xpRequired 
    : 1000;
  const progress = nextLevel 
    ? (xpInCurrentLevel / xpNeededForNextLevel) * 100 
    : 100;

  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{currentLevelData.badge}</span>
            <div>
              <span className="text-sm font-medium text-foreground">
                Level {currentLevelData.level}
              </span>
              <span className="text-xs text-muted-foreground ml-1.5">
                {currentLevelData.name}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-primary">
              {currentXP.toLocaleString()} XP
            </span>
            {nextLevel && (
              <span className="text-xs text-muted-foreground ml-1">
                / {nextLevel.xpRequired.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className={cn("xp-bar", sizeClasses[size])}>
        <div 
          className="xp-bar-fill animate-progress-fill"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {showLabel && nextLevel && (
        <p className="text-xs text-muted-foreground mt-1.5">
          {(nextLevel.xpRequired - currentXP).toLocaleString()} XP to {nextLevel.name}
        </p>
      )}
    </div>
  );
}
