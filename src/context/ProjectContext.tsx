import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  Project,
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../lib/api";
import { useAuth } from "./AuthContext";

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (projectId: string) => Promise<Project | null>;
  createNewProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ) => Promise<Project | null>;
  updateProjectDetails: (
    projectId: string,
    updates: Partial<Project>,
  ) => Promise<Project | null>;
  removeProject: (projectId: string) => Promise<boolean>;
  setCurrentProject: (project: Project | null) => void;
  clearError: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects when user changes
  useEffect(() => {
    if (user) {
      fetchProjects();
    } else {
      setProjects([]);
      setCurrentProject(null);
    }
  }, [user]);

  const fetchProjects = async (): Promise<void> => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const projectList = await getProjects();
      setProjects(projectList);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch projects";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProject = async (projectId: string): Promise<Project | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const project = await getProject(projectId);
      if (project) {
        setCurrentProject(project);
      }
      return project;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to fetch project ${projectId}`;
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const createNewProject = async (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">,
  ): Promise<Project | null> => {
    if (!user) return null;

    setIsLoading(true);
    setError(null);

    try {
      const newProject = await createProject(project);
      if (newProject) {
        setProjects([...projects, newProject]);
        setCurrentProject(newProject);
      }
      return newProject;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create project";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProjectDetails = async (
    projectId: string,
    updates: Partial<Project>,
  ): Promise<Project | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedProject = await updateProject(projectId, updates);
      if (updatedProject) {
        setProjects(
          projects.map((p) => (p.id === projectId ? updatedProject : p)),
        );
        if (currentProject?.id === projectId) {
          setCurrentProject(updatedProject);
        }
      }
      return updatedProject;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to update project ${projectId}`;
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const removeProject = async (projectId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await deleteProject(projectId);
      if (success) {
        setProjects(projects.filter((p) => p.id !== projectId));
        if (currentProject?.id === projectId) {
          setCurrentProject(null);
        }
      }
      return success;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : `Failed to delete project ${projectId}`;
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    projects,
    currentProject,
    isLoading,
    error,
    fetchProjects,
    fetchProject,
    createNewProject,
    updateProjectDetails,
    removeProject,
    setCurrentProject,
    clearError,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
