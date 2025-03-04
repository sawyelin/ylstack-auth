import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface EmailVerificationProps {
  email?: string;
  onResendVerification?: () => Promise<void>;
  onChangeEmail?: () => void;
  verificationStatus?: "pending" | "success" | "error";
  errorMessage?: string;
}

const EmailVerification = ({
  email = "user@example.com",
  onResendVerification = async () => {},
  onChangeEmail = () => {},
  verificationStatus = "pending",
  errorMessage = "We couldn't verify your email. Please try again.",
}: EmailVerificationProps) => {
  const [isResending, setIsResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [showResendSuccess, setShowResendSuccess] = useState(false);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await onResendVerification();
      setResendCount(resendCount + 1);
      setShowResendSuccess(true);
      setTimeout(() => setShowResendSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to resend verification email", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-md">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-2">
          {verificationStatus === "pending" && (
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
              <Mail className="h-8 w-8 text-blue-500" />
            </div>
          )}
          {verificationStatus === "success" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center"
            >
              <CheckCircle className="h-8 w-8 text-green-500" />
            </motion.div>
          )}
          {verificationStatus === "error" && (
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          )}
        </div>
        <h3 className="text-xl font-semibold">
          {verificationStatus === "pending" && "Verify your email"}
          {verificationStatus === "success" && "Email verified!"}
          {verificationStatus === "error" && "Verification failed"}
        </h3>
        <p className="text-sm text-gray-500">
          {verificationStatus === "pending" &&
            `We've sent a verification link to ${email}`}
          {verificationStatus === "success" &&
            "Your email has been successfully verified."}
          {verificationStatus === "error" && errorMessage}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {verificationStatus === "pending" && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                Please check your inbox and click on the verification link to
                complete your registration. If you don't see the email, check
                your spam folder.
              </p>
            </div>

            {showResendSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-green-50 p-3 rounded-md flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                <p className="text-sm text-green-700">
                  Verification email resent successfully!
                </p>
              </motion.div>
            )}

            <div className="pt-2">
              <Label className="text-sm text-gray-500 block mb-1">
                Didn't receive the email?
              </Label>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResendVerification}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    Resend verification email
                    {resendCount > 0 ? ` (${resendCount})` : ""}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-sm text-green-700">
              You can now access all features of your account. Click the button
              below to continue to your dashboard.
            </p>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-700">
                There was a problem verifying your email. This could be because
                the verification link has expired or is invalid.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResendVerification}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>Resend verification email</>
              )}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {verificationStatus === "pending" && (
          <Button
            variant="ghost"
            className="w-full text-sm"
            onClick={onChangeEmail}
          >
            Change email address
          </Button>
        )}

        {verificationStatus === "success" && (
          <Button className="w-full">Continue to Dashboard</Button>
        )}

        {verificationStatus === "error" && (
          <Button
            variant="ghost"
            className="w-full text-sm"
            onClick={onChangeEmail}
          >
            Use a different email
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EmailVerification;
