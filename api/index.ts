import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";

// This is a sample Hono.js API for the AuthPlatform
// In a real application, you would connect to a database
// and implement proper authentication logic

const app = new Hono();

// Configure CORS
app.use("/*", cors());

// Mock data
const users = [
  {
    id: "user-1",
    email: "admin@example.com",
    password: "password", // In a real app, this would be hashed
    name: "John Doe",
    role: "admin",
    isVerified: true,
    hasMfa: false,
  },
];

const projects = [
  {
    id: "proj-1",
    name: "Web Application",
    description: "Main authentication service for web applications",
    userCount: 1250,
    activeUsers: 850,
    totalUsers: 1500,
    status: "active",
  },
  {
    id: "proj-2",
    name: "Mobile App",
    description: "Authentication for iOS and Android applications",
    userCount: 3200,
    activeUsers: 2800,
    totalUsers: 4000,
    status: "active",
  },
];

// Public routes
app.post("/auth/login", async (c) => {
  const { email, password } = await c.req.json();

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  // In a real app, you would use a proper JWT library with a secure secret
  const token = "mock-jwt-token";

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  return c.json({
    token,
    user: userWithoutPassword,
  });
});

app.post("/auth/signup", async (c) => {
  const { email, password, confirmPassword } = await c.req.json();

  if (password !== confirmPassword) {
    return c.json({ error: "Passwords do not match" }, 400);
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return c.json({ error: "Email already in use" }, 400);
  }

  // In a real app, you would hash the password and store in database
  // For demo, we'll just return success

  return c.json({
    success: true,
    message:
      "User created successfully. Please check your email for verification.",
  });
});

app.post("/auth/forgot-password", async (c) => {
  const { email } = await c.req.json();

  // In a real app, you would send an email with reset link
  // For demo, we'll just return success regardless of email existence

  return c.json({
    success: true,
    message:
      "If an account with that email exists, we've sent a password reset link.",
  });
});

app.post("/auth/reset-password", async (c) => {
  const { token, password } = await c.req.json();

  // In a real app, you would validate the token and update the password
  // For demo, we'll just return success

  return c.json({
    success: true,
    message: "Password has been reset successfully.",
  });
});

app.post("/auth/verify-mfa", async (c) => {
  const { code } = await c.req.json();

  // In a real app, you would validate the MFA code
  if (code === "123456") {
    return c.json({
      success: true,
      token: "mock-jwt-token-with-mfa",
    });
  }

  return c.json({ error: "Invalid verification code" }, 400);
});

// Protected routes
app.use("/api/*", jwt({ secret: "your-secret-key" }));

app.get("/api/projects", (c) => {
  return c.json({ projects });
});

app.get("/api/projects/:id", (c) => {
  const id = c.req.param("id");
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return c.json({ error: "Project not found" }, 404);
  }

  return c.json({ project });
});

app.get("/api/users", (c) => {
  // Remove passwords from response
  const safeUsers = users.map(({ password, ...user }) => user);
  return c.json({ users: safeUsers });
});

export default app;
