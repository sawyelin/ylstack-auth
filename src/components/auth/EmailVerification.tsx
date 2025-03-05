import React from "react";
import { Button } from "@/components/ui/button";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";
import { Mail, ArrowLeft, RefreshCw } from "lucide-react";

interface EmailVerificationProps {
  email: string;
  onResendVerification: () => Promise<void>;
  onChangeEmail: () => void;
  loading?: boolean;
}

const EmailVerification = ({
  email,
  onResendVerification,
  onChangeEmail,
  loading = false,
}: EmailVerificationProps) => {
  return (
    <div className="p-6 bg-card dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-blue-100/80 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <Mail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white text-center">
        Verify Your Email
      </h2>
      <p className="mb-2 text-muted-foreground dark:text-gray-300 text-center">
        We've sent a verification link to{" "}
        <strong className="text-foreground dark:text-white">{email}</strong>
      </p>
      <p className="mb-6 text-sm text-muted-foreground dark:text-gray-400 text-center">
        Please check your inbox and click the verification link to complete your
        registration. If you don't see the email, check your spam folder.
      </p>

      <div className="space-y-3">
        <ShimmerEffect>
          <Button
            onClick={onResendVerification}
            disabled={loading}
            className="w-full bg-primary/90 dark:bg-primary/80 text-primary-foreground hover:bg-primary/70 dark:hover:bg-primary/60 flex items-center justify-center"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Resend verification email"
            )}
          </Button>
        </ShimmerEffect>

        <Button
          variant="outline"
          onClick={onChangeEmail}
          className="w-full border-border dark:border-gray-700 text-foreground dark:text-gray-200 bg-background dark:bg-gray-900 flex items-center justify-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Use a different email
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;
