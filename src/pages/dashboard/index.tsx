import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectList from "@/components/projects/ProjectList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  ShieldCheck,
  ArrowUpRight,
  Plus,
  Settings,
  Key,
} from "lucide-react";

interface DashboardProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
}

const Dashboard = ({
  userName = "John Doe",
  userEmail = "john.doe@example.com",
  userAvatar = "",
  notificationCount = 3,
}: DashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  // Stats data for the dashboard
  const stats = [
    {
      name: "Total Users",
      value: "24,532",
      change: "+12% from last month",
      trend: "up",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "Active Projects",
      value: "8",
      change: "+2 new this month",
      trend: "up",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
    },
    {
      name: "Authentication Rate",
      value: "99.2%",
      change: "+0.5% from last month",
      trend: "up",
      icon: <Key className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "API Requests",
      value: "1.2M",
      change: "+18% from last month",
      trend: "up",
      icon: <BarChart3 className="h-5 w-5 text-amber-500" />,
    },
  ];

  // Quick actions for the dashboard
  const quickActions = [
    {
      name: "Create Project",
      icon: <Plus className="h-5 w-5" />,
      onClick: () => console.log("Create project clicked"),
    },
    {
      name: "View Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      onClick: () => navigate("/dashboard/analytics"),
    },
    {
      name: "Manage Users",
      icon: <Users className="h-5 w-5" />,
      onClick: () => navigate("/dashboard/users"),
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      onClick: () => navigate("/dashboard/settings"),
    },
  ];

  const handleCreateProject = () => {
    console.log("Create new project");
    // In a real app, this would open a modal or navigate to a create project page
  };

  const handleSelectProject = (projectId: string) => {
    navigate(`/dashboard/project/${projectId}`);
  };

  return (
    <DashboardLayout
      userName={userName}
      userEmail={userEmail}
      userAvatar={userAvatar}
      notificationCount={notificationCount}
    >
      <div className="space-y-6 bg-background dark:bg-gray-900 p-6 rounded-lg">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground dark:text-white">
              Welcome back, {userName.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground dark:text-gray-400 mt-1">
              Here's what's happening with your authentication projects
            </p>
          </div>

          <div className="flex gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                onClick={action.onClick}
                className="flex items-center gap-2"
              >
                {action.icon}
                {action.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-card dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                        {stat.name}
                      </p>
                      <h3 className="text-2xl font-bold mt-1 text-foreground dark:text-white">
                        {stat.value}
                      </h3>
                      <p
                        className={`text-xs mt-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {stat.change}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-gray-700 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-card dark:bg-gray-800">
          <CardHeader className="pb-2">
            <Tabs
              defaultValue="projects"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="m-0">
                <ProjectList
                  onCreateProject={handleCreateProject}
                  onSelectProject={handleSelectProject}
                />
              </TabsContent>
              <TabsContent value="recent" className="m-0 p-6">
                <div className="h-[400px] flex items-center justify-center bg-muted dark:bg-gray-800/50 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground dark:text-white mb-2">
                      Recent Activity
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 max-w-md">
                      View your recent authentication activity across all
                      projects. This section will show login attempts, user
                      registrations, and other events.
                    </p>
                    <Button className="mt-4">
                      View Activity Log
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="m-0 p-6">
                <div className="h-[400px] flex items-center justify-center bg-muted dark:bg-gray-800/50 rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground dark:text-white mb-2">
                      Analytics Dashboard
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 max-w-md">
                      Get insights into your authentication platform usage, user
                      behavior, and performance metrics across all your
                      projects.
                    </p>
                    <Button className="mt-4">
                      View Full Analytics
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
