import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActivityFeed from "./ActivityFeed";
import QuickActions from "./QuickActions";
import { BarChart3, Users, ShieldCheck, AlertTriangle } from "lucide-react";

interface ProjectOverviewProps {
  projectId?: string;
  projectName?: string;
  projectDescription?: string;
  stats?: Array<{
    name: string;
    value: string | number;
    change?: string;
    trend?: "up" | "down" | "neutral";
    icon?: React.ReactNode;
  }>;
}

const ProjectOverview = ({
  projectId = "proj-123",
  projectName = "Authentication Project",
  projectDescription = "Main authentication service for web and mobile applications",
  stats = [
    {
      name: "Total Users",
      value: "1,234",
      change: "+12% from last month",
      trend: "up",
      icon: <Users className="h-5 w-5 text-blue-500" />,
    },
    {
      name: "Active Users",
      value: "892",
      change: "+5% from last month",
      trend: "up",
      icon: <Users className="h-5 w-5 text-green-500" />,
    },
    {
      name: "Authentication Rate",
      value: "98.2%",
      change: "+0.5% from last month",
      trend: "up",
      icon: <ShieldCheck className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "Failed Logins",
      value: "24",
      change: "-8% from last month",
      trend: "down",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    },
  ],
}: ProjectOverviewProps) => {
  // Since StatsGrid component is not available, we'll implement the stats grid directly here
  const renderStatsGrid = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.name}
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p
                    className={`text-xs mt-1 ${
                      stat.trend === "up"
                        ? "text-green-500"
                        : stat.trend === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  {stat.icon || <BarChart3 className="h-6 w-6 text-gray-400" />}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{projectName}</h1>
        <p className="text-gray-500 mt-1">{projectDescription}</p>
      </div>

      <div className="space-y-6">
        {/* Stats Grid */}
        {renderStatsGrid()}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <ActivityFeed title="Recent Activity" />

          {/* Quick Actions */}
          <QuickActions title="Quick Actions" />
        </div>

        {/* Additional Sections */}
        <Card>
          <CardHeader>
            <CardTitle>Project Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="usage" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
              <TabsContent value="usage" className="p-4">
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">
                    Usage charts and metrics will be displayed here
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="performance" className="p-4">
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">
                    Performance metrics will be displayed here
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="security" className="p-4">
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">
                    Security insights will be displayed here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectOverview;
