var path = require('path');
var webpack = require ('webpack');
var merge = require('webpack-merge');
var common = require('./base.config.js');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.normalize(__dirname + '/../build')
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    })
  ]
});