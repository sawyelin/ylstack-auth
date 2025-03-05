import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import AuthCard from "./auth/AuthCard";
import { Button } from "./ui/button";
import {
  AnimatedBorder,
  AnimatedGradientBorder,
  AnimatedPathBorder,
} from "./ui/animated-border";
import {
  BackgroundGradient,
  BackgroundPattern,
  BackgroundBlobs,
} from "./ui/background-gradient";
import { Shield, ArrowRight, CheckCircle, ExternalLink } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
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
          <BackgroundGradient variant="purple" />
          <BackgroundPattern />
          <BackgroundBlobs />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground dark:text-white">
                  Secure Authentication for Your Applications
                </h1>
                <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-2xl">
                  A comprehensive authentication platform with multi-project
                  support, custom admin panels, and powerful user management
                  capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <AnimatedGradientBorder>
                    <Button
                      size="lg"
                      className="w-full bg-background dark:bg-gray-900 text-foreground dark:text-white hover:bg-muted/50 dark:hover:bg-gray-800/50"
                      onClick={() => {
                        const featuresSection =
                          document.getElementById("features");
                        if (featuresSection)
                          featuresSection.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                    >
                      Explore Features
                    </Button>
                  </AnimatedGradientBorder>
                  <AnimatedPathBorder>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        const docsSection = document.getElementById("docs");
                        if (docsSection)
                          docsSection.scrollIntoView({ behavior: "smooth" });
                        else window.location.href = "#docs";
                      }}
                    >
                      View Documentation
                    </Button>
                  </AnimatedPathBorder>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center"
              >
                <AnimatedBorder
                  className="p-0"
                  containerClassName="w-full max-w-md"
                >
                  <AuthCard
                    initialView="login"
                    onLogin={handleLogin}
                    onSignup={handleSignup}
                  />
                </AnimatedBorder>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="relative py-16 px-4 bg-muted/50 dark:bg-gray-900/80 backdrop-blur-sm"
        >
          <svg
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 dark:stroke-gray-800 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 40V.5H40" fill="none" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#grid-pattern)"
            />
          </svg>

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                Powerful Authentication Features
              </h2>
              <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
                Everything you need to build secure, scalable authentication for
                your applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AnimatedGradientBorder containerClassName="h-full">
                    <div className="bg-card dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg h-full">
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </AnimatedGradientBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 px-4 relative overflow-hidden">
          <BackgroundGradient variant="blue" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
                Choose the plan that fits your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AnimatedBorder containerClassName="h-full">
                    <div className="bg-card dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg h-full flex flex-col">
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                          {plan.name}
                        </h3>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-foreground dark:text-white">
                            ${plan.price}
                          </span>
                          <span className="text-sm text-muted-foreground dark:text-gray-400 ml-1">
                            /month
                          </span>
                        </div>
                        <p className="text-muted-foreground dark:text-gray-300 mt-2">
                          {plan.description}
                        </p>
                      </div>

                      <ul className="space-y-3 mb-6 flex-grow">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-foreground dark:text-gray-200">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        className={`w-full ${plan.featured ? "bg-primary hover:bg-primary/90" : "bg-muted/50 dark:bg-gray-700 hover:bg-muted dark:hover:bg-gray-600"}`}
                        onClick={() => navigate("/signup")}
                      >
                        Get Started
                      </Button>
                    </div>
                  </AnimatedBorder>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section
          id="blog"
          className="py-16 px-4 bg-muted/30 dark:bg-gray-900/50"
        >
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                Latest from our Blog
              </h2>
              <p className="text-xl text-muted-foreground dark:text-gray-300 max-w-3xl mx-auto">
                Learn about authentication best practices and industry insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AnimatedPathBorder containerClassName="h-full">
                    <div className="bg-card dark:bg-gray-800 p-6 rounded-lg h-full flex flex-col">
                      <div className="aspect-video rounded-md overflow-hidden mb-4 bg-muted dark:bg-gray-700">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center mb-2">
                          <span className="text-xs text-muted-foreground dark:text-gray-400">
                            {post.date}
                          </span>
                          <span className="mx-2 text-muted-foreground dark:text-gray-500">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground dark:text-gray-400">
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground dark:text-gray-300 mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        className="p-0 h-auto justify-start text-primary"
                        onClick={() =>
                          window.open(
                            `/blog#${post.title.toLowerCase().replace(/\s+/g, "-")}`,
                            "_blank",
                          )
                        }
                      >
                        Read More <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </AnimatedPathBorder>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/blog")}
              >
                View All Articles
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 px-4 overflow-hidden">
          <BackgroundGradient variant="green" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="bg-card/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 lg:px-16 lg:py-24">
                  <div className="mx-auto max-w-xl">
                    <h2 className="text-3xl font-bold text-foreground dark:text-white md:text-4xl">
                      Ready to secure your applications?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground dark:text-gray-300">
                      Get started with our authentication platform today and
                      provide your users with a seamless, secure login
                      experience.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                      <AnimatedBorder>
                        <Button
                          size="lg"
                          className="w-full bg-background dark:bg-gray-900 text-foreground dark:text-white hover:bg-muted/50 dark:hover:bg-gray-800/50"
                          onClick={() => navigate("/signup")}
                        >
                          Get Started
                        </Button>
                      </AnimatedBorder>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-primary/20 dark:border-primary/30"
                        onClick={() =>
                          window.open("mailto:sales@authplatform.com")
                        }
                      >
                        Contact Sales
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="relative hidden lg:block">
                  <img
                    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80"
                    alt="Colorful abstract background"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AuthPlatform</h3>
              <p className="text-gray-400">
                Secure authentication for your applications
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#docs"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} AuthPlatform. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
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
                className="text-gray-400 hover:text-white transition-colors"
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
                className="text-gray-400 hover:text-white transition-colors"
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
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
  },
  {
    title: "Secure Authentication",
    description:
      "Implement email/password login, social providers, and multi-factor authentication with ease.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "User Management",
    description:
      "Comprehensive tools for managing users, roles, and permissions across your applications.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Customizable Flows",
    description:
      "Tailor authentication flows with custom email templates, branding, and user experiences.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    title: "Detailed Analytics",
    description:
      "Gain insights into user behavior, login patterns, and security events with comprehensive analytics.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    title: "Developer-Friendly",
    description:
      "Easy integration with your applications through our SDKs, APIs, and comprehensive documentation.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-primary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

// Pricing plans data
const pricingPlans = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for side projects and small applications",
    features: [
      "Up to 1,000 monthly active users",
      "Email/password authentication",
      "Basic user management",
      "Community support",
      "1 project",
    ],
    featured: false,
  },
  {
    name: "Professional",
    price: "49",
    description: "For growing businesses and applications",
    features: [
      "Up to 10,000 monthly active users",
      "Social login providers",
      "Multi-factor authentication",
      "Custom email templates",
      "Priority support",
      "5 projects",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "199",
    description: "For large-scale applications and organizations",
    features: [
      "Unlimited monthly active users",
      "Advanced security features",
      "Custom branding",
      "SSO integration",
      "Dedicated support",
      "Unlimited projects",
    ],
    featured: false,
  },
];

// Blog posts data
const blogPosts = [
  {
    title: "Implementing Secure Authentication in React Applications",
    excerpt:
      "Learn how to implement secure authentication flows in your React applications using our platform.",
    date: "June 12, 2023",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  },
  {
    title: "The Future of Passwordless Authentication",
    excerpt:
      "Explore the latest trends in passwordless authentication and how they're changing the security landscape.",
    date: "May 28, 2023",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&q=80",
  },
  {
    title: "Multi-Factor Authentication Best Practices",
    excerpt:
      "Discover the best practices for implementing multi-factor authentication in your applications.",
    date: "May 15, 2023",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?w=800&q=80",
  },
];

export default Home;
