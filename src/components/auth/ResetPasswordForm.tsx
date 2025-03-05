import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";
import { Eye, EyeOff, Lock, ArrowLeft, CheckCircle } from "lucide-react";

interface ResetPasswordFormProps {
  onSubmit: (data: {
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  onBackToLogin: () => void;
  loading?: boolean;
  error?: string;
}

const ResetPasswordForm = ({
  onSubmit,
  onBackToLogin,
  loading = false,
  error = "",
}: ResetPasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(error);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (password.length < 8) {
      setFormError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    await onSubmit({ password, confirmPassword });
  };

  return (
    <div className="p-6 bg-card dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
          <Lock className="h-6 w-6 text-primary dark:text-primary-foreground" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white text-center">
        Reset Password
      </h2>
      <p className="mb-6 text-muted-foreground dark:text-gray-300 text-center">
        Enter your new password below
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-foreground dark:text-gray-200"
          >
            New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background dark:bg-gray-900 border-border dark:border-gray-700 pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground dark:text-gray-400">
            Password must be at least 8 characters long
          </p>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="text-foreground dark:text-gray-200"
          >
            Confirm New Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-background dark:bg-gray-900 border-border dark:border-gray-700 pl-10 pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
              )}
            </Button>
          </div>
        </div>

        {formError && (
          <p className="text-sm text-destructive dark:text-red-400">
            {formError}
          </p>
        )}

        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onBackToLogin}
            className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Button>

          <ShimmerEffect>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary/90 dark:bg-primary/80 text-primary-foreground hover:bg-primary/70 dark:hover:bg-primary/60"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </ShimmerEffect>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
