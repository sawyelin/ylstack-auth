import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ProjectOverview from "@/components/projects/ProjectOverview";
import { motion } from "framer-motion";

interface ProjectData {
  id: string;
  name: string;
  description: string;
  stats: Array<{
    name: string;
    value: string | number;
    change?: string;
    trend?: "up" | "down" | "neutral";
  }>;
}

const ProjectDashboard = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mock project data
        const projectData: ProjectData = {
          id: id || "proj-123",
          name: "Authentication Project",
          description:
            "Main authentication service for web and mobile applications",
          stats: [
            {
              name: "Total Users",
              value: "1,234",
              change: "+12% from last month",
              trend: "up",
            },
            {
              name: "Active Users",
              value: "892",
              change: "+5% from last month",
              trend: "up",
            },
            {
              name: "Authentication Rate",
              value: "98.2%",
              change: "+0.5% from last month",
              trend: "up",
            },
            {
              name: "Failed Logins",
              value: "24",
              change: "-8% from last month",
              trend: "down",
            },
          ],
        };

        setProject(projectData);
      } catch (err) {
        setError("Failed to load project data. Please try again.");
        console.error("Error fetching project data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id]);

  // Breadcrumbs for the dashboard header
  const breadcrumbs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Projects", path: "/dashboard" },
    {
      label: project?.name || "Project Details",
      path: `/dashboard/project/${id}`,
    },
  ];

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      projectName={project?.name}
      notificationCount={3}
    >
      <div className="w-full h-full bg-white">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-destructive/15 text-destructive p-4 rounded-md"
          >
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-sm underline mt-2"
            >
              Try again
            </button>
          </motion.div>
        ) : project ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectOverview
              projectId={project.id}
              projectName={project.name}
              projectDescription={project.description}
              stats={project.stats.map((stat) => ({
                ...stat,
                // Add icons based on stat name (these will be provided by the ProjectOverview component)
              }))}
            />
          </motion.div>
        ) : (
          <div className="text-center p-8">
            <p>No project found with ID: {id}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProjectDashboard;
