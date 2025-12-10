import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent" | "success" | "warning" | "destructive";
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = "vs last period",
  icon: Icon,
  variant = "default",
  className,
}: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  const iconVariants = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card variant="stat" className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold tabular-nums text-foreground animate-count-up">
              {value}
            </p>
            
            {change !== undefined && (
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded",
                    isPositive && "bg-success/10 text-success",
                    isNegative && "bg-destructive/10 text-destructive",
                    !isPositive && !isNegative && "bg-muted text-muted-foreground"
                  )}
                >
                  {isPositive && <TrendingUp className="w-3 h-3" />}
                  {isNegative && <TrendingDown className="w-3 h-3" />}
                  {isPositive && "+"}
                  {change}%
                </span>
                <span className="text-xs text-muted-foreground">{changeLabel}</span>
              </div>
            )}
          </div>
          
          <div className={cn("p-3 rounded-xl", iconVariants[variant])}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
      
      {/* Subtle gradient accent at bottom */}
      <div className={cn(
        "h-1 w-full",
        variant === "primary" && "bg-gradient-primary",
        variant === "accent" && "bg-gradient-accent",
        variant === "success" && "bg-success",
        variant === "warning" && "bg-warning",
        variant === "destructive" && "bg-destructive",
        variant === "default" && "bg-muted"
      )} />
    </Card>
  );
}
