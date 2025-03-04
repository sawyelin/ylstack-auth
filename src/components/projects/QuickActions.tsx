import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Users,
  Settings,
  Key,
  Mail,
  Shield,
  Palette,
  FileText,
  BarChart3,
  Code,
  RefreshCw,
} from "lucide-react";

interface QuickActionProps {
  title?: string;
  actions?: Array<{
    name: string;
    icon: React.ReactNode;
    description: string;
    onClick?: () => void;
  }>;
}

const QuickActions = ({
  title = "Quick Actions",
  actions = [
    {
      name: "Manage Users",
      icon: <Users className="h-5 w-5" />,
      description: "Add, edit, or remove users from your project",
      onClick: () => console.log("Navigate to users"),
    },
    {
      name: "API Keys",
      icon: <Key className="h-5 w-5" />,
      description: "Generate or revoke API keys for your project",
      onClick: () => console.log("Navigate to API keys"),
    },
    {
      name: "Auth Settings",
      icon: <Shield className="h-5 w-5" />,
      description: "Configure authentication methods and security",
      onClick: () => console.log("Navigate to auth settings"),
    },
    {
      name: "Email Templates",
      icon: <Mail className="h-5 w-5" />,
      description: "Customize email templates for authentication flows",
      onClick: () => console.log("Navigate to email templates"),
    },
    {
      name: "Theme Settings",
      icon: <Palette className="h-5 w-5" />,
      description: "Customize the look and feel of your auth pages",
      onClick: () => console.log("Navigate to theme settings"),
    },
    {
      name: "View Logs",
      icon: <FileText className="h-5 w-5" />,
      description: "Review authentication logs and activity",
      onClick: () => console.log("Navigate to logs"),
    },
    {
      name: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      description: "View authentication metrics and statistics",
      onClick: () => console.log("Navigate to analytics"),
    },
    {
      name: "Integration Code",
      icon: <Code className="h-5 w-5" />,
      description: "Get code snippets to integrate with your app",
      onClick: () => console.log("Navigate to integration code"),
    },
    {
      name: "Sync Users",
      icon: <RefreshCw className="h-5 w-5" />,
      description: "Synchronize users with external systems",
      onClick: () => console.log("Navigate to sync users"),
    },
  ],
}: QuickActionProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full h-full flex flex-col items-start justify-start p-4 gap-2 hover:bg-primary/5 border border-gray-200 rounded-lg"
                onClick={action.onClick}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  {action.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-base">{action.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {action.description}
                  </p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
