const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const publicPath = ''

module.exports = merge.smart(common, {
  mode: 'production',
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  }
})