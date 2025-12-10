// Brand Configuration - Change these values to rebrand the entire admin panel
export const brandConfig = {
  // App Identity
  name: "NexusAdmin",
  shortName: "Nexus",
  tagline: "Enterprise Command Center",
  description: "Next-generation admin panel for modern SaaS applications",
  
  // URLs
  logoUrl: "/logo.svg",
  faviconUrl: "/favicon.ico",
  supportUrl: "https://support.example.com",
  docsUrl: "https://docs.example.com",
  
  // Contact
  supportEmail: "support@nexusadmin.io",
  
  // Feature Flags
  features: {
    gamification: true,
    darkMode: true,
    multiTenant: true,
    auditLogs: true,
    apiKeys: true,
    webhooks: true,
    twoFactorAuth: true,
  },
  
  // Gamification Settings
  gamification: {
    xpPerAction: {
      login: 5,
      createRecord: 10,
      updateRecord: 5,
      deleteRecord: 3,
      inviteUser: 25,
      completeTask: 15,
      reviewAuditLog: 8,
    },
    levels: [
      { level: 1, name: "Newcomer", xpRequired: 0, badge: "🌱" },
      { level: 2, name: "Explorer", xpRequired: 100, badge: "🔍" },
      { level: 3, name: "Contributor", xpRequired: 300, badge: "⭐" },
      { level: 4, name: "Expert", xpRequired: 600, badge: "🏆" },
      { level: 5, name: "Master", xpRequired: 1000, badge: "👑" },
      { level: 6, name: "Legend", xpRequired: 2000, badge: "🌟" },
    ],
    achievements: [
      { id: "first_login", name: "First Steps", description: "Log in for the first time", xp: 10, icon: "🚀" },
      { id: "streak_7", name: "Week Warrior", description: "7-day login streak", xp: 50, icon: "🔥" },
      { id: "streak_30", name: "Monthly Master", description: "30-day login streak", xp: 200, icon: "⚡" },
      { id: "records_100", name: "Data Dynamo", description: "Create 100 records", xp: 100, icon: "📊" },
      { id: "team_5", name: "Team Builder", description: "Invite 5 team members", xp: 150, icon: "👥" },
      { id: "security_pro", name: "Security Pro", description: "Enable 2FA", xp: 75, icon: "🛡️" },
    ],
  },
  
  // Role Definitions
  roles: {
    superAdmin: {
      name: "Super Admin",
      description: "Full system access with all permissions",
      color: "destructive",
    },
    admin: {
      name: "Admin",
      description: "Administrative access with most permissions",
      color: "primary",
    },
    manager: {
      name: "Manager",
      description: "Team management and oversight capabilities",
      color: "accent",
    },
    editor: {
      name: "Editor",
      description: "Content creation and modification access",
      color: "success",
    },
    viewer: {
      name: "Viewer",
      description: "Read-only access to allowed resources",
      color: "muted",
    },
  },
};

export type BrandConfig = typeof brandConfig;
