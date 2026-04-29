import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  experimental: {} as any, // سپس property را تزریق می‌کنیم

  webpack(config) {
    config.optimization.moduleIds = "deterministic";
    return config;
  },
};

(nextConfig.experimental as any).instrumentationHook = false;

export default nextConfig;
