const ChunksFromEntryPlugin = require('./plugins/ChunksFromEntry')
const entryHelper = require('./helpers/entry')
const merge = require('webpack-merge')
const configLoader = require('./helpers/config')
const common = configLoader('./webpack.common.js')

module.exports = merge.smart({
  plugins: [
    ...entryHelper.generateHtmlPlugins(common.entry),
    new ChunksFromEntryPlugin()
  ]
}, common)