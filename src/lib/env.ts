// src/lib/env.ts
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_REFRESH_SECRET: requireEnv("JWT_REFRESH_SECRET"),
  DATABASE_URL: process.env.DATABASE_URL ?? "./db.json",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  OPENAI_API_KEY: requireEnv("OPENAI_API_KEY"), 
};
