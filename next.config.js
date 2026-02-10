/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      hmrRefreshes: true,
    },
  },
  /* typescript: {
    ignoreBuildErrors: true,
  }, */
  logging: false,
  images: {
    domains: ["dl.poshtybanman.ir"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        //destination: "http://192.168.32.172:3000/api/:path*",
        destination: "https://app-backend-rshop-nodejs.roohbakhshac.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
