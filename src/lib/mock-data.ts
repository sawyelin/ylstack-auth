// Mock data for development and testing

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  last_sign_in?: string;
  role: "user" | "admin";
  status: "active" | "pending" | "blocked";
}

// Project types
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

// API key types
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  projectId: string;
  createdAt: string;
  lastUsed: string | null;
  status: "active" | "expired";
}

// Event types
export interface AuthEvent {
  id: string;
  type:
    | "login"
    | "signup"
    | "logout"
    | "password_reset"
    | "email_verification"
    | "mfa_verification";
  userId: string;
  projectId: string;
  timestamp: string;
  metadata?: Record<string, any>;
  status: "success" | "failure";
  ipAddress?: string;
  userAgent?: string;
}

// Mock users
export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "admin@example.com",
    name: "Admin User",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    created_at: "2023-01-01T00:00:00Z",
    last_sign_in: "2023-06-15T10:30:00Z",
    role: "admin",
    status: "active",
  },
  {
    id: "user-2",
    email: "john.doe@example.com",
    name: "John Doe",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    created_at: "2023-02-15T00:00:00Z",
    last_sign_in: "2023-06-14T14:45:00Z",
    role: "user",
    status: "active",
  },
  {
    id: "user-3",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    created_at: "2023-03-20T00:00:00Z",
    last_sign_in: "2023-06-10T09:00:00Z",
    role: "user",
    status: "active",
  },
  {
    id: "user-4",
    email: "pending@example.com",
    name: "Pending User",
    created_at: "2023-06-01T00:00:00Z",
    role: "user",
    status: "pending",
  },
  {
    id: "user-5",
    email: "blocked@example.com",
    name: "Blocked User",
    created_at: "2023-05-01T00:00:00Z",
    role: "user",
    status: "blocked",
  },
];

// Mock projects
export const mockProjects: Project[] = [
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

// Mock API keys
export const mockApiKeys: ApiKey[] = [
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

// Mock events
export const mockEvents: AuthEvent[] = [
  {
    id: "event-1",
    type: "login",
    userId: "user-1",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    status: "success",
    ipAddress: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
  {
    id: "event-2",
    type: "signup",
    userId: "user-3",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    status: "success",
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "event-3",
    type: "login",
    userId: "user-2",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    status: "success",
    ipAddress: "192.168.1.3",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
  },
  {
    id: "event-4",
    type: "login",
    userId: "unknown",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    status: "failure",
    ipAddress: "203.0.113.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "event-5",
    type: "password_reset",
    userId: "user-1",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    status: "success",
    ipAddress: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
  {
    id: "event-6",
    type: "login",
    userId: "user-2",
    projectId: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
    status: "success",
    ipAddress: "192.168.1.4",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "event-7",
    type: "signup",
    userId: "user-5",
    projectId: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    status: "success",
    ipAddress: "192.168.1.5",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
  {
    id: "event-8",
    type: "mfa_verification",
    userId: "user-1",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5 - 1000).toISOString(), // 5 minutes and 1 second ago
    status: "success",
    ipAddress: "192.168.1.1",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  },
  {
    id: "event-9",
    type: "email_verification",
    userId: "user-3",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
    status: "success",
    ipAddress: "192.168.1.2",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "event-10",
    type: "logout",
    userId: "user-2",
    projectId: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    status: "success",
    ipAddress: "192.168.1.3",
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
  },
];
