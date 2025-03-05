import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "./layout/Navbar";
import AuthCard from "./auth/AuthCard";
import { Button } from "./ui/button";
import { AnimatedBorder, AnimatedGradientBorder } from "./ui/animated-border";
import {
  BackgroundGradient,
  BackgroundPattern,
} from "./ui/background-gradient";
import { AnimatedGradientText } from "./ui/animated-gradient-text";
import { PerspectiveCard } from "./ui/perspective-card";
import { ConicGradient } from "./ui/conic-gradient";
import { GlassCard } from "./ui/glass-card";
import { ShimmerEffect } from "./ui/shimmer-effect";
import { FloatingElement } from "./ui/floating-element";
import { StartingAnimation } from "./ui/starting-animation";
import {
  Shield,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Code,
  Zap,
  Lock,
  Users,
  Settings,
  BarChart,
} from "lucide-react";

const HomeV4 = () => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
  } | null>(null);

  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    console.log("Login attempt with:", data);
    // Simulate successful login
    setUser({
      name: "John Doe",
      email: data.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=john`,
    });
  };

  const handleSignup = async (data: {
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) => {
    console.log("Signup attempt with:", data);
    // In a real app, this would create a new user account
    return Promise.resolve();
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 px-4 overflow-hidden">
          <BackgroundPattern />

          {/* Floating blobs */}
          <div
            className="absolute top-20 right-[10%] w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-60 dark:opacity-30 animate-float"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute bottom-20 left-[10%] w-64 h-64 bg-purple-500/20 rounded-full blur-3xl opacity-60 dark:opacity-30 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-40 left-[20%] w-56 h-56 bg-blue-500/20 rounded-full blur-3xl opacity-60 dark:opacity-30 animate-float"
            style={{ animationDelay: "2s" }}
          />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <StartingAnimation delay={0.1}>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 text-primary text-sm font-medium mb-4">
                    <Zap className="h-4 w-4 mr-2" />
                    <span>Tailwind CSS v4.0 Ready</span>
                  </div>
                </StartingAnimation>

                <StartingAnimation delay={0.2}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground dark:text-white">
                    Secure{" "}
                    <AnimatedGradientText>Authentication</AnimatedGradientText>{" "}
                    for Your Applications
                  </h1>
                </StartingAnimation>

                <StartingAnimation delay={0.3}>
                  <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl">
                    A comprehensive authentication platform with multi-project
                    support, custom admin panels, and powerful user management
                    capabilities.
                  </p>
                </StartingAnimation>

                <StartingAnimation delay={0.4}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <ConicGradient className="p-[1px] rounded-full">
                      <Button
                        size="lg"
                        className="w-full bg-background dark:bg-gray-900 text-foreground dark:text-white hover:bg-muted/50 dark:hover:bg-gray-800/50 rounded-full"
                        asChild
                      >
                        <Link to="#features">
                          Explore Features
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </ConicGradient>

                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-primary/20 dark:border-primary/30"
                      asChild
                    >
                      <Link to="#docs">
                        <Code className="mr-2 h-4 w-4" />
                        View Documentation
                      </Link>
                    </Button>
                  </div>
                </StartingAnimation>

                <StartingAnimation delay={0.5}>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-gray-400">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <img
                          key={i}
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                          alt={`User ${i}`}
                          className="w-8 h-8 rounded-full border-2 border-background dark:border-gray-900"
                        />
                      ))}
                    </div>
                    <span>Trusted by 10,000+ developers</span>
                  </div>
                </StartingAnimation>
              </div>

              <div className="flex justify-center">
                <FloatingElement distance={15} duration={8}>
                  <PerspectiveCard className="w-full max-w-md">
                    <GlassCard className="p-[1px] shadow-2xl">
                      <ShimmerEffect>
                        <div className="bg-background/80 dark:bg-gray-900/80 rounded-xl overflow-hidden">
                          <AuthCard
                            initialView="login"
                            onLogin={handleLogin}
                            onSignup={handleSignup}
                          />
                        </div>
                      </ShimmerEffect>
                    </GlassCard>
                  </PerspectiveCard>
                </FloatingElement>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-24 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <StartingAnimation>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
                  <AnimatedGradientText>
                    Modern Authentication
                  </AnimatedGradientText>{" "}
                  Features
                </h2>
                <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  Everything you need to build secure, scalable authentication
                  for your applications using Tailwind CSS v4.0
                </p>
              </StartingAnimation>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <StartingAnimation key={index} delay={index * 0.1}>
                  <GlassCard className="h-full p-6 hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground dark:text-gray-300">
                      {feature.description}
                    </p>
                  </GlassCard>
                </StartingAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Tailwind v4 Features Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background dark:from-gray-950 dark:via-primary/10 dark:to-gray-950" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <StartingAnimation>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
                  Built with{" "}
                  <AnimatedGradientText>Tailwind CSS v4.0</AnimatedGradientText>
                </h2>
                <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
                  Taking advantage of the latest features in Tailwind CSS v4.0
                </p>
              </StartingAnimation>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {tailwindFeatures.map((feature, index) => (
                <StartingAnimation key={index} delay={index * 0.1}>
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                        {feature.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-300 mb-3">
                        {feature.description}
                      </p>
                      <div className="bg-muted/50 dark:bg-gray-800/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-foreground dark:text-gray-300 font-mono">
                          <code>{feature.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </StartingAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-background dark:from-gray-950 dark:to-gray-950" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <ConicGradient className="p-[1px] rounded-2xl">
              <div className="bg-background/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <StartingAnimation>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-6">
                        Ready to secure your applications with{" "}
                        <AnimatedGradientText>
                          modern authentication
                        </AnimatedGradientText>
                        ?
                      </h2>
                      <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8">
                        Get started with our platform today and provide your
                        users with a seamless, secure login experience powered
                        by Tailwind CSS v4.0.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          size="lg"
                          className="bg-primary hover:bg-primary/90 rounded-full"
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="rounded-full"
                        >
                          Contact Sales
                        </Button>
                      </div>
                    </StartingAnimation>
                  </div>
                  <div className="hidden lg:block">
                    <FloatingElement>
                      <img
                        src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                        alt="Colorful abstract background"
                        className="w-full h-auto rounded-xl shadow-2xl"
                      />
                    </FloatingElement>
                  </div>
                </div>
              </div>
            </ConicGradient>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card dark:bg-gray-900 border-t border-border dark:border-gray-800 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-xl text-foreground dark:text-white">
                  AuthPlatform
                </span>
              </div>
              <p className="text-muted-foreground dark:text-gray-400">
                Secure authentication for your applications
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground dark:text-white">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#docs"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground dark:text-white">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground dark:text-white">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground dark:text-gray-400">
              © {new Date().getFullYear()} AuthPlatform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Features data
const features = [
  {
    title: "Multi-Project Support",
    description:
      "Manage authentication for multiple applications from a single dashboard with isolated environments.",
    icon: <Shield className="h-6 w-6 text-primary" />,
  },
  {
    title: "Secure Authentication",
    description:
      "Implement email/password login, social providers, and multi-factor authentication with ease.",
    icon: <Lock className="h-6 w-6 text-primary" />,
  },
  {
    title: "User Management",
    description:
      "Comprehensive tools for managing users, roles, and permissions across your applications.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
  {
    title: "Customizable Flows",
    description:
      "Tailor authentication flows with custom email templates, branding, and user experiences.",
    icon: <Settings className="h-6 w-6 text-primary" />,
  },
  {
    title: "Detailed Analytics",
    description:
      "Gain insights into user behavior, login patterns, and security events with comprehensive analytics.",
    icon: <BarChart className="h-6 w-6 text-primary" />,
  },
  {
    title: "Developer-Friendly",
    description:
      "Easy integration with your applications through our SDKs, APIs, and comprehensive documentation.",
    icon: <Code className="h-6 w-6 text-primary" />,
  },
];

// Tailwind v4 features
const tailwindFeatures = [
  {
    title: "Modern Color Palette with OKLCH",
    description:
      "Take advantage of the wider color gamut with OKLCH colors in Tailwind CSS v4.0.",
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    code: "@theme {\n  --color-primary: oklch(0.6 0.24 275);\n  --color-secondary: oklch(0.9 0.11 275);\n}",
  },
  {
    title: "3D Transforms and Perspective",
    description:
      "Create stunning 3D effects with the new transform utilities in Tailwind CSS v4.0.",
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
        />
      </svg>
    ),
    code: '<div class="perspective-1000">\n  <div class="transform-style-3d rotate-y-15">\n    <div class="translate-z-20">\n      3D Content\n    </div>\n  </div>\n</div>',
  },
  {
    title: "Container Queries",
    description:
      "Style elements based on their container size with built-in container query support.",
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    ),
    code: '<div class="@container">\n  <div class="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3">\n    <!-- Content -->\n  </div>\n</div>',
  },
  {
    title: "Advanced Gradient Controls",
    description:
      "Create more complex and vibrant gradients with new gradient features in Tailwind CSS v4.0.",
    icon: (
      <svg
        className="h-6 w-6 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    code: '<div class="bg-linear-45 from-indigo-500 via-purple-500 to-pink-500"></div>\n<div class="bg-conic from-primary via-purple-500 to-primary"></div>\n<div class="bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>',
  },
];

export default HomeV4;
