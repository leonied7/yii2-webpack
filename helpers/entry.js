const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')
const path = require('path')

module.exports = {
  /**
   * @param {object} entry
   * @param assetDir
   * @param options
   * @return {object[]}
   */
  generateHtmlPlugins: (entry, {assetDir, ...options}) => {
    return Object.keys(entry).reduce((result, key) => {
      result.push(new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(__dirname, '../index.ejs'),
        chunks: [],
        entry: key,
        additionOptions: options,
        filename: path.resolve(process.cwd(), assetDir + '/' + _.upperFirst(_.camelCase(key)) + 'Asset.php'),
        alwaysWriteToDisk: true
      }))
      return result
    }, [])
  }
}