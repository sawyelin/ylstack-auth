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

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, check for a specific email/password
      if (data.email === "admin@example.com" && data.password === "password") {
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center relative py-16 px-4 overflow-hidden">
        <BackgroundGradient variant="purple" />
        <BackgroundPattern />
        <BackgroundBlobs />

        <div className="container relative z-10 mx-auto max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground dark:text-gray-300">
              Sign in to your account to continue
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedBorder className="p-0">
              <AuthCard
                initialView="login"
                onLogin={handleLogin}
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

export default LoginPage;
