import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XPProgressBar } from "@/components/gamification/XPProgressBar";
import { AchievementBadge } from "@/components/gamification/AchievementBadge";
import { StreakIndicator } from "@/components/gamification/StreakIndicator";
import { WeeklyScore } from "@/components/gamification/WeeklyScore";
import { ActivityHeatmap } from "@/components/gamification/ActivityHeatmap";
import { brandConfig } from "@/lib/brand-config";
import { Trophy, Target, Flame } from "lucide-react";

// Generate mock activity data
const generateActivityData = () => {
  const data = [];
  const today = new Date();
  for (let i = 84; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date,
      count: Math.floor(Math.random() * 15),
    });
  }
  return data;
};

export function GamificationPanel() {
  const userXP = 847;
  const streak = 12;
  const weeklyScore = 78;
  const previousScore = 65;
  const activityData = generateActivityData();

  // Mock unlocked achievements
  const unlockedAchievements = ["first_login", "streak_7", "security_pro"];
  const achievements = brandConfig.gamification.achievements.map(a => ({
    ...a,
    unlockedAt: unlockedAchievements.includes(a.id) ? new Date() : undefined,
  }));

  return (
    <div className="space-y-6">
      {/* Main Progress Card */}
      <Card variant="gradient" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <CardHeader className="pb-2 relative">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <CardTitle className="text-base">Your Progress</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* XP Progress */}
            <div className="md:col-span-2">
              <XPProgressBar currentXP={userXP} />
            </div>
            
            {/* Streak */}
            <div className="flex justify-center">
              <StreakIndicator days={streak} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Score */}
        <Card variant="default">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle className="text-base">Productivity Score</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center py-4">
            <WeeklyScore
              score={weeklyScore}
              previousScore={previousScore}
            />
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Card variant="default">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" />
              <CardTitle className="text-base">Activity Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="py-4">
            <ActivityHeatmap data={activityData} />
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card variant="default">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-achievement-gold" />
              <CardTitle className="text-base">Achievements</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">
              {unlockedAchievements.length} / {achievements.length} unlocked
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {achievements.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                unlocked={unlockedAchievements.includes(achievement.id)}
                size="md"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
