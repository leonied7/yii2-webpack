const ChunksFromEntryPlugin = require('./plugins/ChunksFromEntry')
const config = require('./lib/config')
let configuration = new config({
  mode: 'production'
})
configuration
  .mergeTo(config.load('./webpack.prod.js'))
  .addHtmlPluginToEntries()
  .mergeTo({
    plugins: [
      new ChunksFromEntryPlugin(),
    ]
  })

module.exports = configuration.config