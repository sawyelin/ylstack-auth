import React from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Settings, ChevronDown, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  breadcrumbs?: Array<{ label: string; path: string }>;
  projectName?: string;
  notificationCount?: number;
  userAvatar?: string;
  userName?: string;
  userEmail?: string;
}

const DashboardHeader = ({
  breadcrumbs = [{ label: "Dashboard", path: "/dashboard" }],
  projectName = "My Project",
  notificationCount = 3,
  userAvatar = "",
  userName = "John Doe",
  userEmail = "john.doe@example.com",
}: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-1 text-sm">
          <Link
            to="/dashboard"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <Home className="mr-1 h-4 w-4" />
          </Link>

          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span className="text-muted-foreground">/</span>
              <Link
                to={crumb.path}
                className={`hover:text-foreground ${index === breadcrumbs.length - 1 ? "font-medium text-foreground" : "text-muted-foreground"}`}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}

          {projectName && (
            <>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium text-foreground">{projectName}</span>
            </>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-[200px] lg:w-[300px] pl-8"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">
                {userName}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Account settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
