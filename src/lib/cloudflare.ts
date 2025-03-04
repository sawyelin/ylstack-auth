import { supabase } from "./supabase";

// Configuration flag to enable/disable real Cloudflare connection
export const USE_REAL_CLOUDFLARE = false;

// Cloudflare API endpoints
const CF_API_BASE = "https://api.cloudflare.com/client/v4";

// Cloudflare API credentials - replace with your own or use environment variables
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || "";
const CF_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || "";
const CF_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || "";

// Interface for Cloudflare API responses
interface CloudflareResponse<T> {
  success: boolean;
  errors: any[];
  messages: any[];
  result: T;
}

// Interface for Cloudflare Pages project
interface CloudflareProject {
  id: string;
  name: string;
  created_on: string;
  subdomain: string;
  domains: string[];
  production_branch: string;
}

// Interface for Cloudflare deployment
interface CloudflareDeployment {
  id: string;
  project_id: string;
  url: string;
  environment: string;
  created_on: string;
  status: string;
}

/**
 * Fetch Cloudflare Pages projects
 * @returns Array of Cloudflare Pages projects
 */
export async function getProjects(): Promise<CloudflareProject[]> {
  if (!USE_REAL_CLOUDFLARE) {
    // Return mock data when not using real Cloudflare
    return mockProjects;
  }

  try {
    const response = await fetch(
      `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects`,
      {
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data: CloudflareResponse<CloudflareProject[]> = await response.json();

    if (!data.success) {
      throw new Error(
        `Cloudflare API error: ${data.errors.map((e) => e.message).join(", ")}`,
      );
    }

    return data.result;
  } catch (error) {
    console.error("Error fetching Cloudflare projects:", error);
    throw error;
  }
}

/**
 * Create a new Cloudflare Pages project
 * @param name Project name
 * @param productionBranch Production branch name
 * @returns Created project details
 */
export async function createProject(
  name: string,
  productionBranch: string = "main",
): Promise<CloudflareProject> {
  if (!USE_REAL_CLOUDFLARE) {
    // Return mock data when not using real Cloudflare
    const newProject: CloudflareProject = {
      id: `project-${Date.now()}`,
      name,
      created_on: new Date().toISOString(),
      subdomain: `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.pages.dev`,
      domains: [],
      production_branch: productionBranch,
    };

    // Add to mock projects
    mockProjects.push(newProject);
    return newProject;
  }

  try {
    const response = await fetch(
      `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          production_branch: productionBranch,
        }),
      },
    );

    const data: CloudflareResponse<CloudflareProject> = await response.json();

    if (!data.success) {
      throw new Error(
        `Cloudflare API error: ${data.errors.map((e) => e.message).join(", ")}`,
      );
    }

    return data.result;
  } catch (error) {
    console.error("Error creating Cloudflare project:", error);
    throw error;
  }
}

/**
 * Get deployments for a Cloudflare Pages project
 * @param projectId Project ID
 * @returns Array of deployments
 */
export async function getDeployments(
  projectId: string,
): Promise<CloudflareDeployment[]> {
  if (!USE_REAL_CLOUDFLARE) {
    // Return mock data when not using real Cloudflare
    return mockDeployments.filter((d) => d.project_id === projectId);
  }

  try {
    const response = await fetch(
      `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects/${projectId}/deployments`,
      {
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data: CloudflareResponse<CloudflareDeployment[]> =
      await response.json();

    if (!data.success) {
      throw new Error(
        `Cloudflare API error: ${data.errors.map((e) => e.message).join(", ")}`,
      );
    }

    return data.result;
  } catch (error) {
    console.error("Error fetching Cloudflare deployments:", error);
    throw error;
  }
}

/**
 * Create a custom domain for a Cloudflare Pages project
 * @param projectId Project ID
 * @param domain Domain name
 * @returns Success status
 */
export async function addCustomDomain(
  projectId: string,
  domain: string,
): Promise<boolean> {
  if (!USE_REAL_CLOUDFLARE) {
    // Update mock data when not using real Cloudflare
    const project = mockProjects.find((p) => p.id === projectId);
    if (project) {
      project.domains.push(domain);
      return true;
    }
    return false;
  }

  try {
    const response = await fetch(
      `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects/${projectId}/domains`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domain,
        }),
      },
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error adding custom domain:", error);
    throw error;
  }
}

/**
 * Delete a Cloudflare Pages project
 * @param projectId Project ID
 * @returns Success status
 */
export async function deleteProject(projectId: string): Promise<boolean> {
  if (!USE_REAL_CLOUDFLARE) {
    // Update mock data when not using real Cloudflare
    const projectIndex = mockProjects.findIndex((p) => p.id === projectId);
    if (projectIndex !== -1) {
      mockProjects.splice(projectIndex, 1);
      // Also remove associated deployments
      mockDeployments = mockDeployments.filter(
        (d) => d.project_id !== projectId,
      );
      return true;
    }
    return false;
  }

  try {
    const response = await fetch(
      `${CF_API_BASE}/accounts/${CF_ACCOUNT_ID}/pages/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error deleting Cloudflare project:", error);
    throw error;
  }
}

/**
 * Sync project data with Supabase
 * @param projectId Project ID
 * @returns Success status
 */
export async function syncProjectWithSupabase(
  projectId: string,
): Promise<boolean> {
  try {
    // Get project details
    const projects = USE_REAL_CLOUDFLARE ? await getProjects() : mockProjects;

    const project = projects.find((p) => p.id === projectId);
    if (!project) return false;

    // Get deployments
    const deployments = USE_REAL_CLOUDFLARE
      ? await getDeployments(projectId)
      : mockDeployments.filter((d) => d.project_id === projectId);

    // Store in Supabase
    const { error: projectError } = await supabase.from("projects").upsert({
      id: project.id,
      name: project.name,
      created_at: project.created_on,
      subdomain: project.subdomain,
      domains: project.domains,
      production_branch: project.production_branch,
    });

    if (projectError) throw projectError;

    // Store deployments
    for (const deployment of deployments) {
      const { error: deploymentError } = await supabase
        .from("deployments")
        .upsert({
          id: deployment.id,
          project_id: deployment.project_id,
          url: deployment.url,
          environment: deployment.environment,
          created_at: deployment.created_on,
          status: deployment.status,
        });

      if (deploymentError) throw deploymentError;
    }

    return true;
  } catch (error) {
    console.error("Error syncing project with Supabase:", error);
    return false;
  }
}

// Mock data for development and testing
let mockProjects: CloudflareProject[] = [
  {
    id: "project-1",
    name: "Main Website",
    created_on: "2023-06-15T10:30:00Z",
    subdomain: "main-website.pages.dev",
    domains: ["example.com", "www.example.com"],
    production_branch: "main",
  },
  {
    id: "project-2",
    name: "Mobile App",
    created_on: "2023-06-14T14:45:00Z",
    subdomain: "mobile-app.pages.dev",
    domains: ["app.example.com"],
    production_branch: "main",
  },
  {
    id: "project-3",
    name: "E-commerce Platform",
    created_on: "2023-06-10T09:00:00Z",
    subdomain: "ecommerce.pages.dev",
    domains: ["shop.example.com"],
    production_branch: "production",
  },
];

let mockDeployments: CloudflareDeployment[] = [
  {
    id: "deployment-1",
    project_id: "project-1",
    url: "https://main-website.pages.dev",
    environment: "production",
    created_on: "2023-06-15T10:30:00Z",
    status: "success",
  },
  {
    id: "deployment-2",
    project_id: "project-1",
    url: "https://dev-main-website.pages.dev",
    environment: "preview",
    created_on: "2023-06-14T14:45:00Z",
    status: "success",
  },
  {
    id: "deployment-3",
    project_id: "project-2",
    url: "https://mobile-app.pages.dev",
    environment: "production",
    created_on: "2023-06-14T14:45:00Z",
    status: "success",
  },
];
