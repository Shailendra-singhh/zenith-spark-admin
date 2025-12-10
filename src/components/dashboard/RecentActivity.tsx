import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  Shield,
  Key,
  Trash2,
  Edit,
  LogIn,
  AlertTriangle,
} from "lucide-react";

interface Activity {
  id: number;
  type: "user_created" | "role_updated" | "api_key_generated" | "user_deleted" | "permission_changed" | "login" | "security_alert";
  message: string;
  user: string;
  time: string;
  metadata?: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "security_alert",
    message: "Unusual login detected from new IP",
    user: "System",
    time: "2 min ago",
    metadata: "192.168.1.100",
  },
  {
    id: 2,
    type: "user_created",
    message: "New user invitation sent",
    user: "Alex Johnson",
    time: "15 min ago",
    metadata: "john.doe@example.com",
  },
  {
    id: 3,
    type: "role_updated",
    message: "Role permissions updated",
    user: "Sarah Miller",
    time: "1 hour ago",
    metadata: "Editor Role",
  },
  {
    id: 4,
    type: "api_key_generated",
    message: "New API key generated",
    user: "Mike Chen",
    time: "2 hours ago",
    metadata: "Production API",
  },
  {
    id: 5,
    type: "login",
    message: "Successful login",
    user: "Emma Wilson",
    time: "3 hours ago",
  },
  {
    id: 6,
    type: "permission_changed",
    message: "User permissions modified",
    user: "Alex Johnson",
    time: "5 hours ago",
    metadata: "james@example.com",
  },
];

const typeConfig = {
  user_created: { icon: UserPlus, color: "text-success", bg: "bg-success/10" },
  role_updated: { icon: Shield, color: "text-primary", bg: "bg-primary/10" },
  api_key_generated: { icon: Key, color: "text-accent", bg: "bg-accent/10" },
  user_deleted: { icon: Trash2, color: "text-destructive", bg: "bg-destructive/10" },
  permission_changed: { icon: Edit, color: "text-warning", bg: "bg-warning/10" },
  login: { icon: LogIn, color: "text-muted-foreground", bg: "bg-muted" },
  security_alert: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
};

export function RecentActivity() {
  return (
    <Card variant="default">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Recent Activity</CardTitle>
          <Badge variant="secondary" className="text-xs">Live</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {activities.map((activity) => {
            const config = typeConfig[activity.type];
            const Icon = config.icon;
            
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className={cn("p-2 rounded-lg flex-shrink-0", config.bg)}>
                  <Icon className={cn("w-4 h-4", config.color)} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    {activity.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{activity.user}</span>
                    {activity.metadata && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground truncate">
                          {activity.metadata}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
