#!/usr/bin/env node

const inquirer  = require('../lib/inquirer');
const defaultValues = require('../lib/defaultValues')
const fs = require('fs')
const [,, ...args] = process.argv

const run = async () => {
  let credentials = {}
  if(args.includes('--default-config')) {
    credentials = defaultValues
  } else {
    credentials = await inquirer.askQuestions();
  }
  fs.writeFileSync('settings.json', JSON.stringify(credentials))
}

run();