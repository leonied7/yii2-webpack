const inquirer = require('inquirer')
const fs = require('fs')
const {resolve} = require('path')
const values = require('./defaultValues')

module.exports = {
  askQuestions: () => {
    return inquirer.prompt([
      {
        name: 'assetDirectory',
        type: 'input',
        message: 'Enter output asset directory',
        default: values.assetDirectory,
        validate: function (value) {
          if (value.length) {
            return true
          }
          return 'Please enter output asset directory.'
        }
      },{
        name: 'namespace',
        type: 'input',
        message: 'Enter a namespace before your package.json',
        default: values.namespace
      },
      {
        name: 'devConfig',
        type: 'input',
        message: 'Enter the file of the development configuration',
        default: values.devConfig,
        validate: function (filePath) {
          let fullPath = resolve(process.cwd(), filePath)
          try {
            return fs.lstatSync(fullPath).isFile() ? true : 'Is not a file'
          } catch (e) {
            return e.message
          }
        }
      },
      {
        name: 'prodConfig',
        type: 'input',
        message: 'Enter the file of the production configuration',
        default: values.prodConfig,
        validate: function (filePath) {
          let fullPath = resolve(process.cwd(), filePath)
          try {
            return fs.lstatSync(fullPath).isFile() ? true : 'Is not a file'
          } catch (e) {
            return e.message
          }
        }
      }
    ])
  }
}