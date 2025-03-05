import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

interface LoginFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => Promise<void>;
  onForgotPassword: () => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm = ({
  onSubmit,
  onForgotPassword,
  isLoading = false,
  error = "",
}: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ email, password, rememberMe });
  };

  return (
    <div className="p-6 bg-card dark:bg-gray-800/90 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
        Sign in to your account
      </h2>
      <p className="mb-6 text-muted-foreground dark:text-gray-300">
        Enter your credentials to access your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground dark:text-gray-200">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground dark:text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-background dark:bg-gray-900 border-border dark:border-gray-700 pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-foreground dark:text-gray-200"
            >
              Password
            </Label>
            <Button
              variant="link"
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-primary dark:text-primary p-0 h-auto"
            >
              Forgot password?
            </Button>
          </div>
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
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="remember"
            className="text-sm text-muted-foreground dark:text-gray-300 cursor-pointer"
          >
            Remember me for 30 days
          </Label>
        </div>

        {error && (
          <p className="text-sm text-destructive dark:text-red-400">{error}</p>
        )}

        <ShimmerEffect>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary/90 dark:bg-primary/80 text-primary-foreground hover:bg-primary/70 dark:hover:bg-primary/60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </ShimmerEffect>
      </form>
    </div>
  );
};

export default LoginForm;
