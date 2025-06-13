import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ یہ لائن add کریں
  },
};

export default nextConfig;
