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
  generateHtmlPlugins (entry, {assetDirectory, webpackDirectory, template, ...options}) {
    assetDirectory = this.correctDirectory(assetDirectory)
    webpackDirectory = this.correctDirectory(webpackDirectory)
    let currentPath = [webpackDirectory, assetDirectory].join('/').replace(this.firstLastSlash, '')
    return Object.keys(entry).reduce((result, key) => {
      result.push(new HtmlWebpackPlugin({
        inject: false,
        template: resolve(__dirname, template),
        chunks: [],
        entry: key,
        yii2: {
          namespace: (currentPath ? '\\' + currentPath : currentPath).replace(/\//g, '\\'),
          sourcePath: (webpackDirectory ? '/' + webpackDirectory : webpackDirectory),
          calculateDist (outputPath) {
            let resultPath = relative(process.cwd(), outputPath)
            return resultPath ? '/' + resultPath : resultPath
          }
        },
        additionOptions: options,
        filename: resolve(process.cwd(), (assetDirectory ? assetDirectory + '/' : assetDirectory) + _.upperFirst(_.camelCase(key)) + 'Asset.php'),
        alwaysWriteToDisk: true
      }))
      return result
    }, [])
  },
  correctDirectory (directory) {
    return directory.replace('/\\/g', '/').replace(this.firstLastSlash, '')
  }
}