#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))

var deps = ['browserify', 'uglify-js']
var entry = argv._[0] || 'index.js'
var outfile = argv.o || argv.outfile || 'bundle.js'
var cmd = "browserify "+entry+" | uglifyjs -cm > "+outfile

console.log('adding "build" script to package.json:\n  '+cmd)
require('../')({
  devDependencies: deps,
  packageTransform: {
    scripts: {
      build: cmd
    }
  }
})