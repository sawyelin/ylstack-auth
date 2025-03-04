import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Home,
  Users,
  Settings,
  BarChart2,
  Key,
  Mail,
  Shield,
  PanelLeft,
  ChevronRight,
  LogOut,
  Plus,
  ArrowLeft,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
}

const Sidebar = ({
  collapsed = false,
  onToggle = () => {},
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = "",
}: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Mock projects data
  const projects = [
    { id: "1", name: "Main Website" },
    { id: "2", name: "Mobile App" },
    { id: "3", name: "E-commerce Platform" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isProjectActive = (id: string) => {
    return location.pathname.includes(`/dashboard/project/${id}`);
  };

  const toggleProject = (id: string) => {
    setActiveProject(activeProject === id ? null : id);
  };

  const handleSelectProject = (id: string) => {
    setActiveProject(activeProject === id ? null : id);
    navigate(`/dashboard/project/${id}`);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-card dark:bg-gray-900 border-r border-border dark:border-gray-800 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
      )}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between">
        <div
          className={cn(
            "flex items-center",
            collapsed && "justify-center w-full",
          )}
        >
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="ml-2 font-semibold text-lg">AuthPlatform</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={collapsed ? "hidden" : ""}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 overflow-auto">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <TooltipProvider delayDuration={0}>
              {/* Dashboard Link */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard">
                    <Button
                      variant={isActive("/dashboard") ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <Home className="h-5 w-5 mr-2" />
                      {!collapsed && <span>Dashboard</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">Dashboard</TooltipContent>
                )}
              </Tooltip>

              {/* Analytics Link */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard/analytics">
                    <Button
                      variant={
                        isActive("/dashboard/analytics") ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <BarChart2 className="h-5 w-5 mr-2" />
                      {!collapsed && <span>Analytics</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">Analytics</TooltipContent>
                )}
              </Tooltip>

              {/* Users Link */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard/users">
                    <Button
                      variant={
                        isActive("/dashboard/users") ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <Users className="h-5 w-5 mr-2" />
                      {!collapsed && <span>Users</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">Users</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>

          <Separator className="my-4" />

          {/* Projects Section */}
          <div className="space-y-1">
            <div
              className={cn(
                "flex items-center justify-between mb-2",
                collapsed && "justify-center",
              )}
            >
              {!collapsed && <h3 className="text-sm font-medium">Projects</h3>}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => navigate("/dashboard/project/new")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Add Project</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <TooltipProvider delayDuration={0}>
              {projects.map((project) => (
                <div key={project.id} className="space-y-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        onClick={() => handleSelectProject(project.id)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer",
                          isProjectActive(project.id)
                            ? "bg-secondary"
                            : "hover:bg-secondary/50",
                          collapsed && "justify-center px-2",
                        )}
                      >
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                          {!collapsed && (
                            <span className="text-sm">{project.name}</span>
                          )}
                        </div>
                        {!collapsed && (
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-transform",
                              activeProject === project.id &&
                                "transform rotate-90",
                            )}
                          />
                        )}
                      </div>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right">
                        {project.name}
                      </TooltipContent>
                    )}
                  </Tooltip>

                  {!collapsed && activeProject === project.id && (
                    <div className="pl-6 space-y-1">
                      <Link to={`/dashboard/project/${project.id}`}>
                        <Button
                          variant={
                            isActive(`/dashboard/project/${project.id}`)
                              ? "secondary"
                              : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start text-sm"
                        >
                          Overview
                        </Button>
                      </Link>
                      <Link to={`/dashboard/project/${project.id}/users`}>
                        <Button
                          variant={
                            isActive(`/dashboard/project/${project.id}/users`)
                              ? "secondary"
                              : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start text-sm"
                        >
                          Users
                        </Button>
                      </Link>
                      <Link to={`/dashboard/project/${project.id}/settings`}>
                        <Button
                          variant={
                            isActive(
                              `/dashboard/project/${project.id}/settings`,
                            )
                              ? "secondary"
                              : "ghost"
                          }
                          size="sm"
                          className="w-full justify-start text-sm"
                        >
                          Settings
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </TooltipProvider>
          </div>

          <Separator className="my-4" />

          {/* Settings Section */}
          <div className="space-y-1">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard/settings">
                    <Button
                      variant={
                        isActive("/dashboard/settings") ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <Settings className="h-5 w-5 mr-2" />
                      {!collapsed && <span>Settings</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">Settings</TooltipContent>
                )}
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard/api-keys">
                    <Button
                      variant={
                        isActive("/dashboard/api-keys") ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <Key className="h-5 w-5 mr-2" />
                      {!collapsed && <span>API Keys</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">API Keys</TooltipContent>
                )}
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/dashboard/email-templates">
                    <Button
                      variant={
                        isActive("/dashboard/email-templates")
                          ? "secondary"
                          : "ghost"
                      }
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center px-2",
                      )}
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      {!collapsed && <span>Email Templates</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">Email Templates</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </ScrollArea>

      {/* User Profile Section */}
      <div className="border-t p-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center",
                  collapsed ? "justify-center" : "justify-between",
                )}
              >
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={
                        userAvatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`
                      }
                    />
                    <AvatarFallback>
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {!collapsed && (
                    <div className="ml-2">
                      <p className="text-sm font-medium">{userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  )}
                </div>
                {!collapsed && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/")}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="flex flex-col gap-1">
                <p className="font-medium">{userName}</p>
                <p className="text-xs">{userEmail}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
