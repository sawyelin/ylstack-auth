import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  User,
  AuthResponse,
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  resetPassword,
  updatePassword,
  verifyEmail,
} from "../lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    email: string,
    password: string,
    name?: string,
  ) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetUserPassword: (password: string) => Promise<boolean>;
  verifyUserEmail: (token: string) => Promise<boolean>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Error checking authentication:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn(email, password);

      if (response.error) {
        setError(response.error.message);
      } else if (response.user) {
        setUser(response.user);
      }

      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return { user: null, session: null, error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name?: string,
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signUp(email, password, name);

      if (response.error) {
        setError(response.error.message);
      } else if (response.user) {
        // Don't set user here as they need to verify email first
      }

      return response;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return { user: null, session: null, error: new Error(errorMessage) };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut();
      setUser(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await resetPassword(email);
      if (!success) {
        setError("Failed to send password reset email");
      }
      return success;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetUserPassword = async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await updatePassword(password);
      if (!success) {
        setError("Failed to reset password");
      }
      return success;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyUserEmail = async (token: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await verifyEmail(token);
      if (!success) {
        setError("Failed to verify email");
      } else {
        // Refresh user data after verification
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      }
      return success;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
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
    user,
    isLoading,
    error,
    login,
    signup,
    logout,
    forgotPassword,
    resetUserPassword,
    verifyUserEmail,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
