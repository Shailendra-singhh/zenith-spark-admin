import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ActivityDay {
  date: Date;
  count: number;
}

interface ActivityHeatmapProps {
  data: ActivityDay[];
  className?: string;
}

export function ActivityHeatmap({ data, className }: ActivityHeatmapProps) {
  // Generate last 12 weeks of data
  const weeks = 12;
  const days = 7;
  
  const getIntensity = (count: number): string => {
    if (count === 0) return "bg-muted";
    if (count < 3) return "bg-primary/20";
    if (count < 6) return "bg-primary/40";
    if (count < 10) return "bg-primary/60";
    return "bg-primary glow-primary";
  };

  // Create a map for quick lookup
  const activityMap = new Map(
    data.map(d => [d.date.toISOString().split('T')[0], d.count])
  );

  // Generate dates for the grid
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - (weeks * days) + 1);

  const grid: { date: Date; count: number }[][] = [];
  let currentDate = new Date(startDate);

  for (let week = 0; week < weeks; week++) {
    const weekData: { date: Date; count: number }[] = [];
    for (let day = 0; day < days; day++) {
      const dateStr = currentDate.toISOString().split('T')[0];
      weekData.push({
        date: new Date(currentDate),
        count: activityMap.get(dateStr) || 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    grid.push(weekData);
  }

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 text-[10px] text-muted-foreground pr-2">
          {dayLabels.map((label, i) => (
            <div key={i} className="h-3 flex items-center justify-end">
              {i % 2 === 1 && label}
            </div>
          ))}
        </div>
        
        <div className="flex gap-1">
          {grid.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <Tooltip key={dayIndex}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer",
                        getIntensity(day.count)
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    <p className="font-medium">{day.count} activities</p>
                    <p className="text-muted-foreground">
                      {day.date.toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-muted" />
        <div className="w-3 h-3 rounded-sm bg-primary/20" />
        <div className="w-3 h-3 rounded-sm bg-primary/40" />
        <div className="w-3 h-3 rounded-sm bg-primary/60" />
        <div className="w-3 h-3 rounded-sm bg-primary" />
        <span>More</span>
      </div>
    </div>
  );
}
