/** @type {import('next').NextConfig} */

// Fix stock charts with next.js 12
// https://github.com/react-financial/react-financial-charts/issues/606#issuecomment-1001087068
const withTM = require('next-transpile-modules')([
  'd3-array',
  'd3-format',
  'd3-time',
  'd3-time-format',
  'react-financial-charts',
  '@react-financial-charts/annotations',
  '@react-financial-charts/axes',
  '@react-financial-charts/coordinates',
  '@react-financial-charts/core',
  '@react-financial-charts/indicators',
  '@react-financial-charts/interactive',
  '@react-financial-charts/scales',
  '@react-financial-charts/series',
  '@react-financial-charts/tooltip',
  '@react-financial-charts/utils',
]);

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Important: return the modified config
    return config
  },
}

module.exports = withTM(nextConfig);
