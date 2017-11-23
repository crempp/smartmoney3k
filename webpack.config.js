var HTMLWebpackPlugin = require('html-webpack-plugin');
var webpack = require ('webpack');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

var devFlagPlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            }
          ]
      },
      {
        test: /\.scss$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            },
            {
              loader: "sass-loader"
            }
          ]
      }
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  plugins: [
    new webpack.DefinePlugin({
      // 'process.env.NODE_ENV': '"production"'
      'process.env.NODE_ENV': '"development"'
    }),
    HTMLWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    devFlagPlugin,
    // new BundleAnalyzerPlugin(),
    // new webpack.ProvidePlugin({
    //   // d3: "d3", // if you add this line you can remove the import in the code
    //   "window.d3": "d3" // this adds d3 in the window object for techan
    // })
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.jsx', 'json'],
  },
};