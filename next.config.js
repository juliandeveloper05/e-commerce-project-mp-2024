/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    // Añade aquí cualquier otro dominio que necesites para las imágenes
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/images/**',
      },
    ],
  },
};

module.exports = nextConfig;
