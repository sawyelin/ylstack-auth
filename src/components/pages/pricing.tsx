import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { Button } from "../ui/button";
import { ShimmerButton } from "../ui/shimmer-effect";
import { PerspectiveCard } from "../ui/perspective-card";
import { GlassCard } from "../ui/glass-card";
import {
  BackgroundGradient,
  BackgroundPattern,
} from "../ui/background-gradient";
import { CheckCircle, X } from "lucide-react";

const PricingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 px-4 overflow-hidden">
          <BackgroundGradient variant="blue" />
          <BackgroundPattern />

          <div className="container relative z-10 mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground dark:text-white mb-4">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-xl text-muted-foreground dark:text-gray-300">
                  Choose the plan that fits your needs. All plans include a
                  14-day free trial.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PerspectiveCard>
                    <GlassCard className="h-full p-6 backdrop-blur-xl bg-white/5 dark:bg-black/5 border border-white/20 dark:border-white/10 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300">
                      {plan.featured && (
                        <div className="bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium py-1 px-3 rounded-full self-start mb-4">
                          Most Popular
                        </div>
                      )}
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
                    </GlassCard>
                  </PerspectiveCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-16 px-4 bg-muted/30 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                Compare Plans
              </h2>
              <p className="text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
                See which plan is right for your needs
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-muted/50 dark:bg-gray-800 rounded-tl-lg">
                      <span className="text-foreground dark:text-white font-semibold">
                        Features
                      </span>
                    </th>
                    {pricingPlans.map((plan, index) => (
                      <th
                        key={index}
                        className={`p-4 bg-muted/50 dark:bg-gray-800 ${index === pricingPlans.length - 1 ? "rounded-tr-lg" : ""}`}
                      >
                        <span className="text-foreground dark:text-white font-semibold">
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((feature, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0
                          ? "bg-background dark:bg-gray-950"
                          : "bg-muted/20 dark:bg-gray-900/30"
                      }
                    >
                      <td className="p-4 border-t border-border dark:border-gray-800">
                        <span className="text-foreground dark:text-white">
                          {feature.name}
                        </span>
                      </td>
                      {feature.availability.map((available, i) => (
                        <td
                          key={i}
                          className="p-4 text-center border-t border-border dark:border-gray-800"
                        >
                          {available ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground dark:text-gray-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground dark:text-gray-300">
                Have questions? We've got answers.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <GlassCard key={index} className="p-6 backdrop-blur-md">
                  <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-300">
                    {faq.answer}
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-muted/30 dark:bg-gray-900/50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using our platform to
              secure their applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShimmerButton>
                <Button
                  size="lg"
                  className="bg-primary/90 dark:bg-primary/80 text-primary-foreground hover:bg-primary/70 dark:hover:bg-primary/60"
                  onClick={() => navigate("/signup")}
                >
                  Start Free Trial
                </Button>
              </ShimmerButton>
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.open("mailto:sales@authplatform.com")}
              >
                Contact Sales
              </Button>
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
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
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
                    href="#"
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

// Feature comparison data
const featureComparison = [
  {
    name: "Email/Password Authentication",
    availability: [true, true, true],
  },
  {
    name: "Social Login Providers",
    availability: [false, true, true],
  },
  {
    name: "Multi-factor Authentication",
    availability: [false, true, true],
  },
  {
    name: "Custom Email Templates",
    availability: [false, true, true],
  },
  {
    name: "User Management",
    availability: [true, true, true],
  },
  {
    name: "Role-based Access Control",
    availability: [false, true, true],
  },
  {
    name: "API Access",
    availability: [true, true, true],
  },
  {
    name: "Custom Domains",
    availability: [false, false, true],
  },
  {
    name: "SSO Integration",
    availability: [false, false, true],
  },
  {
    name: "Priority Support",
    availability: [false, true, true],
  },
  {
    name: "Dedicated Account Manager",
    availability: [false, false, true],
  },
];

// FAQ data
const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "You can sign up for any plan and use all features for 14 days without being charged. No credit card is required to start your trial. After the trial period, you can choose to subscribe to continue using the service.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to the new features. When downgrading, the changes will take effect at the start of your next billing cycle.",
  },
  {
    question: "How do you count monthly active users?",
    answer:
      "A monthly active user is any user who authenticates through our platform at least once during a calendar month. Users are counted across all your projects within the same plan.",
  },
  {
    question: "Do you offer discounts for startups or non-profits?",
    answer:
      "Yes, we offer special pricing for eligible startups and non-profit organizations. Please contact our sales team for more information about our startup and non-profit programs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also offer invoicing with net-30 payment terms.",
  },
  {
    question: "Can I use the platform for free?",
    answer:
      "Yes, our Starter plan is free forever for up to 1,000 monthly active users. It includes essential authentication features to get you started, with the option to upgrade as your needs grow.",
  },
];

export default PricingPage;
