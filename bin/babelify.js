#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var path = require('path')
var cwd = process.cwd()
var output = path.join(cwd, '.babelrc')
var template = path.resolve(__dirname, '..', 'templates', '.babelrc')

var deps = [ 'babelify', 'babel-preset-es2015' ]
var pkg = argv.p || argv.package
console.log('adding "babelify" to package.json with es2015 preset')
require('../')({
  devDependencies: pkg ? undefined : deps,
  dependencies: pkg ? deps : undefined,
  output: output,
  template: template,
  packageTransform: function (data, file) {
    // don't update package.json
    if (!pkg) {
      return
    }

    // if it already exists ...
    if (data.browserify && data.browserify.transform) {
      var transform = [].concat(data.browserify.transform).filter(Boolean)
      if (transform.indexOf('babelify') >= 0) {
        return
      }
    }

    if (!data.browserify) data.browserify = {}
    if (!data.browserify.transform) data.browserify.transform = []
    if (!Array.isArray(data.browserify.transform)) {
      data.browserify.transform = [ data.browserify.transform ].filter(Boolean)
    }
    data.browserify.transform.unshift('babelify')
  }
})
