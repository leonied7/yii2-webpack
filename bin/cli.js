#!/usr/bin/env node
const defaultValues = require('../lib/defaultValues')
const fs = require('fs')
const path = require('path')
const [, , ...args] = process.argv

const run = async () => {
  let credentials = {}
  if (args.includes('--default-config')) {
    credentials = defaultValues
  } else {
    const inquirer = require('../lib/inquirer')
    credentials = await inquirer.askQuestions()
  }
  fs.writeFileSync(path.resolve(__dirname, '../settings.json'), JSON.stringify(credentials))
}

run()