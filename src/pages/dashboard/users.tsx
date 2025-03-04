import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserManagement from "@/components/users/UserManagement";

const UsersPage = () => {
  // Breadcrumbs for the header
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Users", path: "/dashboard/users" },
  ];

  return (
    <DashboardLayout breadcrumbs={breadcrumbs}>
      <div className="w-full bg-background dark:bg-gray-900">
        <UserManagement projectName="Global Users" />
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
