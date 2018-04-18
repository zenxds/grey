// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const moment = require('moment')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'grey.js',
    library: "grey",
    libraryTarget: "umd"
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ['es3ify-loader', 'babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({}),
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: true,
        warnings: true,
        output: {
          ascii_only: true,
          quote_keys: true
        },
        compress: {
          drop_console: true,
          properties: false
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      inject: 'head',
      hash: true
    }),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  ]
}