var merge = require('webpack-merge');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var common = require('./production.config');

module.exports = merge(common, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ]
});