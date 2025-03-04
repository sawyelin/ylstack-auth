Migration Guide: Converting Mock Functions to Real API Implementation
1. Hono.js API Integration
Dashboard Module
typescript
Download
Copy code
// src/lib/client.ts - Update the flag to use real API
export const USE_REAL_API = true;

// Replace mock data fetching with real API calls
const handleCreateProject = async () => {
  try {
    const newProject = await projects.create({
      name: "New Project",
      description: "Description of the new project"
    });
    // Handle successful creation
    navigate(`/dashboard/project/${newProject.id}`);
  } catch (error) {
    console.error("Error creating project:", error);
    // Handle error state
  }
};

const handleSelectProject = async (projectId: string) => {
  try {
    // Fetch project details before navigation
    await projects.getById(projectId);
    navigate(`/dashboard/project/${projectId}`);
  } catch (error) {
    console.error(`Error fetching project ${projectId}:`, error);
    // Handle error state
  }
};
User Management Module
typescript
Download
Copy code
// Replace mock user data with API calls
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Replace mock user actions with real API calls
const handleDeleteUser = async (userId: string) => {
  try {
    await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    // Update UI after successful deletion
    setUsers(users.filter(user => user.id !== userId));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
Activity Feed Module
typescript
Download
Copy code
// Replace mock activity data with real-time events
const fetchActivities = async (filter = 'all', timeRange = '24h') => {
  try {
    const response = await fetch(`/api/events?filter=${filter}&timeRange=${timeRange}`);
    const data = await response.json();
    setActivities(data);
  } catch (error) {
    console.error("Error fetching activities:", error);
  }
};

// Set up real-time updates with WebSocket
useEffect(() => {
  const ws = new WebSocket('wss://your-api-domain.com/events');
  
  ws.onmessage = (event) => {
    const newActivity = JSON.parse(event.data);
    setActivities(prev => [newActivity, ...prev].slice(0, 100));
  };
  
  return () => {
    ws.close();
  };
}, []);
Email Templates Module
typescript
Download
Copy code
// Replace mock templates with API data
const fetchTemplates = async () => {
  try {
    const response = await fetch('/api/email-templates');
    const data = await response.json();
    setTemplates(data);
  } catch (error) {
    console.error("Error fetching email templates:", error);
  }
};

// Implement real template saving
const handleSave = async () => {
  try {
    const response = await fetch(`/api/email-templates/${editedTemplate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify(editedTemplate)
    });
    
    if (!response.ok) throw new Error('Failed to save template');
    
    // Update UI after successful save
    const updatedTemplate = await response.json();
    setTemplates(templates.map(t => t.id === updatedTemplate.id ? updatedTemplate : t));
  } catch (error) {
    console.error("Error saving template:", error);
  }
};
2. Cloudflare Pages Integration
Deployment Configuration
javascript
Download
Copy code
// wrangler.toml
name = "auth-platform"
type = "javascript"
account_id = "your-cloudflare-account-id"
workers_dev = true
route = ""
zone_id = ""
usage_model = ""
compatibility_date = "2023-01-01"

[site]
bucket = "./dist"
entry-point = "functions"

[build]
command = "npm run build"
upload.format = "service-worker"

[env.production]
name = "auth-platform-prod"
route = "auth.yourdomain.com/*"
API Routes Implementation
typescript
Download
Copy code
// functions/api/[[route]].ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";

// Create Hono app
const app = new Hono();

// Middleware
app.use("*", cors());
app.use("/api/*", jwt({
  secret: process.env.JWT_SECRET || "your-secret-key",
}));

// Auth routes
app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json();
  
  // Implement real authentication logic
  // Connect to your database or auth service
  
  // Example with database query
  const user = await db.users.findUnique({
    where: { email }
  });
  
  if (!user || !await comparePasswords(password, user.passwordHash)) {
    return c.json({ error: "Invalid credentials" }, 401);
  }
  
  // Generate JWT token
  const token = generateJWT(user);
  
  return c.json({ user, token });
});

// User routes
app.get("/api/users", async (c) => {
  // Implement real user fetching logic
  const users = await db.users.findMany();
  return c.json(users);
});

// Project routes
app.get("/api/projects", async (c) => {
  // Get user from JWT
  const user = c.get("jwtPayload");
  
  // Fetch projects for this user
  const projects = await db.projects.findMany({
    where: { ownerId: user.id }
  });
  
  return c.json(projects);
});

// Export for Cloudflare Pages Functions
export const onRequest = app.fetch;
Database Connection
typescript
Download
Copy code
// src/lib/db.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Example query function
export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('owner_id', userId);
    
  if (error) throw error;
  return data;
}
3. Authentication Implementation
typescript
Download
Copy code
// src/lib/auth.ts - Update the flag to use real auth
export const USE_REAL_AUTH = true;

// Replace mock auth with real implementation
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed');
    }
    
    // Store auth token
    localStorage.setItem('auth_token', data.token);
    
    return {
      user: data.user,
      session: { expires_at: Date.now() + 86400000 }, // 24 hours
      error: null
    };
  } catch (error) {
    return {
      user: null,
      session: null,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}
4. Analytics Implementation
typescript
Download
Copy code
// src/lib/analytics.ts - Update the flag to use real analytics
export const USE_REAL_ANALYTICS = true;

// Replace mock analytics with real implementation
export async function getAnalyticsSummary(
  projectId: string,
  timeRange: string = "24h"
): Promise<AnalyticsSummary> {
  try {
    const response = await fetch(
      `/api/projects/${projectId}/analytics?timeRange=${timeRange}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch analytics');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching analytics for project ${projectId}:`, error);
    // Return empty data structure on error
    return {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      successfulLogins: 0,
      failedLogins: 0,
      signups: 0,
      timeRange
    };
  }
}

5. Project Management Implementation
typescript
Download
Copy code
// src/lib/api.ts - Update the flag to use real API
export const USE_REAL_API = true;

// Replace mock project management with real implementation
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch('/api/projects', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function createProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
): Promise<Project | null> {
  try {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify(project)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}
6. Email Template Management Implementation
typescript
Download
Copy code
// Replace mock email template management with real API calls
export async function getEmailTemplates(projectId: string): Promise<EmailTemplate[]> {
  try {
    const response = await fetch(`/api/projects/${projectId}/email-templates`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch email templates');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching email templates:', error);
    return [];
  }
}

export async function updateEmailTemplate(
  projectId: string,
  templateId: string,
  template: Partial<EmailTemplate>
): Promise<EmailTemplate | null> {
  try {
    const response = await fetch(`/api/projects/${projectId}/email-templates/${templateId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify(template)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update email template');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating email template:', error);
    return null;
  }
}
7. Activity Feed Implementation
typescript
Download
Copy code
// Replace mock activity feed with real-time events
export async function getActivityEvents(
  projectId: string,
  filter: string = 'all',
  timeRange: string = '24h'
): Promise<ActivityItem[]> {
  try {
    const response = await fetch(
      `/api/projects/${projectId}/events?filter=${filter}&timeRange=${timeRange}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch activity events');
    }
    
    const data = await response.json();
    
    // Transform API response to match ActivityItem interface
    return data.map((event: any) => ({
      id: event.id,
      type: event.type,
      user: {
        name: event.user_name || 'Unknown',
        email: event.user_email || 'unknown@example.com',
        avatar: event.user_avatar
      },
      timestamp: new Date(event.timestamp),
      description: event.description,
      details: event.details
    }));
  } catch (error) {
    console.error('Error fetching activity events:', error);
    return [];
  }
}

// Set up WebSocket for real-time activity updates
export function setupActivityWebSocket(
  projectId: string,
  onEvent: (event: ActivityItem) => void
): () => void {
  const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/ws/projects/${projectId}/events`;
  const socket = new WebSocket(wsUrl);
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onEvent({
        id: data.id,
        type: data.type,
        user: {
          name: data.user_name || 'Unknown',
          email: data.user_email || 'unknown@example.com',
          avatar: data.user_avatar
        },
        timestamp: new Date(data.timestamp),
        description: data.description,
        details: data.details
      });
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  };
  
  // Return cleanup function
  return () => {
    socket.close();
  };
}
8. Cloudflare KV Storage Integration
typescript
Download
Copy code
// functions/api/[[route]].ts - Add KV storage for data persistence
import { Hono } from "hono";
import { KVNamespace } from "@cloudflare/workers-types";

interface Env {
  AUTH_PLATFORM_KV: KVNamespace;
}

const app = new Hono<{ Bindings: Env }>();

// User routes with KV storage
app.get("/api/users", async (c) => {
  try {
    // Get user from JWT
    const user = c.get("jwtPayload");
    
    // Fetch users from KV storage
    const usersJson = await c.env.AUTH_PLATFORM_KV.get("users");
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    return c.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

app.post("/api/users", async (c) => {
  try {
    const userData = await c.req.json();
    
    // Validate required fields
    if (!userData.email || !userData.name) {
      return c.json({ error: "Email and name are required" }, 400);
    }
    
    // Get existing users
    const usersJson = await c.env.AUTH_PLATFORM_KV.get("users");
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Check if user already exists
    if (users.some((u: any) => u.email === userData.email)) {
      return c.json({ error: "User with this email already exists" }, 400);
    }
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      status: "active",
      role: userData.role || "user",
      created_at: new Date().toISOString(),
    };
    
    // Add to users array
    users.push(newUser);
    
    // Save to KV storage
    await c.env.AUTH_PLATFORM_KV.put("users", JSON.stringify(users));
    
    return c.json(newUser, 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});
9. Implementing JWT Authentication
typescript
Download
Copy code
// functions/api/auth/[[route]].ts
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { KVNamespace } from "@cloudflare/workers-types";
import { createHash } from "crypto";

interface Env {
  AUTH_PLATFORM_KV: KVNamespace;
  JWT_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

// Helper function to hash passwords
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

// Login endpoint
app.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }
    
    // Get users from KV
    const usersJson = await c.env.AUTH_PLATFORM_KV.get("users");
    const users = usersJson ? JSON.parse(usersJson) : [];
    
    // Find user
    const user = users.find((u: any) => u.email === email);
    
    if (!user) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    
    // Check password
    const hashedPassword = hashPassword(password);
    if (user.password_hash !== hashedPassword) {
      return c.json({ error: "Invalid credentials" }, 401);
    }
    
    // Check user status
    if (user.status === "blocked") {
      return c.json({ error: "Your account has been blocked" }, 403);
    }
    
    if (user.status === "pending") {
      return c.json({ error: "Please verify your email before signing in" }, 403);
    }
    
    // Generate JWT token
    const token = await sign({ 
      sub: user.id,
      email: user.email,
      role: user.role
    }, c.env.JWT_SECRET);
    
    // Update last login
    user.last_sign_in = new Date().toISOString();
    await c.env.AUTH_PLATFORM_KV.put("users", JSON.stringify(
      users.map((u: any) => u.id === user.id ? user : u)
    ));
    
    // Log login event
    const event = {
      id: `event-${Date.now()}`,
      type: "login",
      user_id: user.id,
      project_id: "system",
      timestamp: new Date().toISOString(),
      status: "success",
      ip_address: c.req.header("cf-connecting-ip") || "unknown",
      user_agent: c.req.header("user-agent") || ""
    };
    
    const eventsJson = await c.env.AUTH_PLATFORM_KV.get("events");
    const events = eventsJson ? JSON.parse(eventsJson) : [];
    events.push(event);
    await c.env.AUTH_PLATFORM_KV.put("events", JSON.stringify(events));
    
    // Return user and token
    return c.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      },
      token,
      expiresIn: 86400 // 24 hours
    });
  } catch (error) {
    console.error("Error during login:", error);
    return c.json({ error: "An error occurred during login" }, 500);
  }
});

export default app;
10. Implementing WebSocket for Real-time Updates
typescript
Download
Copy code
// functions/api/ws/[[route]].ts
import { WebSocketPair } from "@cloudflare/workers-types";

export async function onRequest(context) {
  // Create a new WebSocket pair
  const pair = new WebSocketPair();
  const [client, server] = Object.values(pair);
  
  // Accept the WebSocket connection
  server.accept();
  
  // Get project ID from URL
  const url = new URL(context.request.url);
  const pathParts = url.pathname.split('/');
  const projectId = pathParts[pathParts.indexOf('projects') + 1];
  
  // Store the WebSocket connection in Durable Object
  const id = context.env.WEBSOCKET_CONNECTIONS.idFromName(projectId);
  const wsConnection = await context.env.WEBSOCKET_CONNECTIONS.get(id);
  await wsConnection.fetch('https://register-connection', {
    method: 'POST',
    body: JSON.stringify({ projectId })
  });
  
  // Handle WebSocket messages
  server.addEventListener('message', async (event) => {
    try {
      const message = JSON.parse(event.data);
      // Process message if needed
    } catch (error) {
      console.error('Error processing WebSocket message:', error);
    }
  });
  
  // Handle WebSocket close
  server.addEventListener('close', async () => {
    // Unregister the connection
    await wsConnection.fetch('https://unregister-connection', {
      method: 'POST',
      body: JSON.stringify({ projectId })
    });
  });
  
  // Return the client WebSocket
  return new Response(null, {
    status: 101,
    webSocket: client
  });
}
11. Implementing Durable Objects for WebSocket Management
typescript
Download
Copy code
// functions/api/websocket-connections.ts
export class WebSocketConnections {
  connections: Map<string, WebSocket[]>;
  
  constructor(state, env) {
    this.connections = new Map();
  }
  
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/register-connection') {
      const { projectId, connectionId } = await request.json();
      
      if (!this.connections.has(projectId)) {
        this.connections.set(projectId, []);
      }
      
      this.connections.get(projectId).push(connectionId);
      return new Response('Connection registered', { status: 200 });
    }
    
    if (url.pathname === '/unregister-connection') {
      const { projectId, connectionId } = await request.json();
      
      if (this.connections.has(projectId)) {
        const connections = this.connections.get(projectId);
        const index = connections.indexOf(connectionId);
        
        if (index !== -1) {
          connections.splice(index, 1);
        }
        
        if (connections.length === 0) {
          this.connections.delete(projectId);
        }
      }
      
      return new Response('Connection unregistered', { status: 200 });
    }
    
    if (url.pathname === '/broadcast') {
      const { projectId, message } = await request.json();
      
      if (this.connections.has(projectId)) {
        const connections = this.connections.get(projectId);
        
        for (const connectionId of connections) {
          // Broadcast message to all connections
          // In a real implementation, you would retrieve the WebSocket from storage
          // and send the message
        }
      }
      
      return new Response('Message broadcasted', { status: 200 });
    }
    
    return new Response('Not found', { status: 404 });
  }
}
12. Implementing Email Sending with Cloudflare Workers
typescript
Download
Copy code
// functions/api/email/[[route]].ts
import { Hono } from "hono";
import { Resend } from "resend";

interface Env {
  RESEND_API_KEY: string;
}

const app = new Hono<{ Bindings: Env }>();

app.post("/send", async (c) => {
  try {
    const { to, subject, html, from = "auth@yourdomain.com" } = await c.req.json();
    
    if (!to || !subject || !html) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    
    const resend = new Resend(c.env.RESEND_API_KEY);
    
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    return c.json({ success: true, messageId: data.id });
  } catch (error) {
    console.error("Error sending email:", error);
    return c.json({ error: "Failed to send email" }, 500);
  }
});

export default app;



13. Implementing Cloudflare D1 Database Integration
typescript
Download
Copy code
// functions/api/database.ts
import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// Initialize database schema
app.get("/init", async (c) => {
  try {
    // Create users table
    await c.env.DB.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        last_sign_in TEXT
      )
    `);

    // Create projects table
    await c.env.DB.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        owner_id TEXT NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(id)
      )
    `);

    // Create api_keys table
    await c.env.DB.exec(`
      CREATE TABLE IF NOT EXISTS api_keys (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        key TEXT UNIQUE NOT NULL,
        project_id TEXT NOT NULL,
        created_at TEXT NOT NULL,
        last_used TEXT,
        status TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);

    // Create events table
    await c.env.DB.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL,
        user_id TEXT,
        project_id TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        metadata TEXT,
        status TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);

    // Create email_templates table
    await c.env.DB.exec(`
      CREATE TABLE IF NOT EXISTS email_templates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        subject TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT NOT NULL,
        project_id TEXT NOT NULL,
        active BOOLEAN NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id)
      )
    `);

    return c.json({ success: true, message: "Database initialized successfully" });
  } catch (error) {
    console.error("Error initializing database:", error);
    return c.json({ error: "Failed to initialize database" }, 500);
  }
});

// User CRUD operations with D1
app.get("/users", async (c) => {
  try {
    const { results } = await c.env.DB.prepare("SELECT * FROM users").all();
    return c.json(results);
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

app.post("/users", async (c) => {
  try {
    const userData = await c.req.json();
    
    // Validate required fields
    if (!userData.email || !userData.name || !userData.password_hash) {
      return c.json({ error: "Email, name, and password are required" }, 400);
    }
    
    const userId = `user-${Date.now()}`;
    const now = new Date().toISOString();
    
    const { success } = await c.env.DB.prepare(`
      INSERT INTO users (id, email, name, password_hash, role, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      userId,
      userData.email,
      userData.name,
      userData.password_hash,
      userData.role || "user",
      userData.status || "pending",
      now
    ).run();
    
    if (!success) {
      throw new Error("Failed to insert user");
    }
    
    // Get the newly created user
    const { results } = await c.env.DB.prepare("SELECT * FROM users WHERE id = ?")
      .bind(userId)
      .all();
    
    return c.json(results[0], 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

export default app;
14. Implementing Project Management with D1
typescript
Download
Copy code
// functions/api/projects.ts
import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// Get all projects for a user
app.get("/", async (c) => {
  try {
    // In a real app, get user ID from JWT
    const userId = c.get("jwtPayload")?.sub || "user-1";
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM projects WHERE owner_id = ? ORDER BY created_at DESC
    `).bind(userId).all();
    
    return c.json(results);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return c.json({ error: "Failed to fetch projects" }, 500);
  }
});

// Get a specific project
app.get("/:id", async (c) => {
  try {
    const projectId = c.req.param("id");
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM projects WHERE id = ?
    `).bind(projectId).all();
    
    if (results.length === 0) {
      return c.json({ error: "Project not found" }, 404);
    }
    
    return c.json(results[0]);
  } catch (error) {
    console.error("Error fetching project:", error);
    return c.json({ error: "Failed to fetch project" }, 500);
  }
});

// Create a new project
app.post("/", async (c) => {
  try {
    const projectData = await c.req.json();
    
    // Validate required fields
    if (!projectData.name) {
      return c.json({ error: "Project name is required" }, 400);
    }
    
    // In a real app, get user ID from JWT
    const userId = c.get("jwtPayload")?.sub || "user-1";
    
    const projectId = `project-${Date.now()}`;
    const now = new Date().toISOString();
    
    const { success } = await c.env.DB.prepare(`
      INSERT INTO projects (id, name, description, status, created_at, updated_at, owner_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      projectId,
      projectData.name,
      projectData.description || "",
      projectData.status || "active",
      now,
      now,
      userId
    ).run();
    
    if (!success) {
      throw new Error("Failed to insert project");
    }
    
    // Get the newly created project
    const { results } = await c.env.DB.prepare("SELECT * FROM projects WHERE id = ?")
      .bind(projectId)
      .all();
    
    return c.json(results[0], 201);
  } catch (error) {
    console.error("Error creating project:", error);
    return c.json({ error: "Failed to create project" }, 500);
  }
});

// Update a project
app.put("/:id", async (c) => {
  try {
    const projectId = c.req.param("id");
    const updates = await c.req.json();
    
    // Check if project exists
    const { results: existingProject } = await c.env.DB.prepare(`
      SELECT * FROM projects WHERE id = ?
    `).bind(projectId).all();
    
    if (existingProject.length === 0) {
      return c.json({ error: "Project not found" }, 404);
    }
    
    // Update project fields
    const now = new Date().toISOString();
    
    const { success } = await c.env.DB.prepare(`
      UPDATE projects 
      SET name = ?, description = ?, status = ?, updated_at = ?
      WHERE id = ?
    `).bind(
      updates.name || existingProject[0].name,
      updates.description || existingProject[0].description,
      updates.status || existingProject[0].status,
      now,
      projectId
    ).run();
    
    if (!success) {
      throw new Error("Failed to update project");
    }
    
    // Get the updated project
    const { results } = await c.env.DB.prepare("SELECT * FROM projects WHERE id = ?")
      .bind(projectId)
      .all();
    
    return c.json(results[0]);
  } catch (error) {
    console.error("Error updating project:", error);
    return c.json({ error: "Failed to update project" }, 500);
  }
});

// Delete a project
app.delete("/:id", async (c) => {
  try {
    const projectId = c.req.param("id");
    
    // Check if project exists
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM projects WHERE id = ?
    `).bind(projectId).all();
    
    if (results.length === 0) {
      return c.json({ error: "Project not found" }, 404);
    }
    
    // Delete related records first (foreign key constraints)
    await c.env.DB.prepare("DELETE FROM api_keys WHERE project_id = ?").bind(projectId).run();
    await c.env.DB.prepare("DELETE FROM email_templates WHERE project_id = ?").bind(projectId).run();
    await c.env.DB.prepare("DELETE FROM events WHERE project_id = ?").bind(projectId).run();
    
    // Delete the project
    const { success } = await c.env.DB.prepare("DELETE FROM projects WHERE id = ?")
      .bind(projectId)
      .run();
    
    if (!success) {
      throw new Error("Failed to delete project");
    }
    
    return c.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return c.json({ error: "Failed to delete project" }, 500);
  }
});

export default app;
15. Implementing Email Template Management with D1
typescript
Download
Copy code
// functions/api/email-templates.ts
import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// Get all email templates for a project
app.get("/projects/:projectId/email-templates", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM email_templates WHERE project_id = ? ORDER BY name ASC
    `).bind(projectId).all();
    
    return c.json(results);
  } catch (error) {
    console.error("Error fetching email templates:", error);
    return c.json({ error: "Failed to fetch email templates" }, 500);
  }
});

// Get a specific email template
app.get("/email-templates/:id", async (c) => {
  try {
    const templateId = c.req.param("id");
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM email_templates WHERE id = ?
    `).bind(templateId).all();
    
    if (results.length === 0) {
      return c.json({ error: "Email template not found" }, 404);
    }
    
    return c.json(results[0]);
  } catch (error) {
    console.error("Error fetching email template:", error);
    return c.json({ error: "Failed to fetch email template" }, 500);
  }
});

// Create a new email template
app.post("/projects/:projectId/email-templates", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    const templateData = await c.req.json();
    
    // Validate required fields
    if (!templateData.name || !templateData.subject || !templateData.content || !templateData.type) {
      return c.json({ error: "Name, subject, content, and type are required" }, 400);
    }
    
    const templateId = `template-${Date.now()}`;
    const now = new Date().toISOString();
    
    const { success } = await c.env.DB.prepare(`
      INSERT INTO email_templates (
        id, name, subject, content, type, project_id, active, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      templateId,
      templateData.name,
      templateData.subject,
      templateData.content,
      templateData.type,
      projectId,
      templateData.active || true,
      now,
      now
    ).run();
    
    if (!success) {
      throw new Error("Failed to insert email template");
    }
    
    // Get the newly created template
    const { results } = await c.env.DB.prepare("SELECT * FROM email_templates WHERE id = ?")
      .bind(templateId)
      .all();
    
    return c.json(results[0], 201);
  } catch (error) {
    console.error("Error creating email template:", error);
    return c.json({ error: "Failed to create email template" }, 500);
  }
});

// Update an email template
app.put("/email-templates/:id", async (c) => {
  try {
    const templateId = c.req.param("id");
    const updates = await c.req.json();
    
    // Check if template exists
    const { results: existingTemplate } = await c.env.DB.prepare(`
      SELECT * FROM email_templates WHERE id = ?
    `).bind(templateId).all();
    
    if (existingTemplate.length === 0) {
      return c.json({ error: "Email template not found" }, 404);
    }
    
    // Update template fields
    const now = new Date().toISOString();
    
    const { success } = await c.env.DB.prepare(`
      UPDATE email_templates 
      SET name = ?, subject = ?, content = ?, type = ?, active = ?, updated_at = ?
      WHERE id = ?
    `).bind(
      updates.name || existingTemplate[0].name,
      updates.subject || existingTemplate[0].subject,
      updates.content || existingTemplate[0].content,
      updates.type || existingTemplate[0].type,
      updates.active !== undefined ? updates.active : existingTemplate[0].active,
      now,
      templateId
    ).run();
    
    if (!success) {
      throw new Error("Failed to update email template");
    }
    
    // Get the updated template
    const { results } = await c.env.DB.prepare("SELECT * FROM email_templates WHERE id = ?")
      .bind(templateId)
      .all();
    
    return c.json(results[0]);
  } catch (error) {
    console.error("Error updating email template:", error);
    return c.json({ error: "Failed to update email template" }, 500);
  }
});

// Delete an email template
app.delete("/email-templates/:id", async (c) => {
  try {
    const templateId = c.req.param("id");
    
    // Check if template exists
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM email_templates WHERE id = ?
    `).bind(templateId).all();
    
    if (results.length === 0) {
      return c.json({ error: "Email template not found" }, 404);
    }
    
    // Delete the template
    const { success } = await c.env.DB.prepare("DELETE FROM email_templates WHERE id = ?")
      .bind(templateId)
      .run();
    
    if (!success) {
      throw new Error("Failed to delete email template");
    }
    
    return c.json({ success: true, message: "Email template deleted successfully" });
  } catch (error) {
    console.error("Error deleting email template:", error);
    return c.json({ error: "Failed to delete email template" }, 500);
  }
});

export default app;
16. Implementing Activity Feed with D1
typescript
Download
Copy code
// functions/api/events.ts
import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// Get events for a project with filtering
app.get("/projects/:projectId/events", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    const filter = c.req.query("filter") || "all";
    const timeRange = c.req.query("timeRange") || "24h";
    const limit = parseInt(c.req.query("limit") || "100");
    const offset = parseInt(c.req.query("offset") || "0");
    
    // Calculate time range filter
    let timeFilter = "";
    const now = new Date();
    
    switch (timeRange) {
      case "7d":
        timeFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case "30d":
        timeFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case "24h":
      default:
        timeFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        break;
    }
    
    // Build query based on filter
    let query = `
      SELECT e.*, u.name as user_name, u.email as user_email
      FROM events e
      LEFT JOIN users u ON e.user_id = u.id
      WHERE e.project_id = ? AND e.timestamp >= ?
    `;
    
    if (filter !== "all") {
      query += ` AND e.type = ?`;
    }
    
    query += ` ORDER BY e.timestamp DESC LIMIT ? OFFSET ?`;
    
    // Execute query with appropriate parameters
    let results;
    if (filter !== "all") {
      results = await c.env.DB.prepare(query)
        .bind(projectId, timeFilter, filter, limit, offset)
        .all();
    } else {
      results = await c.env.DB.prepare(query)
        .bind(projectId, timeFilter, limit, offset)
        .all();
    }
    
    // Transform results to match ActivityItem interface
    const events = results.results.map((event: any) => ({
      id: event.id,
      type: event.type,
      user: {
        name: event.user_name || "Unknown",
        email: event.user_email || "unknown@example.com",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${event.user_email || event.user_id}`
      },
      timestamp: new Date(event.timestamp),
      description: event.metadata ? JSON.parse(event.metadata).description : "",
      details: event.metadata ? JSON.parse(event.metadata).details : ""
    }));
    
    return c.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return c.json({ error: "Failed to fetch events" }, 500);
  }
});

// Create a new event
app.post("/events", async (c) => {
  try {
    const eventData = await c.req.json();
    
    // Validate required fields
    if (!eventData.type || !eventData.project_id) {
      return c.json({ error: "Event type and project ID are required" }, 400);
    }
    
    const eventId = `event-${Date.now()}`;
    const now = new Date().toISOString();
    
    // Prepare metadata as JSON string
    const metadata = JSON.stringify({
      description: eventData.description || "",
      details: eventData.details || ""
    });
    
    const { success } = await c.env.DB.prepare(`
      INSERT INTO events (
        id, type, user_id, project_id, timestamp, metadata, status, ip_address, user_agent
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      eventId,
      eventData.type,
      eventData.user_id || null,
      eventData.project_id,
      now,
      metadata,
      eventData.status || "success",
      eventData.ip_address || c.req.header("cf-connecting-ip") || "unknown",
      eventData.user_agent || c.req.header("user-agent") || ""
    ).run();
    
    if (!success) {
      throw new Error("Failed to insert event");
    }
    
    // Get the newly created event
    const { results } = await c.env.DB.prepare("SELECT * FROM events WHERE id = ?")
      .bind(eventId)
      .all();
    
    return c.json(results[0], 201);
  } catch (error) {
    console.error("Error creating event:", error);
    return c.json({ error: "Failed to create event" }, 500);
  }
});

export default app;
17. Implementing API Key Management with D1
typescript
Download
Copy code
// functions/api/api-keys.ts
import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";
import { createHash, randomBytes } from "crypto";

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// Generate a secure API key
function generateApiKey(): string {
  return `pk_${randomBytes(16).toString('hex')}_${randomBytes(16).toString('hex')}`;
}

// Get API keys for a project
app.get("/projects/:projectId/api-keys", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM api_keys WHERE project_id = ? ORDER BY created_at DESC
    `).bind(projectId).all();
    
    // Mask API keys for security
    const maskedResults = results.map((key: any) => ({
      ...key,
      key: `${key.key.substring(0, 8)}...${key.key.substring(key.key.length - 4)}`
    }));
    
    return c.json(maskedResults);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return c.json({ error: "Failed to fetch API keys" }, 500);
  }
});

// Create a new API key
app.post("/projects/:projectId/api-keys", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    const { name } = await c.req.json();
    
    if (!name) {
      return c.json({ error: "API key name is required" }, 400);
    }
    
    // Check if project exists
    const { results: projectResults } = await c.env.DB.prepare(`
      SELECT * FROM projects WHERE id = ?
    `).bind(projectId).all();
    
    if (projectResults.length === 0) {
      return c.json({ error: "Project not found" }, 404);
    }
    
    const keyId = `key-${Date.now()}`;
    const apiKey = generateApiKey();
    const now = new Date().toISOString();
    
    const { success } = await c.env.DB.prepare(`
      INSERT INTO api_keys (id, name, key, project_id, created_at, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      keyId,
      name,
      apiKey,
      projectId,
      now,
      "active"
    ).run();
    
    if (!success) {
      throw new Error("Failed to insert API key");
    }
    
    // Log the event
    await c.env.DB.prepare(`
      INSERT INTO events (
        id, type, user_id, project_id, timestamp, metadata, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      `event-${Date.now()}`,
      "api_key",
      c.get("jwtPayload")?.sub || null,
      projectId,
      now,
      JSON.stringify({
        description: "API key generated",
        details: `Key ID: ${keyId}`
      }),
      "success"
    ).run();
    
    // Return the full key only once
    return c.json({
      id: keyId,
      name,
      key: apiKey,
      project_id: projectId,
      created_at: now,
      last_used: null,
      status: "active"
    }, 201);
  } catch (error) {
    console.error("Error creating API key:", error);
    return c.json({ error: "Failed to create API key" }, 500);
  }
});

// Revoke an API key
app.put("/api-keys/:id/revoke", async (c) => {
  try {
    const keyId = c.req.param("id");
    
    // Check if key exists
    const { results: keyResults } = await c.env.DB.prepare(`
      SELECT * FROM api_keys WHERE id = ?
    `).bind(keyId).all();
    
    if (keyResults.length === 0) {
      return c.json({ error: "API key not found" }, 404);
    }
    
    const { success } = await c.env.DB.prepare(`
      UPDATE api_keys SET status = ? WHERE id = ?
    `).bind("expired", keyId).run();
    
    if (!success) {
      throw new Error("Failed to revoke API key");
    }
    
    // Log the event
    await c.env.DB.prepare(`
      INSERT INTO events (
        id, type, user_id, project_id, timestamp, metadata, status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      `event-${Date.now()}`,
      "api_key",
      c.get("jwtPayload")?.sub || null,
      keyResults[0].project_id,
      new Date().toISOString(),
      JSON.stringify({
        description: "API key revoked",
        details: `Key ID: ${keyId}`
      }),
      "success"
    ).run();
    
    return c.json({ success: true, message: "API key revoked successfully" });
  } catch (error) {
    console.error("Error revoking API key:", error);
    return c.json({ error: "Failed to revoke API key" }, 500);
  }
});

export default app;
18. Implementing Analytics Dashboard with D1
typescript
Download
Copy code
// functions/api/analytics.ts
import { Hono } from "hono";
import { D1Database } from "@cloudflare/workers-types";

interface Env {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Env }>();

// Get analytics summary for a project
app.get("/projects/:projectId/analytics", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    const timeRange = c.req.query("timeRange") || "24h";
    
    // Calculate time range filter
    let timeFilter = "";
    const now = new Date();
    
    switch (timeRange) {
      case "7d":
        timeFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case "30d":
        timeFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
        break;
      case "24h":
      default:
        timeFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        break;
    }
    
    // Get total users count
    const totalUsersQuery = await c.env.DB.prepare(`
      SELECT COUNT(DISTINCT user_id) as count
      FROM events
      WHERE project_id = ? AND user_id IS NOT NULL
    `).bind(projectId).all();
    
    const totalUsers = totalUsersQuery.results[0]?.count || 0;
    
    // Get active users count (users with events in the time range)
    const activeUsersQuery = await c.env.DB.prepare(`
      SELECT COUNT(DISTINCT user_id) as count
      FROM events
      WHERE project_id = ? AND timestamp >= ? AND user_id IS NOT NULL
    `).bind(projectId, timeFilter).all();
    
    const activeUsers = activeUsersQuery.results[0]?.count || 0;
    
    // Get new users count (users who signed up in the time range)
    const newUsersQuery = await c.env.DB.prepare(`
      SELECT COUNT(*) as count
      FROM events
      WHERE project_id = ? AND timestamp >= ? AND type = 'signup' AND status = 'success'
    `).bind(projectId, timeFilter).all();
    
    const newUsers = newUsersQuery.results[0]?.count || 0;
    
    // Get successful logins count
    const successfulLoginsQuery = await c.env.DB.prepare(`
      SELECT COUNT(*) as count
      FROM events
      WHERE project_id = ? AND timestamp >= ? AND type = 'login' AND status = 'success'
    `).bind(projectId, timeFilter).all();
    
    const successfulLogins = successfulLoginsQuery.results[0]?.count || 0;
    
    // Get failed logins count
    const failedLoginsQuery = await c.env.DB.prepare(`
      SELECT COUNT(*) as count
      FROM events
      WHERE project_id = ? AND timestamp >= ? AND type = 'login' AND status = 'failure'
    `).bind(projectId, timeFilter).all();
    
    const failedLogins = failedLoginsQuery.results[0]?.count || 0;
    
    // Get signups count
    const signupsQuery = await c.env.DB.prepare(`
      SELECT COUNT(*) as count
      FROM events
      WHERE project_id = ? AND timestamp >= ? AND type = 'signup'
    `).bind(projectId, timeFilter).all();
    
    const signups = signupsQuery.results[0]?.count || 0;
    
    return c.json({
      totalUsers,
      activeUsers,
      newUsers,
      successfulLogins,
      failedLogins,
      signups,
      timeRange
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return c.json({ error: "Failed to fetch analytics" }, 500);
  }
});

// Get daily login statistics for a project
app.get("/projects/:projectId/analytics/daily", async (c) => {
  try {
    const projectId = c.req.param("projectId");
    const days = parseInt(c.req.query("days") || "7");
    
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Get daily login counts
    const query = `
      WITH RECURSIVE dates(date) AS (
        VALUES(?)
        UNION ALL
        SELECT date(date, '+1 day')
        FROM dates
        WHERE date < ?
      )
      SELECT 
        dates.date as day,
        COUNT(CASE WHEN e.type = 'login' AND e.status = 'success' THEN 1 END) as successful_logins,
        COUNT(CASE WHEN e.type = 'login' AND e.status = 'failure' THEN 1 END) as failed_logins,
        COUNT(CASE WHEN e.type = 'signup' AND e.status = 'success' THEN 1 END) as signups
      FROM dates
      LEFT JOIN events e ON date(e.timestamp) = dates.date AND e.project_id = ?
      GROUP BY dates.date
      ORDER BY dates.date
    `;
    
    const { results } = await c.env.DB.prepare(query)
      .bind(
        startDate.toISOString().split('T')[0],
        endDate.toISOString().split('T')[0],
        projectId
      )
      .all();
    
    return c.json(results);
  } catch (error) {
    console.error("Error fetching daily analytics:", error);
    return c.json({ error: "Failed to fetch daily analytics" }, 500);
  }
});

export default app;
19. Main API Router Implementation
typescript
Download
Copy code
// functions/api/[[route]].ts
import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

// Import sub-routers
import authRouter from "./auth";
import projectsRouter from "./projects";
import usersRouter from "./users";
import apiKeysRouter from "./api-keys";
import eventsRouter from "./events";
import emailTemplatesRouter from "./email-templates";
import analyticsRouter from "./analytics";
import databaseRouter from "./database";

// Create main Hono app
const app = new Hono();

// Middleware
app.use("*", logger());
app.use("*", secureHeaders());
app.use("*", cors());

// JWT auth middleware (except for auth routes and health check)
app.use("/api/*", async (c, next) => {
  // Skip auth for these routes
  if (
    c.req.path.startsWith("/api/auth") ||
    c.req.path === "/api" ||
    c.req.path === "/api/health"
  ) {
    return next();
  }
  
  // Use JWT middleware with secret from env
  return jwt({
    secret: c.env.JWT_SECRET || "your-secret-key",
  })(c, next);
});

// Health check
app.get("/api", (c) => {
  return c.json({
    status: "ok",
    message: "Auth Platform API is running",
    version: "1.0.0"
  });
});

// Mount sub-routers
app.route("/api/auth", authRouter);
app.route("/api/projects", projectsRouter);
app.route("/api/users", usersRouter);
app.route("/api", apiKeysRouter);
app.route("/api", eventsRouter);
app.route("/api", emailTemplatesRouter);
app.route("/api", analyticsRouter);
app.route("/api/admin/database", databaseRouter);

// Export for Cloudflare Pages Functions
export const onRequest = app.fetch;
20. Cloudflare Pages Deployment Configuration
toml
Download
Copy code
# wrangler.toml
name = "auth-platform"
compatibility_date = "2023-01-01"
workers_dev = true

[
site
]
bucket = "./dist"
entry-point = "functions"

[
build
]
command = "npm run build"

[
env.production
]
name = "auth-platform-prod"
route = "auth.yourdomain.com/*"

# D1 Database binding
[[
d1_databases
]]
binding = "DB"
database_name = "auth_platform_db"
database_id = "your-d1-database-id"

# KV namespace binding (for session management)
[[
kv_namespaces
]]
binding = "AUTH_SESSIONS"
id = "your-kv-namespace-id"

# Environment variables
[
vars
]
JWT_SECRET = "your-jwt-secret-key"
RESEND_API_KEY = "your-resend-api-key"
21. Frontend Integration with Real API
typescript
Download
Copy code
// src/lib/client.ts
// Update the flag to use real API
export const USE_REAL_API = true;

// Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Helper function to make API requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
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

    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "An error occurred");
      }
      
      return data;
    } else {
      if (!response.ok) {
        throw new Error("An error occurred");
      }
      
      return { success: true };
    }
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
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

  // Email Templates
  getEmailTemplates: (projectId: string) => {
    return apiRequest(`/projects/${projectId}/email-templates`);
  },

  createEmailTemplate: (projectId: string, template: any) => {
    return apiRequest(`/projects/${projectId}/email-templates`, {
      method: "POST",
      body: JSON.stringify(template),
    });
  },

  updateEmailTemplate: (templateId: string, template: any) => {
    return apiRequest(`/email-templates/${templateId}`, {
      method: "PUT",
      body: JSON.stringify(template),
    });
  },

  // Analytics
  getEvents: (projectId: string, filter = "all", timeRange = "24h", limit = 100, offset = 0) => {
    return apiRequest(
      `/projects/${projectId}/events?filter=${filter}&timeRange=${timeRange}&limit=${limit}&offset=${offset}`,
    );
  },

  getAnalytics: (projectId: string, timeRange = "24h") => {
    return apiRequest(
      `/projects/${projectId}/analytics?timeRange=${timeRange}`,
    );
  },

  getDailyAnalytics: (projectId: string, days = 7) => {
    return apiRequest(
      `/projects/${projectId}/analytics/daily?days=${days}`,
    );
  },
};
