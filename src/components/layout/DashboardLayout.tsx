import React, { useState, ReactNode } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  breadcrumbs?: Array<{ label: string; path: string }>;
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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        userName={userName}
        userEmail={userEmail}
        userAvatar={userAvatar}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader
          breadcrumbs={breadcrumbs}
          projectName={projectName}
          notificationCount={notificationCount}
          userAvatar={userAvatar}
          userName={userName}
          userEmail={userEmail}
        />

        {/* Page Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto p-4 lg:p-6",
            "transition-all duration-300",
          )}
        >
          <div
            className={cn(
              "mx-auto w-full",
              sidebarCollapsed ? "max-w-[1500px]" : "max-w-[1400px]",
            )}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
