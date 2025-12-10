import { useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import { brandConfig } from "@/lib/brand-config";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XPProgressBar } from "@/components/gamification/XPProgressBar";
import {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  Settings,
  Bell,
  FileText,
  Activity,
  Webhook,
  Building2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  HelpCircle,
  Zap,
  Database,
  Lock,
  UserCog,
  FolderTree,
  History,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "success" | "warning";
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    href: "/users",
    icon: Users,
    badge: "24",
    children: [
      { title: "All Users", href: "/users", icon: Users },
      { title: "User Groups", href: "/users/groups", icon: FolderTree },
      { title: "Invitations", href: "/users/invitations", icon: UserCog, badge: "3", badgeVariant: "warning" },
    ],
  },
  {
    title: "Roles & Permissions",
    href: "/roles",
    icon: Shield,
    children: [
      { title: "Roles", href: "/roles", icon: Shield },
      { title: "Permissions", href: "/roles/permissions", icon: Lock },
      { title: "Access Matrix", href: "/roles/matrix", icon: Key },
    ],
  },
  {
    title: "Security",
    href: "/security",
    icon: Lock,
    badge: "!",
    badgeVariant: "destructive",
    children: [
      { title: "Audit Logs", href: "/security/audit", icon: FileText },
      { title: "Activity Monitor", href: "/security/activity", icon: Activity },
      { title: "Login History", href: "/security/history", icon: History },
    ],
  },
  {
    title: "API & Webhooks",
    href: "/api",
    icon: Key,
    children: [
      { title: "API Keys", href: "/api/keys", icon: Key },
      { title: "Webhooks", href: "/api/webhooks", icon: Webhook },
    ],
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    badge: "5",
    badgeVariant: "success",
  },
  {
    title: "Organizations",
    href: "/organizations",
    icon: Building2,
  },
  {
    title: "System",
    href: "/system",
    icon: Database,
    children: [
      { title: "Health", href: "/system/health", icon: Activity },
      { title: "Logs", href: "/system/logs", icon: FileText },
    ],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export function AppSidebar({ collapsed, onCollapse }: AppSidebarProps) {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const toggleGroup = (title: string) => {
    setExpandedGroups(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const isGroupActive = (item: NavItem) => {
    if (item.children) {
      return item.children.some(child => isActive(child.href));
    }
    return isActive(item.href);
  };

  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    xp: 847,
    avatar: null,
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[70px]" : "w-[280px]"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-sidebar-border",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-foreground">{brandConfig.shortName}</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {brandConfig.tagline}
              </p>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => onCollapse(!collapsed)}
          className={cn("hidden md:flex", collapsed && "absolute left-[70px] -translate-x-1/2 bg-sidebar border border-sidebar-border")}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-custom">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.title}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => !collapsed && toggleGroup(item.title)}
                    className={cn(
                      "flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      isGroupActive(item)
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <item.icon className={cn("w-5 h-5 flex-shrink-0", isGroupActive(item) && "text-sidebar-primary")} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        {item.badge && (
                          <Badge variant={item.badgeVariant || "secondary"} className="text-[10px] px-1.5">
                            {item.badge}
                          </Badge>
                        )}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            expandedGroups.includes(item.title) && "rotate-180"
                          )}
                        />
                      </>
                    )}
                  </button>
                  
                  {!collapsed && expandedGroups.includes(item.title) && (
                    <ul className="mt-1 ml-4 pl-4 border-l border-sidebar-border space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            to={child.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200",
                              "text-sidebar-foreground hover:bg-sidebar-accent/50"
                            )}
                            activeClassName="bg-sidebar-primary/10 text-sidebar-primary font-medium"
                          >
                            <child.icon className="w-4 h-4" />
                            <span className="flex-1">{child.title}</span>
                            {child.badge && (
                              <Badge variant={child.badgeVariant || "secondary"} className="text-[10px] px-1.5">
                                {child.badge}
                              </Badge>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    "text-sidebar-foreground hover:bg-sidebar-accent/50",
                    collapsed && "justify-center px-0"
                  )}
                  activeClassName="sidebar-item-active"
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant={item.badgeVariant || "secondary"} className="text-[10px] px-1.5">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* XP Progress */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-sidebar-border">
          <XPProgressBar currentXP={user.xp} size="sm" />
        </div>
      )}

      {/* User Section */}
      <div className={cn(
        "p-3 border-t border-sidebar-border",
        collapsed && "flex justify-center"
      )}>
        {collapsed ? (
          <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
            {user.name.charAt(0)}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-medium text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon-sm">
                <HelpCircle className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon-sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
