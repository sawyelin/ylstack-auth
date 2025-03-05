import React, { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Home,
  Settings,
  Users,
  Shield,
  Bell,
  LogOut,
  ChevronRight,
  BarChart2,
  Key,
  HelpCircle,
  Menu,
} from "lucide-react";

interface Breadcrumb {
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  breadcrumbs?: Breadcrumb[];
  projectName?: string;
  notificationCount?: number;
}

const DashboardLayout = ({
  children,
  defaultCollapsed = false,
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "",
  breadcrumbs = [{ label: "Dashboard", path: "/dashboard" }],
  projectName,
  notificationCount = 0,
}: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(defaultCollapsed);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: "Projects",
      icon: <Shield className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      name: "Users",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/users",
    },
    {
      name: "Analytics",
      icon: <BarChart2 className="h-5 w-5" />,
      path: "/dashboard/analytics",
    },
    {
      name: "API Keys",
      icon: <Key className="h-5 w-5" />,
      path: "/dashboard/api-keys",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/dashboard/settings",
    },
    {
      name: "Help & Support",
      icon: <HelpCircle className="h-5 w-5" />,
      path: "/dashboard/support",
    },
  ];

  // Simple sidebar component for this file
  const SimpleSidebar = () => (
    <div
      className={`${sidebarCollapsed ? "w-16" : "w-64"} bg-card dark:bg-gray-900 border-r border-border dark:border-gray-800 flex flex-col transition-all duration-300`}
    >
      <div className="p-4 border-b border-border flex items-center justify-between dark:border-gray-800">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-xl text-foreground">
              AuthPlatform
            </span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center mx-auto">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className={sidebarCollapsed ? "mx-auto" : ""}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 py-6 px-2 space-y-1 overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={`w-full ${sidebarCollapsed ? "justify-center" : "justify-start"} ${window.location.pathname === item.path ? "bg-primary/10 dark:bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:bg-gray-800/50"}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
          </Button>
        ))}
      </div>

      <div className="p-4 border-t border-border dark:border-gray-800">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full ${sidebarCollapsed ? "justify-center" : "justify-start"}`}
            >
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={
                    userAvatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
                  }
                  alt={userName}
                />
                <AvatarFallback>
                  {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!sidebarCollapsed && (
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-foreground">
                    {userName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {userEmail}
                  </span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/")}>
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  // Simple header component for this file
  const SimpleHeader = () => (
    <header className="bg-card dark:bg-gray-900 border-b border-border dark:border-gray-800 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        {breadcrumbs.length > 0 && (
          <div className="flex items-center text-sm">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-foreground"
                  onClick={() => navigate(crumb.path)}
                >
                  {crumb.label}
                </Button>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {projectName && !breadcrumbs.length && (
          <h1 className="text-xl font-semibold text-foreground">
            {projectName}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => navigate("/dashboard/notifications")}
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
              {notificationCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 flex">
      {/* Sidebar */}
      <SimpleSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <SimpleHeader />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
