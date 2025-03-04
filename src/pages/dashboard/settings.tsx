import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  // Breadcrumbs for the header
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Settings", path: "/dashboard/settings" },
  ];

  const [activeTab, setActiveTab] = useState("account");
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark"),
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Example Corp",
    notifications: {
      email: true,
      push: false,
      marketing: true,
    },
    security: {
      mfaEnabled: false,
      sessionTimeout: 30,
    },
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setUserData({
      ...userData,
      [section]: {
        ...userData[section as keyof typeof userData],
        [field]: value,
      },
    });
    setHasChanges(true);
  };

  const handleBasicInfoChange = (field: string, value: string) => {
    setUserData({
      ...userData,
      [field]: value,
    });
    setHasChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setHasChanges(true);
  };

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full space-y-6 bg-background dark:bg-gray-900">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground dark:text-white">
              Settings
            </h1>
            <p className="text-muted-foreground dark:text-gray-400">
              Manage your account settings and preferences
            </p>
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
            <CardTitle>User Settings</CardTitle>
            <CardDescription>
              Configure your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="account"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userData.name}
                        onChange={(e) =>
                          handleBasicInfoChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userData.email}
                        onChange={(e) =>
                          handleBasicInfoChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={userData.company}
                        onChange={(e) =>
                          handleBasicInfoChange("company", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Dark Mode</Label>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Toggle between light and dark theme
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className={!isDarkMode ? "bg-primary/10" : ""}
                          onClick={() => {
                            if (isDarkMode) toggleTheme();
                          }}
                        >
                          <Sun className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className={isDarkMode ? "bg-primary/10" : ""}
                          onClick={() => {
                            if (!isDarkMode) toggleTheme();
                          }}
                        >
                          <Moon className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Notification Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Receive email notifications for important events
                        </p>
                      </div>
                      <Switch
                        checked={userData.notifications.email}
                        onCheckedChange={(checked) =>
                          handleInputChange("notifications", "email", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Receive push notifications in your browser
                        </p>
                      </div>
                      <Switch
                        checked={userData.notifications.push}
                        onCheckedChange={(checked) =>
                          handleInputChange("notifications", "push", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">Marketing Emails</Label>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Receive marketing and promotional emails
                        </p>
                      </div>
                      <Switch
                        checked={userData.notifications.marketing}
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            "notifications",
                            "marketing",
                            checked,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-6 mt-0">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">
                          Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch
                        checked={userData.security.mfaEnabled}
                        onCheckedChange={(checked) =>
                          handleInputChange("security", "mfaEnabled", checked)
                        }
                      />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">
                        Session Timeout (minutes)
                      </Label>
                      <Input
                        id="session-timeout"
                        type="number"
                        min="5"
                        max="1440"
                        value={userData.security.sessionTimeout}
                        onChange={(e) =>
                          handleInputChange(
                            "security",
                            "sessionTimeout",
                            parseInt(e.target.value),
                          )
                        }
                      />
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        Your session will expire after this period of inactivity
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
