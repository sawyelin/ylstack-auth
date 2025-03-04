import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

// Configuration flag to enable/disable real API
export const USE_REAL_API = false;

// Mock data
import { mockUsers, mockProjects, mockApiKeys, mockEvents } from "./mock-data";

// Create Hono app
const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", secureHeaders());
app.use("*", cors());

// JWT auth middleware (when using real auth)
const authMiddleware = async (c, next) => {
  if (!USE_REAL_API) {
    // Skip auth for mock mode
    return next();
  }

  // Use JWT middleware with secret from env
  return jwt({
    secret: process.env.JWT_SECRET || "your-secret-key",
  })(c, next);
};

// API Routes

// Health check
app.get("/", (c) => {
  return c.json({
    status: "ok",
    message: "Auth Platform API is running",
  });
});

// Auth routes
app.post("/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Check if user exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return c.json({ error: "User with this email already exists" }, 400);
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      name: name || email.split("@")[0],
      created_at: new Date().toISOString(),
      role: "user",
      status: "pending", // Requires email verification
    };

    mockUsers.push(newUser);

    // In a real app, send verification email here

    return c.json({
      user: newUser,
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    return c.json({ error: error.message || "Failed to create user" }, 500);
  }
});

app.post("/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }

    // Find user
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }

    if (user.status === "blocked") {
      return c.json({ error: "Your account has been blocked" }, 403);
    }

    if (user.status === "pending") {
      return c.json(
        { error: "Please verify your email before signing in" },
        403,
      );
    }

    // Update last sign in
    user.last_sign_in = new Date().toISOString();

    // Create session token (in a real app, use JWT)
    const token = "mock-jwt-token";

    // Track login event
    mockEvents.push({
      id: `event-${Date.now()}`,
      type: "login",
      userId: user.id,
      projectId: "system",
      timestamp: new Date().toISOString(),
      status: "success",
      ipAddress: c.req.header("x-forwarded-for") || "127.0.0.1",
      userAgent: c.req.header("user-agent") || "",
    });

    return c.json({ user, token, expiresIn: 86400 }); // 24 hours
  } catch (error) {
    return c.json({ error: error.message || "Failed to login" }, 500);
  }
});

app.post("/auth/verify-email", async (c) => {
  try {
    const { token } = await c.req.json();

    if (!token) {
      return c.json({ error: "Verification token is required" }, 400);
    }

    // In a real app, verify the token
    // For mock, just update the first pending user
    const pendingUser = mockUsers.find((u) => u.status === "pending");
    if (pendingUser) {
      pendingUser.status = "active";

      // Track verification event
      mockEvents.push({
        id: `event-${Date.now()}`,
        type: "email_verification",
        userId: pendingUser.id,
        projectId: "system",
        timestamp: new Date().toISOString(),
        status: "success",
      });

      return c.json({ success: true, message: "Email verified successfully" });
    }

    return c.json({ error: "Invalid or expired verification token" }, 400);
  } catch (error) {
    return c.json({ error: error.message || "Failed to verify email" }, 500);
  }
});

app.post("/auth/reset-password", async (c) => {
  try {
    const { email } = await c.req.json();

    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    // Check if user exists
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      // Don't reveal if user exists or not for security
      return c.json({
        success: true,
        message:
          "If your email is registered, you will receive a password reset link",
      });
    }

    // In a real app, send password reset email

    // Track password reset request event
    mockEvents.push({
      id: `event-${Date.now()}`,
      type: "password_reset",
      userId: user.id,
      projectId: "system",
      timestamp: new Date().toISOString(),
      status: "success",
    });

    return c.json({
      success: true,
      message:
        "If your email is registered, you will receive a password reset link",
    });
  } catch (error) {
    return c.json(
      { error: error.message || "Failed to process password reset request" },
      500,
    );
  }
});

// Project routes (protected)
app.get("/projects", authMiddleware, (c) => {
  return c.json(mockProjects);
});

app.get("/projects/:id", authMiddleware, (c) => {
  const projectId = c.req.param("id");
  const project = mockProjects.find((p) => p.id === projectId);

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json(project);
});

app.post("/projects", authMiddleware, async (c) => {
  try {
    const { name, description, status, ownerId } = await c.req.json();

    if (!name) {
      return c.json({ error: "Project name is required" }, 400);
    }

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

    return c.json(newProject);
  } catch (error) {
    return c.json({ error: error.message || "Failed to create project" }, 500);
  }
});

app.put("/projects/:id", authMiddleware, async (c) => {
  try {
    const projectId = c.req.param("id");
    const updates = await c.req.json();

    const projectIndex = mockProjects.findIndex((p) => p.id === projectId);
    if (projectIndex === -1) {
      return c.json({ error: "Project not found" }, 404);
    }

    mockProjects[projectIndex] = {
      ...mockProjects[projectIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return c.json(mockProjects[projectIndex]);
  } catch (error) {
    return c.json({ error: error.message || "Failed to update project" }, 500);
  }
});

app.delete("/projects/:id", authMiddleware, (c) => {
  const projectId = c.req.param("id");
  const projectIndex = mockProjects.findIndex((p) => p.id === projectId);

  if (projectIndex === -1) {
    return c.json({ error: "Project not found" }, 404);
  }

  mockProjects.splice(projectIndex, 1);

  return c.json({ success: true, message: "Project deleted successfully" });
});

// API Keys routes
app.get("/projects/:projectId/api-keys", authMiddleware, (c) => {
  const projectId = c.req.param("projectId");
  const keys = mockApiKeys.filter((key) => key.projectId === projectId);

  return c.json(keys);
});

app.post("/projects/:projectId/api-keys", authMiddleware, async (c) => {
  try {
    const projectId = c.req.param("projectId");
    const { name } = await c.req.json();

    if (!name) {
      return c.json({ error: "API key name is required" }, 400);
    }

    // Check if project exists
    const project = mockProjects.find((p) => p.id === projectId);
    if (!project) {
      return c.json({ error: "Project not found" }, 404);
    }

    // Generate random API key
    const key = `pk_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`;

    const newApiKey = {
      id: `key-${Date.now()}`,
      name,
      key,
      projectId,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: "active",
    };

    mockApiKeys.push(newApiKey);

    return c.json(newApiKey);
  } catch (error) {
    return c.json({ error: error.message || "Failed to create API key" }, 500);
  }
});

app.put("/api-keys/:id/revoke", authMiddleware, (c) => {
  const keyId = c.req.param("id");
  const keyIndex = mockApiKeys.findIndex((k) => k.id === keyId);

  if (keyIndex === -1) {
    return c.json({ error: "API key not found" }, 404);
  }

  mockApiKeys[keyIndex].status = "expired";

  return c.json({ success: true, message: "API key revoked successfully" });
});

// Analytics routes
app.get("/projects/:projectId/events", authMiddleware, (c) => {
  const projectId = c.req.param("projectId");
  const limit = parseInt(c.req.query("limit") || "100");
  const offset = parseInt(c.req.query("offset") || "0");

  const events = mockEvents
    .filter((event) => event.projectId === projectId)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(offset, offset + limit);

  return c.json(events);
});

app.get("/projects/:projectId/analytics", authMiddleware, (c) => {
  const projectId = c.req.param("projectId");
  const timeRange = c.req.query("timeRange") || "24h";

  // Calculate time range
  const now = new Date();
  let startDate;

  switch (timeRange) {
    case "7d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "30d":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case "24h":
    default:
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;
  }

  const relevantEvents = mockEvents.filter(
    (event) =>
      event.projectId === projectId && new Date(event.timestamp) >= startDate,
  );

  const successfulLogins = relevantEvents.filter(
    (e) => e.type === "login" && e.status === "success",
  ).length;
  const failedLogins = relevantEvents.filter(
    (e) => e.type === "login" && e.status === "failure",
  ).length;
  const signups = relevantEvents.filter(
    (e) => e.type === "signup" && e.status === "success",
  ).length;

  // Get unique users who had events in this period
  const uniqueUserIds = new Set(relevantEvents.map((e) => e.userId));

  return c.json({
    totalUsers: 5000, // Mock total users
    activeUsers: uniqueUserIds.size,
    newUsers: signups,
    successfulLogins,
    failedLogins,
    signups,
    timeRange,
  });
});

export default app;
