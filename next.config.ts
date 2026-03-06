import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactCompiler: true,
  basePath: '/year-project',
  assetPrefix: '/year-project/',
};

export default nextConfig;
