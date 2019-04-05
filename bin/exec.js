#!/usr/bin/env node
const path = require('path')
const yargs = require('yargs')
const _ = require('lodash')
yargs.options({
  'yii2-webpack-config': {
    type: 'string',
    describe: 'Config type',
    choices: ['dev', 'prod', 'common'],
    demandOption: true
  },
  'yii2-webpack-command': {
    type: 'string',
    describe: 'Webpack command',
    defaultDescription: "webpack or webpack-dev-server",
    default: yargs.argv['yii2-webpack-config'] === 'dev' ? 'webpack-dev-server' : 'webpack',
    demandOption: true
  },
  config: {
    type: 'string',
    describe: 'Path to the config file',
    default: path.relative(process.cwd(), `${path.dirname(__dirname)}/webpack.${yargs.argv['yii2-webpack-config']}.js`),
    demandOption: true
  }
})

process.argv = _.reduce(yargs.argv, (result, value, key) => {
  if (['_', '$0'].includes(key)) {
    return result
  }
  result.push(`--${key}`)
  if(value !== true && value) {
    result.push(value)
  }
  return result
}, process.argv.slice(0, 2))

const command = yargs.argv['yii2-webpack-command']
const pkgPath = require.resolve(`${command}/package.json`)
const pkg = require(pkgPath)
require(path.resolve(
  path.dirname(pkgPath),
  pkg.bin[command]
))