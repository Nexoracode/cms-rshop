/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  reactStrictMode: false,
  /* env: {
    NEXT_PUBLIC_BASE_URL: "http://172.18.100.42:3001/api",
  }, */
  async rewrites() {
    return [
      {
        source: "/api/:path*", // هر چی به /api خورده بشه
        destination: "http://172.18.100.42:3000/api/:path*", // می‌ره به بک‌اند
      },
    ];
  }
};

module.exports = nextConfig;
