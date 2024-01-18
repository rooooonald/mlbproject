/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "img.mlbstatic.com",
      },
    ],
  },
};

module.exports = nextConfig;
