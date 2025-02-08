/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  env: {
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN,
  },
  // Adding server-side environment configuration
  serverRuntimeConfig: {
    mercadoPago: {
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    },
  },
  // Adding public runtime configuration (if needed)
  publicRuntimeConfig: {
    // Add any public configuration here
    isProd: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
