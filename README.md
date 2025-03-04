# Multi-Project Authentication Platform

A comprehensive authentication management dashboard with multi-project support, custom admin panels, and client project management capabilities.

## Features

- **Authentication Panel**: Email/password login, email verification, optional MFA, forgot/reset password flows with animated transitions
- **Project Management**: Create and manage multiple projects with unique API keys and connection settings
- **Admin Dashboard**: User management, analytics, and project metrics using modern UI components
- **Cloudflare Integration**: Seamless deployment to Cloudflare Pages with Hono.js backend
- **Theming**: Polished, customizable theme system with smooth animations and transitions

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion
- **Backend**: Cloudflare Pages Functions with Hono.js
- **Authentication**: Custom auth implementation
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Cloudflare account (for deployment)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/auth-platform.git
cd auth-platform
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=/api
VITE_CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
VITE_CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## Enabling Real API Connections

By default, the application uses mock data for development. To enable real API connections, update the following configuration flags in their respective files:

### Client API

In `src/lib/client.ts`:

```typescript
// Change this to true to use real API calls
export const USE_REAL_API = true;
```

### Hono.js API

In `src/lib/hono.ts`:

```typescript
// Change this to true to use real API
export const USE_REAL_API = true;
```

## Cloudflare Pages Deployment

### Local Development with Wrangler

To test Cloudflare Pages Functions locally:

```bash
npx wrangler pages dev dist
```

### Deployment

1. Build the application

```bash
npm run build
# or
yarn build
```

2. Deploy to Cloudflare Pages using Wrangler

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
