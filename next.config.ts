import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Preserve old portfolio video links after moving assets into categories.
  async rewrites() {
    return [
      {
        source: "/videos/:filename",
        destination: "/video/Dynamic%20Website/:filename",
      },
    ];
  },
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
