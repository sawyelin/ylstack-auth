import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Shield, ArrowRight, Smartphone, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface MfaVerificationProps {
  email?: string;
  onVerify?: (code: string) => void;
  onCancel?: () => void;
  onResend?: () => void;
  loading?: boolean;
  error?: string;
}

const MfaVerification = ({
  email = "user@example.com",
  onVerify = () => {},
  onCancel = () => {},
  onResend = () => {},
  loading = false,
  error = "",
}: MfaVerificationProps) => {
  const [code, setCode] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [codeValues, setCodeValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

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

  // Handle individual code input
  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newCodeValues = [...codeValues];

    // Handle paste event (multiple digits)
    if (value.length > 1) {
      const digits = value.split("").slice(0, 6);
      const newValues = [...codeValues];

      digits.forEach((digit, idx) => {
        if (idx + index < 6) {
          newValues[idx + index] = digit;
        }
      });

      setCodeValues(newValues);
      setCode(newValues.join(""));

      // Focus on the appropriate input after paste
      const focusIndex = Math.min(index + digits.length, 5);
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    // Handle single digit input
    newCodeValues[index] = value;
    setCodeValues(newCodeValues);
    setCode(newCodeValues.join(""));

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !codeValues[index] && index > 0) {
      // Focus previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length === 6) {
      onVerify(code);
    }
  };

  // Handle resend code
  const handleResend = () => {
    onResend();
    setTimeLeft(60);
    setCanResend(false);
    setCodeValues(["", "", "", "", "", ""]);
    setCode("");
    inputRefs.current[0]?.focus();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md border border-gray-200">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Two-Factor Authentication
        </CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Smartphone className="mr-2 h-5 w-5 text-muted-foreground" />
                <Label htmlFor="code" className="text-muted-foreground">
                  Authentication Code
                </Label>
              </div>

              <div className="flex justify-center gap-2">
                {codeValues.map((value, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={6} // Allow paste of full code
                    value={value}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-12 text-center text-lg font-semibold"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive text-center"
                >
                  {error}
                </motion.p>
              )}

              <div className="flex items-center justify-center text-sm">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {canResend
                    ? "Code expired"
                    : `Code expires in ${formatTime(timeLeft)}`}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={code.length !== 6 || loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center">
                  Verify Code
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col space-y-4 pt-4">
        <div className="flex justify-between w-full text-sm">
          <Button
            variant="link"
            onClick={onCancel}
            className="px-0 text-muted-foreground"
          >
            Back to login
          </Button>

          <Button
            variant="link"
            onClick={handleResend}
            disabled={!canResend}
            className={`px-0 ${canResend ? "text-primary" : "text-muted-foreground"}`}
          >
            Resend code
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default MfaVerification;
