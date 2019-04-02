const inquirer = require('inquirer')
const values = require('./defaultValues')

module.exports = {
  askQuestions: () => {
    const questions = [
      {
        name: 'assetDir',
        type: 'input',
        message: 'Enter output asset directory',
        default: values.assetDir,
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter output asset directory.';
          }
        }
      }
    ]
    return inquirer.prompt(questions)
  }
}