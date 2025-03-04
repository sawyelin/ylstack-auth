import { supabase } from "./supabase";

// Configuration flag to enable/disable real analytics
export const USE_REAL_ANALYTICS = false;

// Analytics data types
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

export interface AnalyticsSummary {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  successfulLogins: number;
  failedLogins: number;
  signups: number;
  timeRange: string;
}

/**
 * Track an authentication event
 * @param event Authentication event data
 * @returns Success status
 */
export async function trackEvent(
  event: Omit<AuthEvent, "id" | "timestamp">,
): Promise<boolean> {
  if (!USE_REAL_ANALYTICS) {
    // Add to mock data
    mockEvents.push({
      ...event,
      id: `event-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
    });
    return true;
  }

  try {
    const { error } = await supabase.from("auth_events").insert({
      type: event.type,
      user_id: event.userId,
      project_id: event.projectId,
      metadata: event.metadata,
      status: event.status,
      ip_address: event.ipAddress,
      user_agent: event.userAgent,
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error tracking event:", error);
    return false;
  }
}

/**
 * Get authentication events for a project
 * @param projectId Project ID
 * @param limit Maximum number of events to return
 * @param offset Offset for pagination
 * @returns Array of authentication events
 */
export async function getEvents(
  projectId: string,
  limit: number = 100,
  offset: number = 0,
): Promise<AuthEvent[]> {
  if (!USE_REAL_ANALYTICS) {
    // Return mock data
    return mockEvents
      .filter((event) => event.projectId === projectId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      )
      .slice(offset, offset + limit);
  }

  try {
    const { data, error } = await supabase
      .from("auth_events")
      .select("*")
      .eq("project_id", projectId)
      .order("timestamp", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data as AuthEvent[];
  } catch (error) {
    console.error(`Error fetching events for project ${projectId}:`, error);
    return [];
  }
}

/**
 * Get analytics summary for a project
 * @param projectId Project ID
 * @param timeRange Time range for analytics (e.g., '24h', '7d', '30d')
 * @returns Analytics summary
 */
export async function getAnalyticsSummary(
  projectId: string,
  timeRange: string = "24h",
): Promise<AnalyticsSummary> {
  if (!USE_REAL_ANALYTICS) {
    // Calculate mock summary based on mock events
    const now = new Date();
    let startDate: Date;

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

    return {
      totalUsers: 5000, // Mock total users
      activeUsers: uniqueUserIds.size,
      newUsers: signups,
      successfulLogins,
      failedLogins,
      signups,
      timeRange,
    };
  }

  try {
    // In a real implementation, this would query the database for analytics
    // For now, we'll return mock data
    return {
      totalUsers: 5000,
      activeUsers: 3200,
      newUsers: 120,
      successfulLogins: 8500,
      failedLogins: 150,
      signups: 120,
      timeRange,
    };
  } catch (error) {
    console.error(
      `Error fetching analytics summary for project ${projectId}:`,
      error,
    );
    return {
      totalUsers: 0,
      activeUsers: 0,
      newUsers: 0,
      successfulLogins: 0,
      failedLogins: 0,
      signups: 0,
      timeRange,
    };
  }
}

// Mock events for development and testing
const mockEvents: AuthEvent[] = [
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
