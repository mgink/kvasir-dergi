import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'standalone', // Render.com için devre dışı
  poweredByHeader: false,
  generateEtags: false,
  compress: true,
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
