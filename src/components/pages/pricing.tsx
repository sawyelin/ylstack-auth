import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { Button } from "../ui/button";
import { AnimatedBorder, AnimatedGradientBorder } from "../ui/animated-border";
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
                  <AnimatedBorder containerClassName="h-full">
                    <div className="bg-card dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-lg h-full flex flex-col">
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
                        onClick={() => (window.location.href = "/signup")}
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
                <AnimatedGradientBorder key={index} containerClassName="w-full">
                  <div className="p-6 bg-card dark:bg-gray-800 rounded-lg">
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                </AnimatedGradientBorder>
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
              <AnimatedBorder>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Start Free Trial
                </Button>
              </AnimatedBorder>
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
  { name: "Monthly active users", availability: [true, true, true] },
  { name: "Email/password authentication", availability: [true, true, true] },
  { name: "Social login providers", availability: [false, true, true] },
  { name: "Multi-factor authentication", availability: [false, true, true] },
  { name: "Custom email templates", availability: [false, true, true] },
  { name: "Custom branding", availability: [false, false, true] },
  { name: "SSO integration", availability: [false, false, true] },
  { name: "API access", availability: [true, true, true] },
  { name: "Analytics dashboard", availability: [false, true, true] },
  { name: "Priority support", availability: [false, true, true] },
  { name: "Dedicated support", availability: [false, false, true] },
];

// FAQ data
const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "You can sign up for any plan and use all features for 14 days without being charged. No credit card required to start. You'll be notified before the trial ends.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle.",
  },
  {
    question: "How do you count monthly active users?",
    answer:
      "A monthly active user is any user who authenticates through our platform at least once in a 30-day period. We don't count duplicate authentications from the same user.",
  },
  {
    question: "Do you offer discounts for startups or non-profits?",
    answer:
      "Yes, we offer special pricing for eligible startups and non-profit organizations. Please contact our sales team for more information.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, including Visa, Mastercard, and American Express. For Enterprise plans, we also offer invoicing.",
  },
  {
    question: "How secure is your platform?",
    answer:
      "Security is our top priority. We use industry-standard encryption, regular security audits, and follow best practices for authentication. Our platform is SOC 2 Type II compliant.",
  },
];

export default PricingPage;
