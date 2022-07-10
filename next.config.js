/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["hips.hearstapps.com"],
  },
};

module.exports = nextConfig;
