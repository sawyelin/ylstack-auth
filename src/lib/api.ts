import { supabase } from "./supabase";
import { User } from "./auth";

// Configuration flag to enable/disable real API calls
export const USE_REAL_API = false;

// Project interface
export interface Project {
  id: string;
  name: string;
  description: string;
  userCount: number;
  activeUsers: number;
  totalUsers: number;
  lastActivity: string;
  status: "active" | "inactive" | "maintenance";
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

// API key interface
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  projectId: string;
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "expired";
}

/**
 * Get all projects for the current user
 * @returns Array of projects
 */
export async function getProjects(): Promise<Project[]> {
  if (!USE_REAL_API) {
    // Return mock data
    return mockProjects;
  }

  try {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) throw error;

    return data as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

/**
 * Get a specific project by ID
 * @param projectId Project ID
 * @returns Project or null if not found
 */
export async function getProject(projectId: string): Promise<Project | null> {
  if (!USE_REAL_API) {
    // Return mock data
    return mockProjects.find((p) => p.id === projectId) || null;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (error) throw error;

    return data as Project;
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    return null;
  }
}

/**
 * Create a new project
 * @param project Project data
 * @returns Created project or null on error
 */
export async function createProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">,
): Promise<Project | null> {
  if (!USE_REAL_API) {
    // Create mock project
    const newProject: Project = {
      id: `project-${Date.now()}`,
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProjects.push(newProject);
    return newProject;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert({
        name: project.name,
        description: project.description,
        status: project.status,
        owner_id: project.ownerId,
      })
      .select()
      .single();

    if (error) throw error;

    return data as Project;
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
}

/**
 * Update a project
 * @param projectId Project ID
 * @param updates Project updates
 * @returns Updated project or null on error
 */
export async function updateProject(
  projectId: string,
  updates: Partial<Project>,
): Promise<Project | null> {
  if (!USE_REAL_API) {
    // Update mock project
    const projectIndex = mockProjects.findIndex((p) => p.id === projectId);
    if (projectIndex === -1) return null;

    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return mockProjects[projectIndex];
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", projectId)
      .select()
      .single();

    if (error) throw error;

    return data as Project;
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    return null;
  }
}

/**
 * Delete a project
 * @param projectId Project ID
 * @returns Success status
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  if (!USE_REAL_API) {
    // Delete mock project
    const projectIndex = mockProjects.findIndex((p) => p.id === projectId);
    if (projectIndex === -1) return false;

    mockProjects.splice(projectIndex, 1);
    return true;
  }

  try {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", projectId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    return false;
  }
}

/**
 * Get API keys for a project
 * @param projectId Project ID
 * @returns Array of API keys
 */
export async function getApiKeys(projectId: string): Promise<ApiKey[]> {
  if (!USE_REAL_API) {
    // Return mock data
    return mockApiKeys.filter((key) => key.projectId === projectId);
  }

  try {
    const { data, error } = await supabase
      .from("api_keys")
      .select("*")
      .eq("project_id", projectId);

    if (error) throw error;

    return data as ApiKey[];
  } catch (error) {
    console.error(`Error fetching API keys for project ${projectId}:`, error);
    return [];
  }
}

/**
 * Create a new API key
 * @param apiKey API key data
 * @returns Created API key or null on error
 */
export async function createApiKey(
  apiKey: Omit<ApiKey, "id" | "createdAt">,
): Promise<ApiKey | null> {
  if (!USE_REAL_API) {
    // Create mock API key
    const newApiKey: ApiKey = {
      id: `key-${Date.now()}`,
      ...apiKey,
      createdAt: new Date().toISOString(),
    };

    mockApiKeys.push(newApiKey);
    return newApiKey;
  }

  try {
    const { data, error } = await supabase
      .from("api_keys")
      .insert({
        name: apiKey.name,
        key: apiKey.key,
        project_id: apiKey.projectId,
        status: apiKey.status,
      })
      .select()
      .single();

    if (error) throw error;

    return data as ApiKey;
  } catch (error) {
    console.error("Error creating API key:", error);
    return null;
  }
}

/**
 * Revoke an API key
 * @param keyId API key ID
 * @returns Success status
 */
export async function revokeApiKey(keyId: string): Promise<boolean> {
  if (!USE_REAL_API) {
    // Update mock API key
    const keyIndex = mockApiKeys.findIndex((k) => k.id === keyId);
    if (keyIndex === -1) return false;

    mockApiKeys[keyIndex].status = "expired";
    return true;
  }

  try {
    const { error } = await supabase
      .from("api_keys")
      .update({ status: "expired" })
      .eq("id", keyId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(`Error revoking API key ${keyId}:`, error);
    return false;
  }
}

/**
 * Get users for a project
 * @param projectId Project ID
 * @returns Array of users
 */
export async function getProjectUsers(projectId: string): Promise<User[]> {
  if (!USE_REAL_API) {
    // Return mock data
    return mockUsers;
  }

  try {
    const { data, error } = await supabase
      .from("project_users")
      .select("user_id")
      .eq("project_id", projectId);

    if (error) throw error;

    // Fetch user details for each user ID
    const userIds = data.map((item) => item.user_id);
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .in("id", userIds);

    if (usersError) throw usersError;

    return users as User[];
  } catch (error) {
    console.error(`Error fetching users for project ${projectId}:`, error);
    return [];
  }
}

/**
 * Add a user to a project
 * @param projectId Project ID
 * @param userId User ID
 * @returns Success status
 */
export async function addUserToProject(
  projectId: string,
  userId: string,
): Promise<boolean> {
  if (!USE_REAL_API) {
    // In mock mode, we don't need to do anything as we're returning all users
    return true;
  }

  try {
    const { error } = await supabase.from("project_users").insert({
      project_id: projectId,
      user_id: userId,
    });

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(
      `Error adding user ${userId} to project ${projectId}:`,
      error,
    );
    return false;
  }
}

/**
 * Remove a user from a project
 * @param projectId Project ID
 * @param userId User ID
 * @returns Success status
 */
export async function removeUserFromProject(
  projectId: string,
  userId: string,
): Promise<boolean> {
  if (!USE_REAL_API) {
    // In mock mode, we don't need to do anything
    return true;
  }

  try {
    const { error } = await supabase
      .from("project_users")
      .delete()
      .eq("project_id", projectId)
      .eq("user_id", userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error(
      `Error removing user ${userId} from project ${projectId}:`,
      error,
    );
    return false;
  }
}

// Mock data for development and testing
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Main Website",
    description: "Authentication for our company website and blog",
    userCount: 2450,
    activeUsers: 1850,
    totalUsers: 3000,
    lastActivity: "5 minutes ago",
    status: "active",
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-06-15T10:30:00Z",
    ownerId: "user-1",
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
    createdAt: "2023-06-14T14:45:00Z",
    updatedAt: "2023-06-14T14:45:00Z",
    ownerId: "user-1",
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
    createdAt: "2023-06-10T09:00:00Z",
    updatedAt: "2023-06-10T09:00:00Z",
    ownerId: "user-2",
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
    createdAt: "2023-05-20T16:30:00Z",
    updatedAt: "2023-05-20T16:30:00Z",
    ownerId: "user-1",
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
    createdAt: "2023-04-02T10:30:00Z",
    updatedAt: "2023-04-02T10:30:00Z",
    ownerId: "user-3",
  },
];

const mockApiKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production API Key",
    key: "pk_live_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
    projectId: "1",
    createdAt: "2023-05-15T10:30:00Z",
    lastUsed: "2023-06-20T14:45:00Z",
    status: "active",
  },
  {
    id: "key-2",
    name: "Development API Key",
    key: "pk_test_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
    projectId: "1",
    createdAt: "2023-05-15T10:35:00Z",
    lastUsed: "2023-06-19T09:22:00Z",
    status: "active",
  },
  {
    id: "key-3",
    name: "Staging API Key",
    key: "pk_test_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
    projectId: "1",
    createdAt: "2023-05-16T08:15:00Z",
    lastUsed: null,
    status: "expired",
  },
  {
    id: "key-4",
    name: "Production API Key",
    key: "pk_live_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
    projectId: "2",
    createdAt: "2023-05-20T10:30:00Z",
    lastUsed: "2023-06-18T14:45:00Z",
    status: "active",
  },
  {
    id: "key-5",
    name: "Development API Key",
    key: "pk_test_51HG7d9CjttL2WsJdE8K2QhNPYcuNAJtbPpkMsqCqXHSILG6vVd",
    projectId: "2",
    createdAt: "2023-05-20T10:35:00Z",
    lastUsed: "2023-06-17T09:22:00Z",
    status: "active",
  },
];

const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    role: "user",
    last_sign_in: "2023-06-15T10:30:00Z",
    created_at: "2023-01-10T08:15:00Z",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "active",
    role: "admin",
    last_sign_in: "2023-06-14T14:45:00Z",
    created_at: "2023-02-05T11:20:00Z",
  },
  {
    id: "user-3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    status: "pending",
    role: "user",
    created_at: "2023-06-10T09:00:00Z",
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "blocked",
    role: "user",
    last_sign_in: "2023-05-20T16:30:00Z",
    created_at: "2023-03-15T13:45:00Z",
  },
  {
    id: "user-5",
    name: "Michael Wilson",
    email: "michael.w@example.com",
    status: "active",
    role: "user",
    last_sign_in: "2023-06-13T11:15:00Z",
    created_at: "2023-04-02T10:30:00Z",
  },
];
