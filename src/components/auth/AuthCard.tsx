import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";
import MfaVerification from "./MfaVerification";
import EmailVerification from "./EmailVerification";

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
          <ForgotPasswordForm
            onSubmit={handleForgotPassword}
            onBackToLogin={() => changeView("login", -1)}
            loading={isLoading}
            error={authError}
          />
        );
      case "reset-password":
        return (
          <ResetPasswordForm
            onSubmit={async ({ password, confirmPassword }) => {
              setPassword(password);
              setConfirmPassword(confirmPassword);
              await handleResetPassword();
            }}
            onBackToLogin={() => changeView("login", -1)}
            loading={isLoading}
            error={authError}
          />
        );
      case "mfa-verification":
        return (
          <MfaVerification
            onVerify={async (code) => {
              setMfaCode(code);
              await handleVerifyMfa();
            }}
            onResendCode={onResendVerification}
            onBackToLogin={() => changeView("login", -1)}
            loading={isLoading}
            error={authError}
          />
        );
      case "email-verification":
        return (
          <EmailVerification
            email={email}
            onResendVerification={onResendVerification}
            onChangeEmail={() => changeView("signup", -1)}
            loading={isLoading}
          />
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
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-card/95 dark:bg-gray-800/95 shadow-lg border border-border/80 dark:border-gray-700/80 backdrop-blur-md">
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
          <div className="p-6 text-center border-t border-border/80 dark:border-gray-700/80">
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
