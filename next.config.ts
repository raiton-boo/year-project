import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  reactCompiler: true,
  basePath: isProd ? '/year-project' : '',
  assetPrefix: isProd ? '/year-project/' : '',
};

export default nextConfig;
