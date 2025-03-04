import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserManagement from "@/components/users/UserManagement";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending" | "blocked";
  role: "user" | "admin";
  lastLogin: string;
  createdAt: string;
}

interface ProjectDetails {
  id: string;
  name: string;
  description: string;
}

const ProjectUsersPage = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetails>({
    id: id || "unknown",
    name: "Loading...",
    description: "Loading project details...",
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch project details and users from an API
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock project data
        setProject({
          id: id || "unknown",
          name: "Authentication Project",
          description:
            "Main authentication service for web and mobile applications",
        });

        // Mock users data
        setUsers([
          {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            status: "active",
            role: "user",
            lastLogin: "2023-06-15T10:30:00Z",
            createdAt: "2023-01-10T08:15:00Z",
          },
          {
            id: "2",
            name: "Jane Smith",
            email: "jane.smith@example.com",
            status: "active",
            role: "admin",
            lastLogin: "2023-06-14T14:45:00Z",
            createdAt: "2023-02-05T11:20:00Z",
          },
          {
            id: "3",
            name: "Robert Johnson",
            email: "robert.j@example.com",
            status: "pending",
            role: "user",
            lastLogin: "",
            createdAt: "2023-06-10T09:00:00Z",
          },
          {
            id: "4",
            name: "Emily Davis",
            email: "emily.davis@example.com",
            status: "blocked",
            role: "user",
            lastLogin: "2023-05-20T16:30:00Z",
            createdAt: "2023-03-15T13:45:00Z",
          },
          {
            id: "5",
            name: "Michael Wilson",
            email: "michael.w@example.com",
            status: "active",
            role: "user",
            lastLogin: "2023-06-13T11:15:00Z",
            createdAt: "2023-04-02T10:30:00Z",
          },
        ]);
      } catch (error) {
        console.error("Error fetching project data:", error);
        // Handle error state
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProjectData();
    }
  }, [id]);

  // Breadcrumbs for navigation
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Projects", path: "/dashboard" },
    { label: project.name, path: `/dashboard/project/${id}` },
    { label: "Users", path: `/dashboard/project/${id}/users` },
  ];

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      projectName={project.name}
      userName="Admin User"
      userEmail="admin@example.com"
      userAvatar={`https://api.dicebear.com/7.x/avataaars/svg?seed=admin`}
    >
      <div className="bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <UserManagement
            projectId={id}
            projectName={project.name}
            users={users}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectUsersPage;
