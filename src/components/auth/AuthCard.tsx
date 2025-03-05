import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export type AuthView =
  | "login"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "mfa-verification"
  | "email-verification";

interface AuthCardProps {
  initialView?: AuthView;
  onLogin?: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
  onSignup?: (data: {
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => Promise<void>;
  onForgotPassword?: (email: string) => Promise<void>;
  onResetPassword?: (password: string) => Promise<void>;
  onVerifyMfa?: (code: string) => Promise<void>;
  onResendVerification?: () => Promise<void>;
  resetToken?: string;
  userEmail?: string;
  error?: string;
  loading?: boolean;
}

const AuthCard = ({
  initialView = "login",
  onLogin = async () => {},
  onSignup = async () => {},
  onForgotPassword = async () => {},
  onResetPassword = async () => {},
  onVerifyMfa = async () => {},
  onResendVerification = async () => {},
  resetToken = "",
  userEmail = "",
  error = "",
  loading = false,
}: AuthCardProps) => {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [email, setEmail] = useState(userEmail);
  const [authError, setAuthError] = useState(error);
  const [isLoading, setIsLoading] = useState(loading);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");

  // Animation variants for smooth transitions
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  // Track animation direction for slide effect
  const [direction, setDirection] = useState(0);

  const changeView = (view: AuthView, dir: number = 0) => {
    setDirection(dir);
    setCurrentView(view);
  };

  // Handle login submission
  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setEmail(data.email);
    setIsLoading(true);
    setAuthError("");

    try {
      await onLogin(data);
      // Successful login would typically redirect or be handled by the parent component
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup submission
  const handleSignup = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => {
    setEmail(data.email);
    setIsLoading(true);
    setAuthError("");

    try {
      await onSignup(data);
      changeView("email-verification", 1);
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Failed to create account",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password submission
  const handleForgotPassword = async (email: string) => {
    setEmail(email);
    setIsLoading(true);
    setAuthError("");

    try {
      await onForgotPassword(email);
      // Show success message or transition to a "check your email" view
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Failed to send reset email",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle reset password submission
  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setAuthError("");

    try {
      await onResetPassword(password);
      changeView("login", -1);
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Failed to reset password",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle MFA verification
  const handleVerifyMfa = async () => {
    setIsLoading(true);
    setAuthError("");

    try {
      await onVerifyMfa(mfaCode);
      // Successful verification would typically redirect
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Failed to verify code",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Render the appropriate form based on current view
  const renderAuthForm = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={() => changeView("forgot-password", 1)}
            isLoading={isLoading}
            error={authError}
          />
        );
      case "signup":
        return (
          <SignupForm
            onSubmit={handleSignup}
            onLoginClick={() => changeView("login", -1)}
            loading={isLoading}
          />
        );
      case "forgot-password":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
              Reset Password
            </h2>
            <p className="mb-4 text-muted-foreground dark:text-gray-300">
              Enter your email to receive a password reset link
            </p>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => changeView("login", -1)}
                  className="text-sm"
                >
                  Back to login
                </Button>
                <Button
                  onClick={() => handleForgotPassword(email)}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </div>
              {authError && (
                <p className="text-destructive text-sm">{authError}</p>
              )}
            </div>
          </div>
        );
      case "reset-password":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
              Set New Password
            </h2>
            <p className="mb-4 text-muted-foreground dark:text-gray-300">
              Create a new password for your account
            </p>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => changeView("login", -1)}
                  className="text-sm"
                >
                  Back to login
                </Button>
                <Button
                  onClick={handleResetPassword}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
              {authError && (
                <p className="text-destructive text-sm">{authError}</p>
              )}
            </div>
          </div>
        );
      case "mfa-verification":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
              Two-Factor Authentication
            </h2>
            <p className="mb-4 text-muted-foreground dark:text-gray-300">
              Enter the verification code sent to your device
            </p>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="6-digit code"
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value)}
                maxLength={6}
              />
              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  onClick={() => changeView("login", -1)}
                  className="text-sm"
                >
                  Back to login
                </Button>
                <Button
                  onClick={handleVerifyMfa}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
              </div>
              <Button
                variant="link"
                onClick={onResendVerification}
                className="text-sm w-full"
              >
                Resend code
              </Button>
              {authError && (
                <p className="text-destructive text-sm">{authError}</p>
              )}
            </div>
          </div>
        );
      case "email-verification":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
              Verify Your Email
            </h2>
            <p className="mb-4 text-muted-foreground dark:text-gray-300">
              We've sent a verification link to {email}
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                Please check your inbox and click the verification link to
                complete your registration.
              </p>
              <Button
                variant="link"
                onClick={onResendVerification}
                className="text-sm w-full"
              >
                Resend verification email
              </Button>
              <Button
                variant="ghost"
                onClick={() => changeView("signup", -1)}
                className="text-sm w-full"
              >
                Use a different email
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <LoginForm
            onSubmit={handleLogin}
            onForgotPassword={() => changeView("forgot-password", 1)}
            isLoading={isLoading}
            error={authError}
          />
        );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-card dark:bg-gray-800 shadow-lg border border-border dark:border-gray-700">
      <CardContent className="p-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentView}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {renderAuthForm()}
          </motion.div>
        </AnimatePresence>

        {/* Footer with links to switch between login and signup */}
        {(currentView === "login" || currentView === "signup") && (
          <div className="p-6 text-center border-t border-border dark:border-gray-700">
            {currentView === "login" ? (
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                Don't have an account?{" "}
                <button
                  onClick={() => changeView("signup", 1)}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground dark:text-gray-300">
                Already have an account?{" "}
                <button
                  onClick={() => changeView("login", -1)}
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AuthCard;
