var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require ('webpack');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
})


module.exports = {
  entry: __dirname + '/app/index.js',
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],

  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    devFlagPlugin
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.jsx', 'json'],
  },
};