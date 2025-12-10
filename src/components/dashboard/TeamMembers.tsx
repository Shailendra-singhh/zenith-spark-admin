import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Plus } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: "superAdmin" | "admin" | "manager" | "editor" | "viewer";
  status: "online" | "offline" | "away";
  lastActive?: string;
}

const members: TeamMember[] = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "superAdmin", status: "online" },
  { id: 2, name: "Sarah Miller", email: "sarah@example.com", role: "admin", status: "online" },
  { id: 3, name: "Mike Chen", email: "mike@example.com", role: "manager", status: "away" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "editor", status: "offline", lastActive: "2h ago" },
  { id: 5, name: "James Brown", email: "james@example.com", role: "viewer", status: "offline", lastActive: "1d ago" },
];

const roleLabels = {
  superAdmin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
  editor: "Editor",
  viewer: "Viewer",
};

export function TeamMembers() {
  return (
    <Card variant="default">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Team Members</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            Invite
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                  member.status === 'online' ? 'bg-success' :
                  member.status === 'away' ? 'bg-warning' : 'bg-muted-foreground'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {member.email}
                </p>
              </div>
              
              <Badge variant={member.role} className="hidden sm:flex">
                {roleLabels[member.role]}
              </Badge>
              
              <Button variant="ghost" size="icon-sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
