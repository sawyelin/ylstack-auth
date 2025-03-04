import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { format } from "date-fns";
import {
  Clock,
  UserPlus,
  LogIn,
  Key,
  Settings,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "login" | "signup" | "api_key" | "settings" | "error" | "success";
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  timestamp: Date;
  description: string;
  details?: string;
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
  title?: string;
}

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "login":
      return <LogIn className="h-4 w-4 text-blue-500" />;
    case "signup":
      return <UserPlus className="h-4 w-4 text-green-500" />;
    case "api_key":
      return <Key className="h-4 w-4 text-amber-500" />;
    case "settings":
      return <Settings className="h-4 w-4 text-purple-500" />;
    case "error":
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getActivityBadge = (type: ActivityItem["type"]) => {
  switch (type) {
    case "login":
      return (
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          Login
        </Badge>
      );
    case "signup":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Signup
        </Badge>
      );
    case "api_key":
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-700 border-amber-200"
        >
          API Key
        </Badge>
      );
    case "settings":
      return (
        <Badge
          variant="outline"
          className="bg-purple-50 text-purple-700 border-purple-200"
        >
          Settings
        </Badge>
      );
    case "error":
      return (
        <Badge
          variant="outline"
          className="bg-red-50 text-red-700 border-red-200"
        >
          Error
        </Badge>
      );
    case "success":
      return (
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200"
        >
          Success
        </Badge>
      );
    default:
      return <Badge variant="outline">Activity</Badge>;
  }
};

const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    type: "login",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    description: "Successful login from 192.168.1.1",
    details: "Browser: Chrome, OS: macOS",
  },
  {
    id: "2",
    type: "signup",
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    description: "New user registered",
    details: "Verification email sent",
  },
  {
    id: "3",
    type: "api_key",
    user: {
      name: "Admin User",
      email: "admin@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    description: "API key generated",
    details: "Key ID: API_KEY_12345 (truncated for security)",
  },
  {
    id: "4",
    type: "settings",
    user: {
      name: "Admin User",
      email: "admin@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    description: "MFA settings updated",
    details: "Enabled for all admin users",
  },
  {
    id: "5",
    type: "error",
    user: {
      name: "System",
      email: "system@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=system",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    description: "Failed login attempt",
    details: "Multiple failed attempts from IP 203.0.113.1",
  },
  {
    id: "6",
    type: "success",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    description: "Password reset successful",
    details: "User completed password reset flow",
  },
  {
    id: "7",
    type: "login",
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    description: "Successful login from 192.168.1.2",
    details: "Browser: Firefox, OS: Windows",
  },
  {
    id: "8",
    type: "api_key",
    user: {
      name: "Admin User",
      email: "admin@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    description: "API key revoked",
    details: "Key ID: API_KEY_54321",
  },
];

const ActivityFeed = ({
  activities = defaultActivities,
  title = "Recent Activity",
}: ActivityFeedProps) => {
  const [filter, setFilter] = useState<string>("all");
  const [timeRange, setTimeRange] = useState<string>("24h");

  // Filter activities based on selected filter
  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true;
    return activity.type === filter;
  });

  return (
    <Card className="w-full h-full bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-900">
            {title}
          </CardTitle>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] h-8 text-xs">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="all"
          value={filter}
          onValueChange={setFilter}
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="login">Logins</TabsTrigger>
            <TabsTrigger value="signup">Signups</TabsTrigger>
            <TabsTrigger value="api_key">API Keys</TabsTrigger>
          </TabsList>
          <TabsContent value={filter} className="mt-0">
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <div key={activity.id} className="flex space-x-4 py-3">
                      <Avatar className="h-10 w-10 border border-gray-200">
                        <img
                          src={
                            activity.user.avatar ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user.email}`
                          }
                          alt={activity.user.name}
                        />
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900">
                              {activity.user.name}
                            </p>
                            {getActivityBadge(activity.type)}
                          </div>
                          <span className="text-xs text-gray-500">
                            {format(activity.timestamp, "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          {activity.description}
                        </p>
                        {activity.details && (
                          <p className="text-xs text-gray-500">
                            {activity.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Clock className="h-8 w-8 text-gray-400 mb-2" />
                    <h3 className="text-sm font-medium text-gray-900">
                      No activities found
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Try changing your filters or time range
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
