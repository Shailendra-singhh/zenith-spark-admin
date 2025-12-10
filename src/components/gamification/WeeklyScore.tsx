import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface WeeklyScoreProps {
  score: number;
  previousScore: number;
  maxScore?: number;
  className?: string;
}

export function WeeklyScore({ 
  score, 
  previousScore, 
  maxScore = 100,
  className 
}: WeeklyScoreProps) {
  const percentage = (score / maxScore) * 100;
  const change = score - previousScore;
  const changePercent = previousScore > 0 
    ? ((change / previousScore) * 100).toFixed(1) 
    : '0';

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getScoreColor = () => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-primary";
    if (percentage >= 40) return "text-warning";
    return "text-destructive";
  };

  const getStrokeColor = () => {
    if (percentage >= 80) return "stroke-success";
    if (percentage >= 60) return "stroke-primary";
    if (percentage >= 40) return "stroke-warning";
    return "stroke-destructive";
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-32 h-32">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className="stroke-muted"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            className={cn("transition-all duration-1000 ease-out", getStrokeColor())}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: percentage >= 80 ? 'drop-shadow(0 0 6px hsl(var(--success) / 0.5))' : undefined
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-3xl font-bold tabular-nums", getScoreColor())}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/ {maxScore}</span>
        </div>
      </div>
      
      {/* Trend indicator */}
      <div className={cn(
        "flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-sm font-medium",
        change > 0 
          ? "bg-success/10 text-success" 
          : change < 0 
            ? "bg-destructive/10 text-destructive"
            : "bg-muted text-muted-foreground"
      )}>
        {change > 0 ? (
          <TrendingUp className="w-4 h-4" />
        ) : change < 0 ? (
          <TrendingDown className="w-4 h-4" />
        ) : (
          <Minus className="w-4 h-4" />
        )}
        <span>{change > 0 ? '+' : ''}{changePercent}%</span>
      </div>
      
      <p className="text-xs text-muted-foreground mt-1">vs last week</p>
    </div>
  );
}
