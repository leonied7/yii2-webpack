const path = require('path')

module.exports = function (configPath) {
  let config = {}
  try {
    config = require(path.resolve(process.cwd(), configPath))
  }
  catch (e) {}
  return config
}