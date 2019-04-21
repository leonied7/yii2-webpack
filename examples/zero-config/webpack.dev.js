const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const publicPath = 'http://localhost:8080/'

module.exports = merge.smart(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  },
  devServer: {
    headers: {'Access-Control-Allow-Origin': '*'},
    disableHostCheck: true
  }
})

