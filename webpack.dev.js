const ChunksFromEntryPlugin = require('./plugins/ChunksFromEntry')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const config = require('./lib/config')
let configuration = new config({
  mode: 'development'
})
configuration
  .mergeTo(config.load(configuration.settings.devConfig))
  .addHtmlPluginToEntries()
  .mergeTo({
    plugins: [
      new ChunksFromEntryPlugin(),
      new HtmlWebpackHarddiskPlugin()
    ]
  })

module.exports = configuration.config