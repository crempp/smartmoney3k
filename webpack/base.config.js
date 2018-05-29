var path = require('path');
var webpack = require ('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: path.normalize(__dirname + '/../app/index.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
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
    path: path.normalize(__dirname + '/../build')
  },
  plugins: [
    new CleanWebpackPlugin(
      [path.normalize('build')],
      { root: path.normalize(__dirname + '/..') }
    ),
    new HTMLWebpackPlugin({
      template: path.normalize(__dirname + '/../app/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.jsx', 'json'],
  },
};
