import { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./pages/dashboard";
import ProjectDashboard from "./pages/dashboard/project/[id]/index";
import ProjectSettings from "./pages/dashboard/project/[id]/settings";
import ProjectUsers from "./pages/dashboard/project/[id]/users";
import LoginPage from "./components/pages/login";
import SignupPage from "./components/pages/signup";
import PricingPage from "./components/pages/pricing";
import BlogPage from "./components/pages/blog";

// Lazy load additional pages
const UsersPage = lazy(() => import("./pages/dashboard/users"));
const AnalyticsPage = lazy(() => import("./pages/dashboard/analytics"));
const ApiKeysPage = lazy(() => import("./pages/dashboard/api-keys"));
const SettingsPage = lazy(() => import("./pages/dashboard/settings"));
const EmailTemplatesPage = lazy(
  () => import("./pages/dashboard/email-templates"),
);

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/project/:id" element={<ProjectDashboard />} />
          <Route
            path="/dashboard/project/:id/settings"
            element={<ProjectSettings />}
          />
          <Route
            path="/dashboard/project/:id/users"
            element={<ProjectUsers />}
          />
          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
          <Route path="/dashboard/api-keys" element={<ApiKeysPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route
            path="/dashboard/email-templates"
            element={<EmailTemplatesPage />}
          />
          <Route path="/dashboard/support" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<SettingsPage />} />
          <Route path="/dashboard/notifications" element={<Dashboard />} />
          {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
