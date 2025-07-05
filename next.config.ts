import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Render.com için optimize ayarlar
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
  
  // Render.com için gerekli ayarlar
  env: {
    HOSTNAME: '0.0.0.0',
    PORT: process.env.PORT || '10000',
  },
  
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
