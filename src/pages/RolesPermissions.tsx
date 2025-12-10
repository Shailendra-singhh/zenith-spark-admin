import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  Lock,
  Eye,
  Pencil,
  XCircle,
  CheckCircle2,
  Copy,
  Settings,
  Database,
  FileText,
  CreditCard,
  Bell,
  Key,
  LayoutDashboard,
  ChevronRight,
  AlertTriangle,
  Info,
  History,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  userCount: number;
  isSystem: boolean;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

const permissionModules = [
  { id: "users", name: "Users", icon: Users, description: "Manage user accounts and profiles" },
  { id: "roles", name: "Roles & Permissions", icon: Shield, description: "Configure roles and access controls" },
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, description: "View dashboard and analytics" },
  { id: "content", name: "Content", icon: FileText, description: "Create and manage content" },
  { id: "billing", name: "Billing", icon: CreditCard, description: "Manage subscriptions and payments" },
  { id: "notifications", name: "Notifications", icon: Bell, description: "Configure notification settings" },
  { id: "api", name: "API & Webhooks", icon: Key, description: "Manage API keys and webhooks" },
  { id: "settings", name: "Settings", icon: Settings, description: "System configuration and preferences" },
  { id: "database", name: "Database", icon: Database, description: "Direct database access" },
];

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full system access with no restrictions",
    color: "bg-primary",
    userCount: 2,
    isSystem: true,
    createdAt: "Jan 1, 2024",
    updatedAt: "Dec 1, 2024",
    updatedBy: "System",
    permissions: permissionModules.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      module: m.id,
      actions: { create: true, read: true, update: true, delete: true },
    })),
  },
  {
    id: "2",
    name: "Admin",
    description: "Administrative access with some restrictions",
    color: "bg-destructive",
    userCount: 5,
    isSystem: true,
    createdAt: "Jan 1, 2024",
    updatedAt: "Nov 15, 2024",
    updatedBy: "Alex Johnson",
    permissions: permissionModules.map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      module: m.id,
      actions: {
        create: m.id !== "database",
        read: true,
        update: m.id !== "database",
        delete: m.id !== "database" && m.id !== "roles",
      },
    })),
  },
  {
    id: "3",
    name: "Manager",
    description: "Team management and content oversight",
    color: "bg-warning",
    userCount: 8,
    isSystem: false,
    createdAt: "Feb 10, 2024",
    updatedAt: "Oct 20, 2024",
    updatedBy: "Sarah Chen",
    permissions: permissionModules.slice(0, 5).map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      module: m.id,
      actions: {
        create: m.id === "content",
        read: true,
        update: m.id === "content" || m.id === "users",
        delete: false,
      },
    })),
  },
  {
    id: "4",
    name: "Editor",
    description: "Content creation and editing permissions",
    color: "bg-info",
    userCount: 12,
    isSystem: false,
    createdAt: "Mar 5, 2024",
    updatedAt: "Sep 8, 2024",
    updatedBy: "Mike Rodriguez",
    permissions: permissionModules.slice(0, 4).map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      module: m.id,
      actions: {
        create: m.id === "content",
        read: true,
        update: m.id === "content",
        delete: false,
      },
    })),
  },
  {
    id: "5",
    name: "Viewer",
    description: "Read-only access to permitted areas",
    color: "bg-muted-foreground",
    userCount: 24,
    isSystem: false,
    createdAt: "Jan 15, 2024",
    updatedAt: "Aug 1, 2024",
    updatedBy: "System",
    permissions: permissionModules.slice(0, 3).map((m) => ({
      id: m.id,
      name: m.name,
      description: m.description,
      module: m.id,
      actions: { create: false, read: true, update: false, delete: false },
    })),
  },
];

const PermissionBadge = ({ type, enabled }: { type: string; enabled: boolean }) => {
  const config = {
    create: { label: "C", color: "permission-create", icon: Plus },
    read: { label: "R", color: "permission-read", icon: Eye },
    update: { label: "U", color: "permission-update", icon: Pencil },
    delete: { label: "D", color: "permission-delete", icon: XCircle },
  }[type] || { label: type[0].toUpperCase(), color: "", icon: Eye };

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
        enabled
          ? config.color
          : "bg-muted/50 text-muted-foreground/50"
      )}
      title={`${type.charAt(0).toUpperCase() + type.slice(1)}: ${enabled ? "Enabled" : "Disabled"}`}
    >
      <Icon className="w-4 h-4" />
    </div>
  );
};

export default function RolesPermissions() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Roles & Permissions</h1>
            <p className="text-muted-foreground">
              Configure access control with fine-grained CRUD permissions
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with custom permissions for your organization.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input id="role-name" placeholder="e.g., Content Manager" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role-desc">Description</Label>
                  <Textarea
                    id="role-desc"
                    placeholder="Describe what this role can do..."
                    rows={3}
                  />
                </div>
                <div className="p-3 bg-info/10 border border-info/20 rounded-lg flex items-start gap-2">
                  <Info className="w-4 h-4 text-info mt-0.5" />
                  <p className="text-sm text-info">
                    After creating the role, you'll be able to configure detailed permissions.
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateOpen(false)}>
                  Create Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="roles" className="gap-2">
              <Shield className="w-4 h-4" />
              Roles
            </TabsTrigger>
            <TabsTrigger value="permissions" className="gap-2">
              <Lock className="w-4 h-4" />
              Permissions
            </TabsTrigger>
            <TabsTrigger value="matrix" className="gap-2">
              <Key className="w-4 h-4" />
              Matrix
            </TabsTrigger>
          </TabsList>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockRoles.map((role) => (
                <Card
                  key={role.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedRole?.id === role.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedRole(role)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", role.color)}>
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {role.name}
                            {role.isSystem && (
                              <Badge variant="secondary" className="text-[10px]">
                                System
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-xs mt-0.5">
                            {role.userCount} users
                          </CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon-sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {role.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 4).map((perm) => (
                        <Badge key={perm.id} variant="outline" className="text-[10px]">
                          {perm.name}
                        </Badge>
                      ))}
                      {role.permissions.length > 4 && (
                        <Badge variant="secondary" className="text-[10px]">
                          +{role.permissions.length - 4} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        Updated by {role.updatedBy}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {role.updatedAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Role Detail Panel */}
            {selectedRole && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selectedRole.color)}>
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {selectedRole.name}
                          {selectedRole.isSystem && (
                            <Badge variant="secondary">System Role</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{selectedRole.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </Button>
                      <Button variant="outline" size="sm">
                        <History className="w-4 h-4 mr-2" />
                        History
                      </Button>
                      {!selectedRole.isSystem && (
                        <>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-medium mb-4">Permission Modules</h4>
                  <Accordion type="multiple" className="space-y-2">
                    {permissionModules.map((module) => {
                      const ModuleIcon = module.icon;
                      const permission = selectedRole.permissions.find(
                        (p) => p.module === module.id
                      );
                      const hasAnyPermission =
                        permission &&
                        Object.values(permission.actions).some((v) => v);

                      return (
                        <AccordionItem
                          key={module.id}
                          value={module.id}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="py-3 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <div
                                className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center",
                                  hasAnyPermission
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                <ModuleIcon className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <p className="font-medium text-sm">{module.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {module.description}
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div className="flex items-center gap-4 pt-2">
                              <div className="flex items-center gap-2">
                                <PermissionBadge
                                  type="create"
                                  enabled={permission?.actions.create ?? false}
                                />
                                <span className="text-xs text-muted-foreground">Create</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <PermissionBadge
                                  type="read"
                                  enabled={permission?.actions.read ?? false}
                                />
                                <span className="text-xs text-muted-foreground">Read</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <PermissionBadge
                                  type="update"
                                  enabled={permission?.actions.update ?? false}
                                />
                                <span className="text-xs text-muted-foreground">Update</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <PermissionBadge
                                  type="delete"
                                  enabled={permission?.actions.delete ?? false}
                                />
                                <span className="text-xs text-muted-foreground">Delete</span>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Permission Modules</CardTitle>
                <CardDescription>
                  Configure which actions are available for each module
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissionModules.map((module) => {
                    const ModuleIcon = module.icon;
                    return (
                      <div
                        key={module.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-card-hover transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ModuleIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{module.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {module.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Switch id={`${module.id}-create`} />
                            <Label htmlFor={`${module.id}-create`} className="text-xs">
                              Create
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch id={`${module.id}-read`} defaultChecked />
                            <Label htmlFor={`${module.id}-read`} className="text-xs">
                              Read
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch id={`${module.id}-update`} />
                            <Label htmlFor={`${module.id}-update`} className="text-xs">
                              Update
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Switch id={`${module.id}-delete`} />
                            <Label htmlFor={`${module.id}-delete`} className="text-xs">
                              Delete
                            </Label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Matrix Tab */}
          <TabsContent value="matrix" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Access Control Matrix</CardTitle>
                <CardDescription>
                  Overview of all roles and their permissions across modules
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[200px]">Module</TableHead>
                      {mockRoles.map((role) => (
                        <TableHead key={role.id} className="text-center min-w-[120px]">
                          <div className="flex flex-col items-center gap-1">
                            <div className={cn("w-6 h-6 rounded flex items-center justify-center", role.color)}>
                              <Shield className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-xs font-medium">{role.name}</span>
                          </div>
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permissionModules.map((module) => {
                      const ModuleIcon = module.icon;
                      return (
                        <TableRow key={module.id} className="table-row-hover">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <ModuleIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium">{module.name}</span>
                            </div>
                          </TableCell>
                          {mockRoles.map((role) => {
                            const permission = role.permissions.find(
                              (p) => p.module === module.id
                            );
                            return (
                              <TableCell key={role.id} className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  <PermissionBadge
                                    type="create"
                                    enabled={permission?.actions.create ?? false}
                                  />
                                  <PermissionBadge
                                    type="read"
                                    enabled={permission?.actions.read ?? false}
                                  />
                                  <PermissionBadge
                                    type="update"
                                    enabled={permission?.actions.update ?? false}
                                  />
                                  <PermissionBadge
                                    type="delete"
                                    enabled={permission?.actions.delete ?? false}
                                  />
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-6">
                  <span className="text-sm font-medium">Legend:</span>
                  <div className="flex items-center gap-2">
                    <div className="permission-badge permission-create">
                      <Plus className="w-3 h-3" />
                    </div>
                    <span className="text-sm">Create</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="permission-badge permission-read">
                      <Eye className="w-3 h-3" />
                    </div>
                    <span className="text-sm">Read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="permission-badge permission-update">
                      <Pencil className="w-3 h-3" />
                    </div>
                    <span className="text-sm">Update</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="permission-badge permission-delete">
                      <XCircle className="w-3 h-3" />
                    </div>
                    <span className="text-sm">Delete</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
