// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const moment = require('moment')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'grey.js',
    library: "grey",
    libraryTarget: "umd"
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      inject: 'head',
      hash: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        ascii_only: true,
        quote_keys: true,
        screw_ie8: false
      },
      compress: {
        warnings: false,
        drop_console: true,
        properties: false,
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      }
    }),
    new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
  ]
}