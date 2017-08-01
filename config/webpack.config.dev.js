const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'grey.js',
    library: "grey",
    libraryTarget: "umd"
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: ['es3ify-loader', 'babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      inject: 'head'
    }),
    new DashboardPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev')
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '../build'),
      path.join(__dirname, '..')
    ],
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}