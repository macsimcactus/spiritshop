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
  webpack: (config, { isServer }) => {
    // Добавляем fallback для node модулей
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false
    };

    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name(module, chunks, cacheGroupKey) {
              const moduleFileName = module
                .identifier()
                .split('/')
                .reduceRight((item) => item);
              return `${cacheGroupKey}-${moduleFileName}`;
            },
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }
}

export default nextConfig
