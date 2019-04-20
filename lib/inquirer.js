const inquirer = require('inquirer')
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
      },
      {
        name: 'webpackDirectory',
        type: 'input',
        message: 'Enter the directory up to webpack relative to @app',
        default: values.webpackDirectory
      }
    ])
  }
}