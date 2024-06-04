/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["node-appwrite"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.nflxext.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
