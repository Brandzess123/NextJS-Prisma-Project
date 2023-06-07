/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tailwindui.com", "assets.algoexpert.io", "google.com"],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
