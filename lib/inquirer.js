const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const values = require('./defaultValues')

module.exports = {
  askQuestions: () => {
    let questions = inquirer.prompt([
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
      },
      {
        name: 'webpackDirectory',
        type: 'input',
        message: 'Enter directory to webpack relative @app',
        default: values.webpackDirectory
      },
      {
        name: 'template',
        type: 'input',
        message: 'Enter assets template',
        default: path.resolve(__dirname, values.template),
        filter: function (value) {
          if(questions.ui.activePrompt.opt.validate(value) === true) {
            return path.relative(__dirname, value)
          }
          return value
        },
        validate: function (value) {
          if (value.length <= 1) {
            return 'Please enter assets template.'
          }
          if (!fs.existsSync(path.resolve(__dirname, value))) {
            return 'Template file not exist'
          }
          return true
        }
      }
    ])
    return questions
  }
}