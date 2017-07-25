
var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

var path = require('path');
var fs = require('fs');

var dir = fs.realpathSync(process.cwd());

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(dir, 'build'),
    pathinfo: true,
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(dir, 'src'),
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(dir, 'src'),
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(dir, 'node_modules'),
          path.resolve(dir, 'src')
        ],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(dir, 'src/styles')
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      inject: true,
      template: path.resolve(dir, 'src/index.html')
    })
  ],
  devServer: {
    contentBase: 'build/development',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
