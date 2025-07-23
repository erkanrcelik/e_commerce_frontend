import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'minio.rhytma.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Remove Next.js debug overlay in production
  devIndicators: false,
  // Disable React Strict Mode in production for better performance
  reactStrictMode: process.env.NODE_ENV === 'development',
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
