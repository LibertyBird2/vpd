import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale/projects",
        destination: "/:locale/programs",
        permanent: true,
      },
      {
        source: "/:locale/projects/:slug",
        destination: "/:locale/programs/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
