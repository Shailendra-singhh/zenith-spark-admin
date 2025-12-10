import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Shield,
  Key,
  FileText,
  Settings,
  Bell,
} from "lucide-react";

const actions = [
  {
    icon: UserPlus,
    label: "Add User",
    description: "Invite new team member",
    variant: "primary" as const,
  },
  {
    icon: Shield,
    label: "New Role",
    description: "Create custom role",
    variant: "default" as const,
  },
  {
    icon: Key,
    label: "API Key",
    description: "Generate new key",
    variant: "default" as const,
  },
  {
    icon: FileText,
    label: "Audit Log",
    description: "View recent logs",
    variant: "default" as const,
  },
  {
    icon: Bell,
    label: "Alert Rule",
    description: "Set up notification",
    variant: "default" as const,
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Configure system",
    variant: "default" as const,
  },
];

export function QuickActions() {
  return (
    <Card variant="default">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant === "primary" ? "gradient" : "outline"}
              className="h-auto flex-col py-4 px-3 gap-2"
            >
              <action.icon className="w-5 h-5" />
              <div className="text-center">
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-[10px] opacity-70 font-normal">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
