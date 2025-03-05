import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShimmerEffect } from "@/components/ui/shimmer-effect";
import { Shield, ArrowLeft, RefreshCw, Clock } from "lucide-react";

interface MfaVerificationProps {
  onVerify: (code: string) => Promise<void>;
  onResendCode: () => Promise<void>;
  onBackToLogin: () => void;
  loading?: boolean;
  error?: string;
}

const MfaVerification = ({
  onVerify,
  onResendCode,
  onBackToLogin,
  loading = false,
  error = "",
}: MfaVerificationProps) => {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);

  // Timer for code expiration
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time remaining
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      await onVerify(code);
    }
  };

  const handleResend = async () => {
    if (!canResend || resending) return;

    setResending(true);
    try {
      await onResendCode();
      setTimeLeft(60);
      setCanResend(false);
      setCode("");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="p-6 bg-card dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
          <Shield className="h-8 w-8 text-primary dark:text-primary-foreground" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-white text-center">
        Two-Factor Authentication
      </h2>
      <p className="mb-6 text-muted-foreground dark:text-gray-300 text-center">
        Enter the verification code sent to your device
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="code"
            className="text-foreground dark:text-gray-200 text-center block"
          >
            Verification Code
          </Label>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(e) => {
              // Only allow numbers
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length <= 6) {
                setCode(value);
              }
            }}
            maxLength={6}
            required
            className="bg-background dark:bg-gray-900 border-border dark:border-gray-700 text-center text-lg tracking-widest font-mono"
          />

          <div className="flex items-center justify-center text-sm mt-2">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground dark:text-gray-400" />
            <span className="text-muted-foreground dark:text-gray-400">
              {canResend
                ? "Code expired"
                : `Code expires in ${formatTime(timeLeft)}`}
            </span>
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive dark:text-red-400 text-center">
            {error}
          </p>
        )}

        <ShimmerEffect>
          <Button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full bg-primary/90 dark:bg-primary/80 text-primary-foreground hover:bg-primary/70 dark:hover:bg-primary/60"
          >
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </ShimmerEffect>

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

          <Button
            type="button"
            variant="link"
            onClick={handleResend}
            disabled={!canResend || resending}
            className={`${canResend && !resending ? "text-primary hover:text-primary/80" : "text-muted-foreground dark:text-gray-400"} flex items-center`}
          >
            {resending ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Resending...
              </>
            ) : (
              "Resend code"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MfaVerification;
