import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // src/ contains only the stdio MCP server — exclude it from Next.js compilation
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
