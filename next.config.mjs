import createMDX from "@next/mdx";
import createBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "mdx", "ts"],
  transpilePackages: ["mui-tel-input"],
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.randevu.technology",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/treffen",
        destination: "/termine",
        permanent: true,
      },
      {
        source: "/treffen/:slug*",
        destination: "/termine/treffen/:slug*",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX();

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withMDX(nextConfig));
