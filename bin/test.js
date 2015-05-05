#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var path = require('path')

var output = argv._[0] || defaultOutput
if (output && !path.extname(output))  //supprt "quick-test test/"
  output = path.join(output, defaultOutput)

var template = path.resolve(__dirname, '..', 'templates', 'test.js')
require('../')({
  devDependencies: ['tape', 'faucet'],
  defaultOutput: 'test.js',
  output: output,
  template: template,
  replace: argv.f || argv.force,
  packageTransform: {
    scripts: {
      test: "node "+output+" | faucet"
    }
  }
})