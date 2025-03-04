import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ApiKeys from "@/components/projects/settings/ApiKeys";

const ApiKeysPage = () => {
  // Breadcrumbs for the header
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "API Keys", path: "/dashboard/api-keys" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full bg-background dark:bg-gray-900">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground dark:text-white">
            API Keys
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Manage API keys for your authentication services
          </p>
        </div>
        <ApiKeys />
      </div>
    </DashboardLayout>
  );
};

export default ApiKeysPage;
