# Multi-Project Authentication Platform Setup Guide

## Overview

This guide provides detailed instructions for setting up and deploying the Auth Platform, a comprehensive authentication management dashboard with multi-project support, custom admin panels, and client project management capabilities.

## Prerequisites

- Node.js 16+ and npm/yarn
- Cloudflare account (for deployment)
- Git (for version control)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/auth-platform.git
cd auth-platform
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=/api
VITE_CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
VITE_CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

### 4. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the Vite development server, typically at http://localhost:5173.

## Project Configuration

### Enabling Real API Connections

By default, the application uses mock data for development. To enable real API connections:

#### Client API

In `src/lib/client.ts`:

```typescript
// Change this to true to use real API calls
export const USE_REAL_API = true;
```

#### Hono.js API

In `src/lib/hono.ts`:

```typescript
// Change this to true to use real API
export const USE_REAL_API = true;
```

### Cloudflare Integration

The platform is designed to be deployed to Cloudflare Pages with Cloudflare Pages Functions for the backend API.

#### Local Testing with Wrangler

To test Cloudflare Pages Functions locally:

```bash
npx wrangler pages dev dist
```

#### Deployment

1. Build the application:

```bash
npm run build
# or
yarn build
```

2. Deploy to Cloudflare Pages using Wrangler:

```bash
npx wrangler pages publish dist
```

Alternatively, set up a GitHub integration with Cloudflare Pages for automatic deployments.

## Project Structure

```
├── functions/              # Cloudflare Pages Functions
│   └── api/               # API routes for Cloudflare Pages
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Layout components
│   │   ├── projects/      # Project management components
│   │   ├── ui/            # UI components (ShadCN)
│   │   └── users/         # User management components
│   ├── context/           # React context providers
│   ├── lib/               # Utility functions and API clients
│   │   ├── client.ts      # Frontend API client
│   │   ├── hono.ts        # Hono.js API routes
│   │   └── mock-data.ts   # Mock data for development
│   └── pages/             # Page components
└── wrangler.toml          # Cloudflare Wrangler configuration
```

## API Routes

The API is built with Hono.js and deployed as Cloudflare Pages Functions. Key routes include:

### Authentication

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Authenticate a user
- `POST /api/auth/verify-email` - Verify a user's email address
- `POST /api/auth/reset-password` - Request a password reset

### Projects

- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### API Keys

- `GET /api/projects/:projectId/api-keys` - List API keys for a project
- `POST /api/projects/:projectId/api-keys` - Create a new API key
- `PUT /api/api-keys/:id/revoke` - Revoke an API key

### Analytics

- `GET /api/projects/:projectId/events` - Get authentication events for a project
- `GET /api/projects/:projectId/analytics` - Get analytics summary for a project

## Theming

The application supports both light and dark themes. The theme is automatically detected based on the user's system preferences but can be toggled manually in the UI.

Theme settings are stored in localStorage and applied on application load.

## Troubleshooting

### API Connection Issues

If you're experiencing issues with API connections:

1. Check that the `USE_REAL_API` flags are set correctly in both `client.ts` and `hono.ts`
2. Verify that your Cloudflare API token has the correct permissions
3. Ensure your environment variables are set correctly

### Deployment Issues

If you encounter issues during deployment:

1. Check the Cloudflare Pages build logs for errors
2. Verify that your `wrangler.toml` configuration is correct
3. Ensure that the `functions/api/[[route]].ts` file is correctly exporting the Hono app

## Additional Resources

For more detailed information about Cloudflare integration, see the [Cloudflare Integration Setup Guide](./src/lib/cloudflare-setup.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
