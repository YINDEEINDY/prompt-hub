import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "media2.dev.to" },
      { protocol: "https", hostname: "media.dev.to" },
      { protocol: "https", hostname: "dev-to-uploads.s3.amazonaws.com" },
    ],
  },
};

export default nextConfig;
