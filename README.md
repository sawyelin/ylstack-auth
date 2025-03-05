# AuthPlatform - Multi-Project Authentication System

![AuthPlatform](https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80)

A comprehensive authentication platform with multi-project support, custom admin panels, and powerful user management capabilities built with React, Tailwind CSS v4, and Hono.js.

## Features

- **Multi-Project Support**: Manage authentication for multiple applications from a single dashboard
- **Secure Authentication**: Email/password login, social providers, and multi-factor authentication
- **User Management**: Comprehensive tools for managing users, roles, and permissions
- **Customizable Flows**: Custom email templates, branding, and user experiences
- **Detailed Analytics**: Insights into user behavior, login patterns, and security events
- **Modern UI**: Built with Tailwind CSS v4 featuring glassmorphism, animations, and dark mode

## Tech Stack

- **Frontend**: React, Tailwind CSS v4, Framer Motion, Lucide Icons
- **Backend**: Hono.js (serverless-ready)
- **Authentication**: JWT, OAuth, MFA
- **Deployment**: Cloudflare Pages/Workers

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Cloudflare account (for production deployment)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/auth-platform.git
cd auth-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

## Production Setup with Hono.js

This project currently uses mock data for demonstration purposes. To use it in production with Hono.js:

### 1. Set up Hono.js API

The project already includes a sample Hono.js API in the `api` directory. For production use:

1. Update the JWT secret in `api/index.ts`
2. Connect to a real database instead of using mock data
3. Implement proper password hashing and security measures

### 2. Configure Environment Variables

Create a `.env` file based on the provided `.env.example`:

```
VITE_API_URL=https://your-api-url.com
VITE_JWT_SECRET=your-jwt-secret
VITE_ENV=production
VITE_USE_MOCK_DATA=false
```

### 3. Deploy to Cloudflare

1. Install Wrangler CLI:

```bash
npm install -g wrangler
```

2. Configure your Cloudflare account in `wrangler.toml`

3. Deploy:

```bash
wrangler publish
```

## Authentication Flow

1. **Login/Signup**: User enters credentials
2. **Email Verification**: Verification link sent to email
3. **MFA (Optional)**: Two-factor authentication if enabled
4. **JWT Token**: Server issues JWT token upon successful authentication
5. **Protected Routes**: Token used for accessing protected resources

## Project Structure

```
├── src/
│   ├── components/       # UI components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   ├── pages/        # Page components
│   │   ├── projects/     # Project management components
│   │   ├── ui/           # UI library components
│   │   └── users/        # User management components
│   ├── context/          # React context providers
│   ├── lib/              # Utility functions and API clients
│   ├── pages/            # Route pages
│   └── types/            # TypeScript type definitions
├── api/                  # Hono.js API (for production)
├── public/               # Static assets
└── index.html            # HTML entry point
```

## Replacing Mock Data with Real API

To replace the mock data with real API calls:

1. Update the API client in `src/lib/api.ts`:
   - Set `USE_REAL_API = true`
   - Implement real API calls to your backend

2. Update the authentication context in `src/context/AuthContext.tsx`:
   - Replace mock authentication with real API calls
   - Implement proper token storage and validation

3. Update the project context in `src/context/ProjectContext.tsx`:
   - Connect to your real project management API

## UI Components

The project includes a comprehensive set of UI components built with Tailwind CSS v4:

- **GlassCard**: Modern glassmorphism effect with backdrop blur
- **PerspectiveCard**: 3D perspective effect on hover
- **ConicGradient**: Beautiful animated gradient backgrounds
- **ShimmerEffect**: Loading and highlight effects
- **FloatingElement**: Subtle floating animations
- **StartingAnimation**: Entrance animations for elements

These components are designed to work seamlessly in both light and dark modes.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
