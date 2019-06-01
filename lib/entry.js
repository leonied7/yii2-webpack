const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')
const {resolve, relative} = require('path')

module.exports = class Entry {
  constructor (entryName, {webpackDirectory, assetDirectory, template = resolve(__dirname, '../index.ejs'), ...options}) {
    this.entryName = entryName
    let namespace = webpackDirectory ? `@app/${webpackDirectory}` : options.namespace
    this.nameSpace = this.constructor.correctDirectory(namespace)
    this.assetDirectory = this.constructor.correctDirectory(assetDirectory)
    this.template = template
    this.options = options
  }

  static get firstLastSlash () {
    return /^\/|\/$/g
  }

  static correctDirectory (directory) {
    return directory.replace('/\\/g', '/').replace(this.firstLastSlash, '')
  }

  /**
   * используется внутри шаблона, формат <namespace></assetDirectory>
   * пример: app/assets
   * @return {string}
   */
  get namespace () {
    let namespace = [this.nameSpace[0] === '@' ? this.nameSpace.substr(1) : this.nameSpace, this.assetDirectory]
    _.pull(namespace, '')
    return namespace.join('/').replace(/\//g, '\\')
  }

  getHtmlPluginToEntry () {
    return new HtmlWebpackPlugin({
      inject: false,
      template: resolve(this.template),
      chunks: [],
      entry: this.entryName,
      yii2Entry: this,
      filename: this.filename,
      alwaysWriteToDisk: true
    })
  }

  /**
   * формирует filename формата <assetDirectory/><className>.php
   * пример: assets/MainAsset.php
   * @return {string}
   */
  get filename () {
    return resolve(process.cwd(), `${this.constructor.addLastSlash(this.assetDirectory)}${this.className}.php`)
  }

  get className () {
    return `${_.upperFirst(_.camelCase(this.entryName))}Asset`
  }

  /**
   * формирует sourcePath формата <namespace>/<outputPath>
   * пример: @app/dist
   * @param outputPath
   * @return {string}
   */
  getSourcePath (outputPath) {
    return this.nameSpace + this.constructor.calculateDist(outputPath)
  }

  static calculateDist (outputPath) {
    let resultPath = relative(process.cwd(), outputPath)
    return this.addFirstSlash(resultPath)
  }

  static addFirstSlash (path) {
    return path ? `/${path}` : path
  }

  static addLastSlash (path) {
    return path ? `${path}/` : path
  }
}