const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({})
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