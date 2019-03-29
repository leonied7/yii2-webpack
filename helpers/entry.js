const HtmlWebpackPlugin = require('html-webpack-plugin')
const _ = require('lodash')
const path = require('path')

module.exports = {
  /**
   * @param {object} entry
   * @return {object[]}
   */
  generateHtmlPlugins: (entry) => {
    return Object.keys(entry).reduce((result, key) => {
      result.push(new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(__dirname, '../index.ejs'),
        chunks: [],
        entry: key,
        filename: path.resolve(process.cwd(), 'assets/' + _.upperFirst(_.camelCase(key)) + 'Asset.php'),
        alwaysWriteToDisk: true
      }))
      return result
    }, [])
  }
}