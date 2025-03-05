import React from "react";
import { motion } from "framer-motion";
import Navbar from "../layout/Navbar";
import { Button } from "../ui/button";
import { AnimatedPathBorder } from "../ui/animated-border";
import { BackgroundGradient } from "../ui/background-gradient";
import { Calendar, Clock, ChevronRight, Search } from "lucide-react";
import { Input } from "../ui/input";

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4 overflow-hidden">
          <BackgroundGradient variant="cyan" />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground dark:text-white mb-4">
                  Authentication Blog
                </h1>
                <p className="text-xl text-muted-foreground dark:text-gray-300">
                  Insights, tutorials, and best practices for modern
                  authentication
                </p>
              </motion.div>
            </div>

            <div className="max-w-md mx-auto mb-16">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10 py-6 text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Featured Post */}
              <motion.div
                className="md:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedPathBorder>
                  <div className="bg-card dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="aspect-video md:aspect-auto">
                        <img
                          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"
                          alt="Featured post"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400 mb-3">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            June 15, 2023
                          </span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />8 min read
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white mb-4">
                          The Complete Guide to Modern Authentication Practices
                        </h2>
                        <p className="text-muted-foreground dark:text-gray-300 mb-6">
                          Learn about the latest authentication methods,
                          security best practices, and how to implement them in
                          your applications.
                        </p>
                        <Button
                          className="self-start bg-primary hover:bg-primary/90"
                          onClick={() =>
                            window.open("#complete-guide", "_self")
                          }
                        >
                          Read Article
                        </Button>
                      </div>
                    </div>
                  </div>
                </AnimatedPathBorder>
              </motion.div>

              {/* Regular Posts */}
              {blogPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
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
                        <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400 mb-2">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
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
                            `#${post.title.toLowerCase().replace(/\s+/g, "-")}`,
                            "_self",
                          )
                        }
                      >
                        Read More <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </AnimatedPathBorder>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => alert("Loading more articles...")}
              >
                Load More Articles
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 px-4 bg-muted/30 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                Browse by Category
              </h2>
              <p className="text-muted-foreground dark:text-gray-300">
                Find articles on specific authentication topics
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  className="cursor-pointer"
                >
                  <div className="bg-card dark:bg-gray-800 p-6 rounded-lg text-center hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      {category.count} articles
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8">
              Get the latest authentication news, tutorials, and updates
              delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={() => alert("Subscribed to newsletter!")}
              >
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

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
  {
    title: "Understanding OAuth 2.0 and OpenID Connect",
    excerpt:
      "A comprehensive guide to OAuth 2.0 and OpenID Connect protocols for modern authentication.",
    date: "May 5, 2023",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    title: "Securing Your API with JWT Authentication",
    excerpt:
      "Learn how to implement JWT-based authentication to secure your APIs and backend services.",
    date: "April 22, 2023",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&q=80",
  },
  {
    title: "GDPR Compliance for Authentication Systems",
    excerpt:
      "Ensure your authentication system complies with GDPR and other privacy regulations.",
    date: "April 10, 2023",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
  },
];

// Categories data
const categories = [
  {
    name: "Security",
    count: 24,
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
    name: "OAuth",
    count: 18,
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    name: "MFA",
    count: 15,
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
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
        />
      </svg>
    ),
  },
  {
    name: "JWT",
    count: 12,
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
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    name: "Passwordless",
    count: 10,
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
          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        />
      </svg>
    ),
  },
  {
    name: "Biometrics",
    count: 8,
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
          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
        />
      </svg>
    ),
  },
  {
    name: "Compliance",
    count: 7,
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
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Tutorials",
    count: 20,
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
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
];

export default BlogPage;
