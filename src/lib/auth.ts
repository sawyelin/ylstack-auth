import { supabase } from "./supabase";

// Configuration flag to enable/disable real authentication
export const USE_REAL_AUTH = false;

// Types for authentication
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

export interface AuthResponse {
  user: User | null;
  session: any | null;
  error: Error | null;
}

/**
 * Sign up a new user
 * @param email User email
 * @param password User password
 * @param name User's full name
 * @returns AuthResponse with user data or error
 */
export async function signUp(
  email: string,
  password: string,
  name?: string,
): Promise<AuthResponse> {
  if (!USE_REAL_AUTH) {
    // Mock signup process
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return {
        user: null,
        session: null,
        error: new Error("User with this email already exists"),
      };
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: name || email.split("@")[0],
      created_at: new Date().toISOString(),
      role: "user",
      status: "pending", // Requires email verification
    };

    mockUsers.push(newUser);

    return {
      user: newUser,
      session: null, // No session until email verification
      error: null,
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split("@")[0],
          role: "user",
          status: "pending",
        },
      },
    });

    if (error) throw error;

    return {
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email || "",
            name: data.user.user_metadata?.name,
            created_at: data.user.created_at || new Date().toISOString(),
            role: data.user.user_metadata?.role || "user",
            status: data.user.user_metadata?.status || "pending",
          }
        : null,
      session: data.session,
      error: null,
    };
  } catch (error) {
    console.error("Error signing up:", error);
    return {
      user: null,
      session: null,
      error:
        error instanceof Error
          ? error
          : new Error("Unknown error during signup"),
    };
  }
}

/**
 * Sign in a user
 * @param email User email
 * @param password User password
 * @returns AuthResponse with user data or error
 */
export async function signIn(
  email: string,
  password: string,
): Promise<AuthResponse> {
  if (!USE_REAL_AUTH) {
    // Mock signin process
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      return {
        user: null,
        session: null,
        error: new Error("User not found"),
      };
    }

    if (user.status === "blocked") {
      return {
        user: null,
        session: null,
        error: new Error("User account is blocked"),
      };
    }

    if (user.status === "pending") {
      return {
        user: null,
        session: null,
        error: new Error("Please verify your email before signing in"),
      };
    }

    // Update last sign in
    user.last_sign_in = new Date().toISOString();

    return {
      user,
      session: { expires_at: Date.now() + 86400000 }, // 24 hours from now
      error: null,
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Update user's last sign in time
    if (data.user) {
      await supabase.auth.updateUser({
        data: {
          last_sign_in: new Date().toISOString(),
        },
      });
    }

    return {
      user: data.user
        ? {
            id: data.user.id,
            email: data.user.email || "",
            name: data.user.user_metadata?.name,
            avatar_url: data.user.user_metadata?.avatar_url,
            created_at: data.user.created_at || "",
            last_sign_in: new Date().toISOString(),
            role: data.user.user_metadata?.role || "user",
            status: data.user.user_metadata?.status || "active",
          }
        : null,
      session: data.session,
      error: null,
    };
  } catch (error) {
    console.error("Error signing in:", error);
    return {
      user: null,
      session: null,
      error:
        error instanceof Error
          ? error
          : new Error("Unknown error during signin"),
    };
  }
}

/**
 * Sign out the current user
 * @returns Success status
 */
export async function signOut(): Promise<boolean> {
  if (!USE_REAL_AUTH) {
    // Mock signout process - nothing to do for mock data
    return true;
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error signing out:", error);
    return false;
  }
}

/**
 * Reset password request
 * @param email User email
 * @returns Success status
 */
export async function resetPassword(email: string): Promise<boolean> {
  if (!USE_REAL_AUTH) {
    // Mock password reset process
    const user = mockUsers.find((u) => u.email === email);
    return !!user; // Return true if user exists
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error resetting password:", error);
    return false;
  }
}

/**
 * Update user password
 * @param password New password
 * @returns Success status
 */
export async function updatePassword(password: string): Promise<boolean> {
  if (!USE_REAL_AUTH) {
    // Mock update password process - nothing to do for mock data
    return true;
  }

  try {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating password:", error);
    return false;
  }
}

/**
 * Verify email address
 * @param token Verification token
 * @returns Success status
 */
export async function verifyEmail(token: string): Promise<boolean> {
  if (!USE_REAL_AUTH) {
    // Mock email verification process
    // In a real app, this would use the token to identify the user
    // For mock purposes, we'll just update the first pending user
    const pendingUser = mockUsers.find((u) => u.status === "pending");
    if (pendingUser) {
      pendingUser.status = "active";
      return true;
    }
    return false;
  }

  try {
    // In a real implementation, this would verify the token with Supabase
    // For now, we'll assume the token is valid and the user is already verified
    // by the time they click the link in their email
    return true;
  } catch (error) {
    console.error("Error verifying email:", error);
    return false;
  }
}

/**
 * Get current user
 * @returns Current user or null
 */
export async function getCurrentUser(): Promise<User | null> {
  if (!USE_REAL_AUTH) {
    // Mock get current user - return first active user for demo
    return mockUsers.find((u) => u.status === "active") || null;
  }

  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;

    if (!data.user) return null;

    return {
      id: data.user.id,
      email: data.user.email || "",
      name: data.user.user_metadata?.name,
      avatar_url: data.user.user_metadata?.avatar_url,
      created_at: data.user.created_at || "",
      last_sign_in: data.user.user_metadata?.last_sign_in,
      role: data.user.user_metadata?.role || "user",
      status: data.user.user_metadata?.status || "active",
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Mock users for development and testing
const mockUsers: User[] = [
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
