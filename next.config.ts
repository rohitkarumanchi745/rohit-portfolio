import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },

  // Enable compression
  compress: true,

  // Reduce bundle size
  poweredByHeader: false,
};

export default nextConfig;

