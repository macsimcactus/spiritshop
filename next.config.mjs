/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'placeholder.com',
      'postimages.org',
      'i.postimg.cc',
      'postimg.cc',
      'i.postimg.org',
      'postimg.org'
    ],
  },
  generateBuildId: async () => {
    return 'build-' + new Date().getTime()
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false
    };
    return config;
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
}

export default nextConfig
