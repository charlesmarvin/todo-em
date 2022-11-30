/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "src/public",
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = withPWA(nextConfig);
