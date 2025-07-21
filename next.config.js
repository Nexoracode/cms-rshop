/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_BASE_URL: "http://172.18.100.42:3001/api",
  }
};

module.exports = nextConfig;
