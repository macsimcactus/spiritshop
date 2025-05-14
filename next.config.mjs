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
  },
  generateBuildId: async () => {
    return 'build-' + new Date().getTime()
  },
  webpack: (config, { isServer }) => {
    // Добавляем внешние зависимости
    config.externals = [...(config.externals || []), {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'date-fns': 'dateFns'
    }];

    // Добавляем fallback для node модулей
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false
    };

    return config;
  }
}

export default nextConfig
