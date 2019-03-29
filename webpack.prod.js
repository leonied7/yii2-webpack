const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const configLoader = require('./helpers/config')

module.exports = merge.smart(common, {
  mode: 'production'
}, configLoader('./webpack.prod.js'))