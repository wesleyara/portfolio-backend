/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ORIGIN_URL: process.env.ORIGIN_URL,
  },
};

module.exports = nextConfig;
