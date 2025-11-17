/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Disable Turbopack to fix font loading issues
    turbo: false,
    // Enable experimental optimizations
    optimizeFonts: true,
    optimizeCss: true,
  },
  // Enable React Strict Mode
  reactStrictMode: true,
}

export default nextConfig
