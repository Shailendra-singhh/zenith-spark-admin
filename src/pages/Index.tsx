import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TeamMembers } from "@/components/dashboard/TeamMembers";
import { SecurityOverview } from "@/components/dashboard/SecurityOverview";
import { GamificationPanel } from "@/components/dashboard/GamificationPanel";
import { Users, Shield, Key, Activity } from "lucide-react";

const Index = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, Alex. Here's what's happening today.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value="2,847"
            change={12.5}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Active Roles"
            value="24"
            change={4.2}
            icon={Shield}
            variant="accent"
          />
          <StatCard
            title="API Calls Today"
            value="48.2K"
            change={-2.4}
            icon={Key}
            variant="success"
          />
          <StatCard
            title="System Health"
            value="99.9%"
            change={0.1}
            icon={Activity}
            variant="warning"
          />
        </div>

        {/* Gamification Section */}
        <GamificationPanel />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Activity & Actions */}
          <div className="lg:col-span-2 space-y-6">
            <QuickActions />
            <RecentActivity />
          </div>

          {/* Right Column - Team & Security */}
          <div className="space-y-6">
            <SecurityOverview />
            <TeamMembers />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;
