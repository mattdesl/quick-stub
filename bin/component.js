#!/usr/bin/env node
var argv = require('minimist')(process.argv.slice(2))
var cwd = process.cwd()
var mkdirp = require('mkdirp')
var path = require('path')
var fs = require('fs')

var style = argv.c || argv.css || 'style.css'
var script = argv.s || argv.script || 'index.js'
var tpl = argv.t || argv.template || 'template.html'
var output = path.join(cwd, argv._[0])

mkdirp(output, function(err) {
    if (err) throw err

    var all = [style, script, tpl];
    all.forEach(function(file) {
        fs.writeFile(path.join(output, file), '', function(err) {
            if (err) throw err
        });
    })
})
