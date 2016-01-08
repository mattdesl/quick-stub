#!/usr/bin/env node
var path = require('path')
var cwd = process.cwd()
var output = path.join(cwd, '.babelrc')
var template = path.resolve(__dirname, '..', 'templates', '.babelrc')

console.log('adding "babelify" to package.json with es2015 preset')
require('../')({
  devDependencies: [ 'babelify', 'babel-preset-es2015' ],
  output: output,
  template: template,
  packageTransform: function (data, file) {
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
