#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))

require('../lib/file-cli')(argv, {
  defaultOutput: 'index.html',
  template: 'index.html',
  params: {
    entry: argv.e || argv.entry || 'bundle.js'
  }
})