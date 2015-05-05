#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var mkdirp = require('mkdirp')
var path = require('path')
var base = require('require-package-name').base
var relative = require('require-path-relative')

var cwd = process.cwd()
var deps = []
var dir = argv.dir || 'bin'

var templateFile = 'bin.js'
if (argv.m || argv.minimist) {
  deps.push('minimist')
  templateFile = 'bin-minimist.js'
}

var template = path.resolve(__dirname, '..', 'templates', templateFile)

console.log('adding "bin" script to package.json')
mkdirp(path.join(cwd, dir), function(err) {
  if (err) throw err

  var output = argv._[0] || 'index.js'
  var outfile = path.basename(output)
  output = path.join(dir, outfile)
  require('../')({
    output: output,
    template: template,
    devDependencies: deps,
    packageTransform: function(data, file) {
      var name = base(data.name)
      if (!data.bin) 
        data.bin = {}
      data.bin[name] = relative(path.dirname(file), dir, outfile)
    }
  })
})
  