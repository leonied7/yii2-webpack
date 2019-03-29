const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const configLoader = require('./helpers/config')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackHarddiskPlugin()
  ]
}, configLoader('./webpack.dev.js'))

