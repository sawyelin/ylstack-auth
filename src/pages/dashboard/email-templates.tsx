import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EmailTemplates from "@/components/projects/settings/EmailTemplates";

const EmailTemplatesPage = () => {
  // Breadcrumbs for the header
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Email Templates", path: "/dashboard/email-templates" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full bg-background dark:bg-gray-900">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground dark:text-white">
            Email Templates
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Customize email templates for authentication flows
          </p>
        </div>
        <EmailTemplates />
      </div>
    </DashboardLayout>
  );
};

export default EmailTemplatesPage;
