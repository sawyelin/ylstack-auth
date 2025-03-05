import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import AuthCard from "../auth/AuthCard";
import { AnimatedBorder } from "../ui/animated-border";
import {
  BackgroundGradient,
  BackgroundPattern,
  BackgroundBlobs,
} from "../ui/background-gradient";

const SignupPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, just navigate to email verification
      navigate("/verify-email");
    } catch (err) {
      setError("An error occurred during signup");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center relative py-16 px-4 overflow-hidden">
        <BackgroundGradient variant="blue" />
        <BackgroundPattern />
        <BackgroundBlobs />

        <div className="container relative z-10 mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">
              Create an Account
            </h1>
            <p className="text-muted-foreground dark:text-gray-300">
              Join thousands of users securing their applications
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedBorder className="p-0">
              <AuthCard
                initialView="signup"
                onSignup={handleSignup}
                error={error}
                loading={loading}
              />
            </AnimatedBorder>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
