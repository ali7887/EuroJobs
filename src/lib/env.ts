// src/lib/env.ts
import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),

  DATABASE_URL: z.string().url(),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_RESET_SECRET: z.string().min(32),
  JWT_EMAIL_SECRET: z.string().min(32),

  ACCESS_TOKEN_EXPIRES_IN: z.string().default("15m"),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default("7d"),
});

// cache for performance
let cachedEnv: { NODE_ENV: "development" | "test" | "production"; DATABASE_URL: string; JWT_ACCESS_SECRET: string; JWT_REFRESH_SECRET: string; JWT_RESET_SECRET: string; JWT_EMAIL_SECRET: string; ACCESS_TOKEN_EXPIRES_IN: string; REFRESH_TOKEN_EXPIRES_IN: string; } | null = null;

export function getEnv() {
  // if it's already parsed, return cached
  if (cachedEnv) return cachedEnv;

  const parsed = serverEnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}
