const path = require('path')
const merge = require('webpack-merge')
const _ = require('lodash')
const entryHelper = require('../helpers/entry')

module.exports = class Config {
  constructor (config = {}) {
    this.config = config
    this.settings = _.extend(require('../lib/defaultValues'), this.constructor.load('./yii2-webpack-settings.json'))
  }

  mergeTo (config) {
    this.config = merge.smart(this.config, config)
    return this
  }

  addHtmlPluginToEntries () {
    this.mergeTo({
      plugins: [
        ...entryHelper.generateHtmlPlugins(this.config.entry, this.settings),
      ]
    })
    return this
  }

  static load (configPath) {
    try {
      return require(path.resolve(process.cwd(), configPath))
    }
    catch (e) {
      return {}
    }
  }
}