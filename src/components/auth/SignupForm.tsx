import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";

interface SignupFormProps {
  onSubmit: (data: {
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => Promise<void>;
  onLoginClick: () => void;
  loading?: boolean;
  error?: string;
}

const SignupForm = ({
  onSubmit,
  onLoginClick,
  loading = false,
  error = "",
}: SignupFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formError, setFormError] = useState(error);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setFormError("You must accept the terms and conditions");
      return;
    }

    await onSubmit({ email, password, confirmPassword, acceptTerms });
  };

  return (
    <div className="p-6 bg-card dark:bg-gray-800/90 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white">
        Create an account
      </h2>
      <p className="mb-6 text-muted-foreground dark:text-gray-300">
        Enter your details to create your account
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
          <Label
            htmlFor="password"
            className="text-foreground dark:text-gray-200"
          >
            Password
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
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="confirm-password"
            className="text-foreground dark:text-gray-200"
          >
            Confirm Password
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

        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(!!checked)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-muted-foreground dark:text-gray-300 cursor-pointer"
          >
            I accept the{" "}
            <a
              href="#"
              className="text-primary hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              terms and conditions
            </a>
          </Label>
        </div>

        {formError && (
          <p className="text-sm text-destructive dark:text-red-400">
            {formError}
          </p>
        )}

        <ShimmerEffect>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary/90 dark:bg-primary/80 text-primary-foreground hover:bg-primary/70 dark:hover:bg-primary/60"
          >
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </ShimmerEffect>
      </form>
    </div>
  );
};

export default SignupForm;
