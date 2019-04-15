const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')
const {resolve, relative} = require('path')

module.exports = {
  firstLastSlash: /^\/|\/$/g,
  /**
   * @param {object} entry
   * @param assetDirectory
   * @param webpackDirectory
   * @param template
   * @param options
   * @return {object[]}
   */
  generateHtmlPlugins (entry, {assetDirectory, webpackDirectory, template = resolve(__dirname, '../index.ejs'), ...options}) {
    assetDirectory = this.correctDirectory(assetDirectory)
    webpackDirectory = this.correctDirectory(webpackDirectory)
    return Object.keys(entry).reduce((result, entryName) => {
      result.push(new HtmlWebpackPlugin({
        inject: false,
        template: resolve(template),
        chunks: [],
        entry: entryName,
        yii2: {
          namespace: this.getNamespace(webpackDirectory, assetDirectory),
          sourcePath: this.addFirstSlash(webpackDirectory),
          calculateDist (outputPath) {
            let resultPath = relative(process.cwd(), outputPath)
            return resultPath ? '/' + resultPath : resultPath
          }
        },
        additionOptions: options,
        filename: this.calculateFilename(assetDirectory, entryName),
        alwaysWriteToDisk: true
      }))
      return result
    }, [])
  },
  correctDirectory (directory) {
    return directory.replace('/\\/g', '/').replace(this.firstLastSlash, '')
  },
  getNamespace (webpackDirectory, assetDirectory) {
    let namespace = [webpackDirectory, assetDirectory].join('/').replace(this.firstLastSlash, '')
    if (namespace) {
      return `\\${namespace}`.replace(/\//g, '\\')
    }
    return namespace
  },
  calculateFilename (assetDirectory, entryName) {
    return resolve(process.cwd(), this.addLastSlash(assetDirectory) + _.upperFirst(_.camelCase(entryName)) + 'Asset.php')
  },
  addFirstSlash (path) {
    return path ? `/${path}` : path
  },
  addLastSlash (path) {
    return path ? `${path}/` : path
  }
}