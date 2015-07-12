#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))

var entry = argv._[0] || 'index.js:bundle.js'
var deps = ['budo', 'garnish']
var opts = []
var prod = argv.prod || argv.p
opts.push('--live')
opts.push('--verbose')

if (prod || argv.babel || argv.auto || argv.errorify)
  opts.push('--')

if (argv.babel || prod) {
  opts.push('-t', 'babelify')
  deps.push('babelify')
}
if (argv.auto) {
  opts.push('-t [ installify --save ]')
  deps.push('installify')
}
if (argv.errorify || prod) {
  opts.push('-p', 'errorify')
  deps.push('errorify')
}

opts = opts.join(' ')

var cmd = 'budo ' + entry + ' ' + opts + ' | garnish'

console.log('adding "start" script to package.json:\n  ' + cmd)
require('../')({
  devDependencies: deps,
  packageTransform: {
    scripts: {
      start: cmd
    }
  }
})
