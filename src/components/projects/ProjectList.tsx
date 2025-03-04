import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description: string;
  userCount: number;
  activeUsers: number;
  totalUsers: number;
  lastActivity: string;
  status: "active" | "inactive" | "maintenance";
}

interface ProjectListProps {
  projects?: Project[];
  onCreateProject?: () => void;
  onSelectProject?: (projectId: string) => void;
}

const ProjectList = ({
  projects = [
    {
      id: "1",
      name: "Main Website",
      description: "Authentication for our company website and blog",
      userCount: 2450,
      activeUsers: 1850,
      totalUsers: 3000,
      lastActivity: "5 minutes ago",
      status: "active",
    },
    {
      id: "2",
      name: "Mobile App",
      description: "User authentication for iOS and Android applications",
      userCount: 15750,
      activeUsers: 9200,
      totalUsers: 20000,
      lastActivity: "2 minutes ago",
      status: "active",
    },
    {
      id: "3",
      name: "E-commerce Platform",
      description: "Customer authentication for online store",
      userCount: 8320,
      activeUsers: 4150,
      totalUsers: 10000,
      lastActivity: "1 hour ago",
      status: "active",
    },
    {
      id: "4",
      name: "Admin Dashboard",
      description: "Internal admin tools authentication",
      userCount: 125,
      activeUsers: 85,
      totalUsers: 150,
      lastActivity: "3 hours ago",
      status: "active",
    },
    {
      id: "5",
      name: "Legacy System",
      description: "Authentication for legacy applications",
      userCount: 450,
      activeUsers: 120,
      totalUsers: 1200,
      lastActivity: "2 days ago",
      status: "maintenance",
    },
  ],
  onCreateProject = () => console.log("Create new project"),
  onSelectProject = (id) => console.log(`Selected project ${id}`),
}: ProjectListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(query.toLowerCase()) ||
          project.description.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProjects(filtered);
    }
  };

  // Handle filter by status
  const handleFilterByStatus = (status: string) => {
    if (activeFilter === status) {
      setActiveFilter(null);
      setFilteredProjects(projects);
    } else {
      setActiveFilter(status);
      const filtered = projects.filter((project) => project.status === status);
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col space-y-6">
        {/* Header with search and filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <p className="text-gray-500">Manage your authentication projects</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-9 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant={activeFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterByStatus("active")}
                className={activeFilter === "active" ? "bg-green-600" : ""}
              >
                Active
              </Button>
              <Button
                variant={activeFilter === "maintenance" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterByStatus("maintenance")}
                className={activeFilter === "maintenance" ? "bg-amber-600" : ""}
              >
                Maintenance
              </Button>
              <Button
                variant={activeFilter === "inactive" ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterByStatus("inactive")}
                className={activeFilter === "inactive" ? "bg-gray-600" : ""}
              >
                Inactive
              </Button>
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create new project card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              className="w-full h-[220px] cursor-pointer hover:shadow-md transition-shadow duration-200 border-dashed border-2 border-gray-300 bg-gray-50"
              onClick={onCreateProject}
            >
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Create New Project
                </h3>
                <p className="text-sm text-gray-500">
                  Set up a new authentication project for your application
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Project cards */}
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onSelectProject(project.id)}
            >
              <ProjectCard
                id={project.id}
                name={project.name}
                description={project.description}
                userCount={project.userCount}
                activeUsers={project.activeUsers}
                totalUsers={project.totalUsers}
                lastActivity={project.lastActivity}
                status={project.status}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No projects found</h3>
            <p className="text-sm text-gray-500 max-w-md mb-6">
              {searchQuery
                ? `No projects match "${searchQuery}". Try a different search term.`
                : "No projects match the selected filters. Try changing your filters or create a new project."}
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter(null);
                setFilteredProjects(projects);
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
