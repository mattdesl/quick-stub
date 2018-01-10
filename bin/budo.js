#!/usr/bin/env node
var path = require('path');
var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    auto: 'a',
    babel: 'b'
  }
});

var entry = argv._[0] || 'src/index.js:bundle.js';
var deps = ['budo'];
var opts = [];
opts.push('--live');

if (argv.dir !== false) {
  const dir = (typeof argv.dir === 'string' && argv.dir) ? argv.dir : 'app';
  opts.push('--dir', dir);
}

if (argv.babel || argv.auto || argv.glslify) {
  opts.push('--');
}

if (argv.babel) {
  opts.push('-t', 'babelify');
  deps.push('babelify', 'babel-preset-env', 'babel-core');
}

if (argv.glslify) {
  opts.push('-t', 'glslify');
  deps.push('glslify');
}

if (argv.auto) {
  opts.push('-t [ installify --save ]');
  deps.push('installify');
}

opts = opts.join(' ');

var cmd = 'budo ' + entry + ' ' + opts;

var template, output;
if (argv.babel) {
  var cwd = process.cwd();
  template = path.resolve(__dirname, '..', 'templates', '.babelrc');
  output = path.join(cwd, '.babelrc');
}

console.log('adding "start" script to package.json:\n  ' + cmd);
require('../')({
  template: template,
  output: output,
  devDependencies: deps,
  packageTransform: {
    scripts: {
      start: cmd
    }
  }
});
