import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, ShieldCheck, AlertTriangle } from "lucide-react";
import ActivityFeed from "@/components/projects/ActivityFeed";

const AnalyticsPage = () => {
  // Breadcrumbs for the header
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Analytics", path: "/dashboard/analytics" },
  ];

  // Stats data for the analytics dashboard
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
      icon: <ShieldCheck className="h-5 w-5 text-indigo-500" />,
    },
    {
      name: "Failed Logins",
      value: "124",
      change: "-8% from last month",
      trend: "down",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full space-y-6 bg-background dark:bg-gray-900">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground dark:text-white">
            Analytics
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            View authentication metrics and statistics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card dark:bg-gray-800">
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
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Feed */}
          <ActivityFeed title="Recent Activity" />

          {/* Charts */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="p-4">
                  <div className="h-80 flex items-center justify-center bg-muted dark:bg-gray-800 rounded-md">
                    <p className="text-muted-foreground dark:text-gray-400">
                      Daily authentication charts will be displayed here
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="weekly" className="p-4">
                  <div className="h-80 flex items-center justify-center bg-muted dark:bg-gray-800 rounded-md">
                    <p className="text-muted-foreground dark:text-gray-400">
                      Weekly authentication charts will be displayed here
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="monthly" className="p-4">
                  <div className="h-80 flex items-center justify-center bg-muted dark:bg-gray-800 rounded-md">
                    <p className="text-muted-foreground dark:text-gray-400">
                      Monthly authentication charts will be displayed here
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
