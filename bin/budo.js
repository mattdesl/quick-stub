#!/usr/bin/env node
var path = require('path')
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    auto: 'a',
    babel: 'b'
  }
})

var entry = argv._[0] || 'index.js:bundle.js'
var deps = ['budo']
var opts = []
opts.push('--live')

if (argv.babel || argv.auto) {
  opts.push('--')
}

if (argv.babel) {
  opts.push('-t', 'babelify')
  deps.push('babelify', 'babel-preset-es2015')
}
if (argv.auto) {
  opts.push('-t [ installify --save ]')
  deps.push('installify')
}

opts = opts.join(' ')

var cmd = 'budo ' + entry + ' ' + opts

var template, output
if (argv.babel) {
  var cwd = process.cwd()
  template = path.resolve(__dirname, '..', 'templates', '.babelrc')
  output = path.join(cwd, '.babelrc')
}

console.log('adding "start" script to package.json:\n  ' + cmd)
require('../')({
  template: template,
  output: output,
  devDependencies: deps,
  packageTransform: {
    scripts: {
      start: cmd
    }
  }
})
