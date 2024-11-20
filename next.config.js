/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com'],
  },
};

module.exports = nextConfig;
