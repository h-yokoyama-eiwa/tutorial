const path = require('path')
const fs = require('fs')
const hash = require('hash-sum')

const GasPlugin = require('gas-webpack-plugin')
const Es3ifyPlugin = require('es3ify-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const cacheIdentifier = hash([
  require('cache-loader/package.json').version,
  fs.readFileSync('./webpack.config.gas.js', 'utf-8'),
  process.env.NODE_ENV
])

const webpack = require('webpack')

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: ['./server/Code.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'Code.js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.join(__dirname, 'node_modules/.cache/gas'),
              cacheIdentifier
            }
          },
          { loader: 'thread-loader' }
        ]
      },
      {
        test: /\.[jt]s$/,
        exclude: [/node_modules/, /src/],
        use: {
          loader: 'babel-loader', // loader名
          options: { // Babelの設定
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new GasPlugin(),
    new Es3ifyPlugin(),
    new CopyWebpackPlugin([path.join(__dirname, 'appsscript.json')]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  optimization: {
    minimize: false
  }
}
