import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/gamification/ProgressRing";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";

interface SecurityItem {
  id: number;
  title: string;
  status: "good" | "warning" | "critical";
  description: string;
}

const securityItems: SecurityItem[] = [
  { id: 1, title: "Two-Factor Authentication", status: "good", description: "85% of users enabled" },
  { id: 2, title: "Password Policy", status: "good", description: "All users compliant" },
  { id: 3, title: "Session Timeout", status: "warning", description: "Consider reducing to 30 min" },
  { id: 4, title: "API Key Rotation", status: "critical", description: "3 keys need rotation" },
  { id: 5, title: "IP Whitelist", status: "good", description: "Active for admin users" },
];

const statusConfig = {
  good: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  warning: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  critical: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
};

export function SecurityOverview() {
  const securityScore = 78;
  const goodCount = securityItems.filter(i => i.status === "good").length;
  const warningCount = securityItems.filter(i => i.status === "warning").length;
  const criticalCount = securityItems.filter(i => i.status === "critical").length;

  return (
    <Card variant="default">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">Security Overview</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="gap-1">
            Details
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 mb-6">
          <ProgressRing
            value={securityScore}
            max={100}
            size={100}
            strokeWidth={8}
            label={`${securityScore}%`}
            sublabel="Score"
            variant={securityScore >= 80 ? "success" : securityScore >= 60 ? "warning" : "destructive"}
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="w-3 h-3" />
                {goodCount} Secure
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="warning" className="gap-1">
                <Clock className="w-3 h-3" />
                {warningCount} Warning
              </Badge>
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="w-3 h-3" />
                {criticalCount} Critical
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {securityItems.map((item) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;
            
            return (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className={`p-1.5 rounded-md ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
