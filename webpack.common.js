const ChunksFromEntryPlugin = require('./plugins/ChunksFromEntry')
const entryHelper = require('./helpers/entry')
const merge = require('webpack-merge')
const configLoader = require('./helpers/config')
const common = configLoader('./webpack.common.js')
const settings = configLoader('./yii2-webpack-settings.json') || require('./lib/defaultValues')

module.exports = merge.smart({
  plugins: [
    ...entryHelper.generateHtmlPlugins(common.entry, settings),
    new ChunksFromEntryPlugin()
  ]
}, common)