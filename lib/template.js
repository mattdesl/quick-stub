var readPackage = require('read-closest-package')
var xtend = require('xtend')
var minstache = require('minstache')
var escaped = require('jsesc')
var relative = require('require-path-relative')
var defaultPackage = require('./bare-package.json')
var chalk = require('chalk')
var varName = require('./package-name-to-variable')

var fs = require('fs')
var path = require('path')

module.exports = function(opt, cb) {
  var cwd = opt.cwd
  var template = opt.template
  var output = opt.output
  var outfile = path.basename(output)
  var outdir = path.join(cwd, path.dirname(output))
  var params = opt.params || {}

  fs.readFile(template, 'utf8', function(err, str) {
    if (err)
      return cb(err)

    readPackage(opt, function(err, pkg) {
      if (err)
        console.error(chalk.yellow("warn"), err.message)

      pkg = xtend(defaultPackage, pkg)
      var params = getParams(pkg)
      str = minstache(str, params)
      fs.writeFile(output, str, cb)
    })
  })

  function getParams(pkg) {
    return xtend({
      package: pkg,
      variable: {
        name: varName(pkg.name)
      },
      escaped: {
        description: escaped(pkg.description)
      },
      path: {
        main: relative(outdir, cwd)
      }
    }, params)
  }
}
