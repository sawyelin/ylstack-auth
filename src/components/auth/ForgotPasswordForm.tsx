import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onBackToLogin: () => void;
  loading?: boolean;
  error?: string;
  success?: string;
}

const ForgotPasswordForm = ({
  onSubmit,
  onBackToLogin,
  loading = false,
  error = "",
  success = "",
}: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email);
  };

  return (
    <div className="p-6 bg-card dark:bg-gray-800/90 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
        Reset Password
      </h2>
      <p className="mb-6 text-muted-foreground dark:text-gray-300">
        Enter your email to receive a password reset link
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground dark:text-gray-200">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background dark:bg-gray-900 border-border dark:border-gray-700"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive dark:text-red-400">{error}</p>
        )}

        {success && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {success}
          </p>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={onBackToLogin}
            className="text-muted-foreground dark:text-gray-300 hover:text-foreground dark:hover:text-white"
          >
            Back to login
          </Button>

          <ShimmerEffect>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary/90 dark:bg-primary/80 text-primary-foreground hover:bg-primary/70 dark:hover:bg-primary/60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </ShimmerEffect>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
