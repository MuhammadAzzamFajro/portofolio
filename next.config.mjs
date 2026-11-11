/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All images served from own domain
    unoptimized: true,
  },
};

export default nextConfig;
