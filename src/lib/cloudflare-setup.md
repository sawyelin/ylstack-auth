# Cloudflare Integration Setup Guide

## Overview

This guide provides instructions for setting up and deploying the Auth Platform with Cloudflare Pages and Cloudflare Workers (via Pages Functions).

## Prerequisites

- A Cloudflare account
- Node.js 16+ and npm/yarn installed locally
- Git installed locally

## Step 1: Configure Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=/api
VITE_CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
VITE_CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

To get your Cloudflare API token and Account ID:

1. Log in to the Cloudflare dashboard
2. Navigate to "My Profile" > "API Tokens"
3. Create a new token with "Pages" and "Workers" permissions
4. Your Account ID can be found in the URL when logged into the Cloudflare dashboard: `https://dash.cloudflare.com/<ACCOUNT_ID>/`

## Step 2: Enable Real API Connections

By default, the application uses mock data for development. To enable real API connections:

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

### Supabase (Optional)

If you're using Supabase for data storage:

1. Create a Supabase project at https://supabase.com
2. Add your Supabase URL and anon key to your `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Generate TypeScript types for your Supabase schema:

```bash
npm run types:supabase
```

## Step 3: Local Development with Wrangler

To test Cloudflare Pages Functions locally:

1. Install Wrangler globally (if not already installed):

```bash
npm install -g wrangler
```

2. Build the application:

```bash
npm run build
```

3. Run the local development server with Wrangler:

```bash
npx wrangler pages dev dist
```

This will start a local server that simulates the Cloudflare Pages environment, including Functions.

## Step 4: Deploy to Cloudflare Pages

### Option 1: Manual Deployment

1. Build the application:

```bash
npm run build
```

2. Deploy to Cloudflare Pages using Wrangler:

```bash
npx wrangler pages publish dist
```

### Option 2: GitHub Integration (Recommended)

1. Push your code to a GitHub repository
2. In the Cloudflare dashboard, go to Pages > Create a project
3. Select your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Add your environment variables
6. Deploy

## Step 5: Configure Custom Domain (Optional)

1. In the Cloudflare Pages project, go to "Custom domains"
2. Add your custom domain
3. Follow the instructions to verify domain ownership and configure DNS

## Troubleshooting

### Functions Not Working

Ensure your `functions/api/[[route]].ts` file is correctly set up to export the Hono app:

```typescript
import { Hono } from "hono";
import app from "../../../src/lib/hono";

// Export for Cloudflare Pages Functions
export const onRequest = app.fetch;
```

### CORS Issues

If you're experiencing CORS issues, check that the CORS middleware is properly configured in your Hono app (`src/lib/hono.ts`):

```typescript
import { cors } from "hono/cors";

// ...

app.use("*", cors());
```

### Environment Variables Not Available

Make sure you've added all required environment variables in the Cloudflare Pages dashboard under your project's "Settings" > "Environment variables".

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Hono Documentation](https://hono.dev/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
