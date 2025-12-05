import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Turbopack configuration (Next.js 16+)
  turbopack: {
    resolveAlias: {
      "@": path.resolve(__dirname),
      "@/warehouse": path.resolve(__dirname, "warehouse"),
    },
  },
  // Webpack config for production builds (non-Turbopack)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
      "@/warehouse": path.resolve(__dirname, "warehouse"),
    };
    return config;
  },
};

export default nextConfig;
