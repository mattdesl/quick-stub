#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');

var deps = ['browserify', 'uglify-js'];
var entry = argv._[0] || 'src/index.js';

let defaultOutfile = 'bundle.js';
let defaultDir = 'app';
if (argv.dir && typeof argv.dir === 'string') {
  defaultDir = argv.dir;
}

if (argv.dir !== false) {
  defaultOutfile = path.join(defaultDir, defaultOutfile);
}

var outfile = argv.o || argv.outfile || defaultOutfile;
var cmd = 'browserify ' + entry + ' | uglifyjs -m -c warnings=false > ' + outfile;

console.log('adding "bundle" script to package.json:\n  ' + cmd);
require('../')({
  devDependencies: deps,
  packageTransform: {
    scripts: {
      bundle: cmd
    }
  }
})
;
