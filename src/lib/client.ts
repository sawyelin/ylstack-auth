// Client-side API wrapper for interacting with the Hono.js backend

// Configuration flag to enable/disable real API calls
export const USE_REAL_API = false;

// Import mock data for development
import { mockUsers, mockProjects, mockApiKeys, mockEvents } from "./mock-data";

// Base API URL - will be used when making real API calls
const API_BASE_URL = process.env.VITE_API_URL || "/api";

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  if (!USE_REAL_API) {
    // Return mock data based on the endpoint
    return mockResponse(endpoint, options);
  }

  const url = `${API_BASE_URL}${endpoint}`;

  // Add auth token to headers if available
  const token = localStorage.getItem("auth_token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "An error occurred");
    }

    return data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

// Mock response generator for development
async function mockResponse(endpoint: string, options: RequestInit) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const method = options.method || "GET";
  const body = options.body ? JSON.parse(options.body as string) : {};

  // Auth endpoints
  if (endpoint === "/auth/signup" && method === "POST") {
    const { email, password, name } = body;

    // Check if user exists
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name: name || email.split("@")[0],
      created_at: new Date().toISOString(),
      role: "user",
      status: "pending",
    };

    mockUsers.push(newUser);

    return {
      user: newUser,
      message: "User created successfully. Please verify your email.",
    };
  }

  if (endpoint === "/auth/login" && method === "POST") {
    const { email, password } = body;

    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (user.status === "blocked") {
      throw new Error("Your account has been blocked");
    }

    if (user.status === "pending") {
      throw new Error("Please verify your email before signing in");
    }

    // Update last sign in
    user.last_sign_in = new Date().toISOString();

    return {
      user,
      token: "mock-jwt-token",
      expiresIn: 86400, // 24 hours
    };
  }

  // Projects endpoints
  if (endpoint === "/projects" && method === "GET") {
    return mockProjects;
  }

  if (endpoint.match(/\/projects\/[\w-]+$/) && method === "GET") {
    const projectId = endpoint.split("/").pop();
    const project = mockProjects.find((p) => p.id === projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  }

  if (endpoint === "/projects" && method === "POST") {
    const { name, description, status, ownerId } = body;

    const newProject = {
      id: `project-${Date.now()}`,
      name,
      description: description || "",
      userCount: 0,
      activeUsers: 0,
      totalUsers: 0,
      lastActivity: "Just now",
      status: status || "active",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: ownerId || "user-1",
    };

    mockProjects.push(newProject);

    return newProject;
  }

  // API Keys endpoints
  if (endpoint.match(/\/projects\/[\w-]+\/api-keys$/) && method === "GET") {
    const projectId = endpoint.split("/")[2];
    return mockApiKeys.filter((key) => key.projectId === projectId);
  }

  // Analytics endpoints
  if (endpoint.match(/\/projects\/[\w-]+\/events$/) && method === "GET") {
    const projectId = endpoint.split("/")[2];
    return mockEvents
      .filter((event) => event.projectId === projectId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(0, 100);
  }

  // Default fallback
  throw new Error(`Unhandled mock endpoint: ${method} ${endpoint}`);
}

// Auth API
export const auth = {
  signup: (email: string, password: string, name?: string) => {
    return apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  },

  login: (email: string, password: string) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  logout: () => {
    localStorage.removeItem("auth_token");
    return Promise.resolve(true);
  },

  verifyEmail: (token: string) => {
    return apiRequest("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  resetPassword: (email: string) => {
    return apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  updatePassword: (token: string, password: string) => {
    return apiRequest("/auth/update-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
  },

  getCurrentUser: () => {
    // In a real app, this would validate the token and return user info
    // For mock mode, return the first active user
    if (!USE_REAL_API) {
      return Promise.resolve(
        mockUsers.find((u) => u.status === "active") || null,
      );
    }

    return apiRequest("/auth/me");
  },
};

// Projects API
export const projects = {
  getAll: () => {
    return apiRequest("/projects");
  },

  getById: (projectId: string) => {
    return apiRequest(`/projects/${projectId}`);
  },

  create: (data: { name: string; description?: string; status?: string }) => {
    return apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update: (projectId: string, data: any) => {
    return apiRequest(`/projects/${projectId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  delete: (projectId: string) => {
    return apiRequest(`/projects/${projectId}`, {
      method: "DELETE",
    });
  },

  // API Keys
  getApiKeys: (projectId: string) => {
    return apiRequest(`/projects/${projectId}/api-keys`);
  },

  createApiKey: (projectId: string, name: string) => {
    return apiRequest(`/projects/${projectId}/api-keys`, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  },

  revokeApiKey: (keyId: string) => {
    return apiRequest(`/api-keys/${keyId}/revoke`, {
      method: "PUT",
    });
  },

  // Analytics
  getEvents: (projectId: string, limit = 100, offset = 0) => {
    return apiRequest(
      `/projects/${projectId}/events?limit=${limit}&offset=${offset}`,
    );
  },

  getAnalytics: (projectId: string, timeRange = "24h") => {
    return apiRequest(
      `/projects/${projectId}/analytics?timeRange=${timeRange}`,
    );
  },
};
