import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GeneralSettings from "@/components/projects/settings/GeneralSettings";
import AuthSettings from "@/components/projects/settings/AuthSettings";
import ApiKeys from "@/components/projects/settings/ApiKeys";
import ThemeSettings from "@/components/projects/settings/ThemeSettings";
import EmailTemplates from "@/components/projects/settings/EmailTemplates";

interface ProjectSettingsPageProps {
  projectId?: string;
  projectName?: string;
}

const ProjectSettingsPage = ({
  projectId: propProjectId,
  projectName = "Authentication Project",
}: ProjectSettingsPageProps) => {
  const navigate = useNavigate();
  const { id: urlProjectId } = useParams<{ id: string }>();
  const projectId = propProjectId || urlProjectId || "";

  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Mock settings data
  const [settings, setSettings] = useState({
    general: {
      name: projectName,
      description: "Authentication service for web and mobile applications",
      domain: "auth.example.com",
      allowedOrigins: ["https://example.com", "https://app.example.com"],
    },
    auth: {
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
      },
      mfaEnabled: true,
      mfaRequired: false,
      sessionLifetime: 7, // days
      loginMethods: ["email", "google", "github"],
    },
    theme: {
      primaryColor: "#4F46E5",
      logoUrl: "https://example.com/logo.png",
      darkMode: true,
      customCss: "",
    },
  });

  const handleSettingsChange = (category: string, newSettings: any) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        ...newSettings,
      },
    });
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In a real app, this would save to an API
      console.log("Saving settings:", settings);
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackToProject = () => {
    navigate(`/dashboard/project/${projectId}`);
  };

  // Breadcrumbs for the header
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Projects", path: "/dashboard" },
    { label: projectName, path: `/dashboard/project/${projectId}` },
    { label: "Settings", path: `/dashboard/project/${projectId}/settings` },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs} projectName={projectName}>
      <div className="w-full bg-background">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToProject}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{projectName} Settings</h1>
              <p className="text-muted-foreground">
                Manage your project configuration
              </p>
            </div>
          </div>
          <Button
            onClick={handleSaveSettings}
            disabled={!hasChanges || isSaving}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Project Settings</CardTitle>
            <CardDescription>
              Configure your project's settings and authentication options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="general"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="auth">Authentication</TabsTrigger>
                <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                <TabsTrigger value="theme">Theme</TabsTrigger>
                <TabsTrigger value="email">Email Templates</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-0">
                <GeneralSettings
                  settings={settings.general}
                  onChange={(newSettings) =>
                    handleSettingsChange("general", newSettings)
                  }
                />
              </TabsContent>

              <TabsContent value="auth" className="space-y-4 mt-0">
                <AuthSettings
                  settings={settings.auth}
                  onChange={(newSettings) =>
                    handleSettingsChange("auth", newSettings)
                  }
                />
              </TabsContent>

              <TabsContent value="api-keys" className="space-y-4 mt-0">
                <ApiKeys projectId={projectId} />
              </TabsContent>

              <TabsContent value="theme" className="space-y-4 mt-0">
                <ThemeSettings
                  settings={settings.theme}
                  onChange={(newSettings) =>
                    handleSettingsChange("theme", newSettings)
                  }
                />
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-0">
                <EmailTemplates />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProjectSettingsPage;
