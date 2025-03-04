import { Hono } from "hono";
import app from "../../../src/lib/hono";

// Export for Cloudflare Pages Functions
export const onRequest = app.fetch;
