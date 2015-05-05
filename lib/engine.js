var install = require('install-if-needed')
var template = require('./template')
var xtend = require('xtend')
var fs = require('fs')
var prompt = require('./prompt')
var chalk = require('chalk')
var install = require('install-if-needed')
var updatePackage = require('./update-package')

module.exports = function(opt, cb) {
  cb = cb || function(){}
  opt = xtend({
    stdio: 'inherit',
    cwd: process.cwd()
  }, opt)

  var outfile = opt.output
  runFile(function(err) {
    if (err && err.message === 'cancelled')
      return process.nextTick(cb)
    if (err)
      console.error(chalk.red('error'), err.message)
    install(opt, runPackage)
  })

  function runFile(next) {
    if (outfile && !opt.replace && fs.existsSync(outfile)) {
      var msg = 'Output ' + chalk.magenta(outfile) + ' already exists, continue?'
      prompt(msg, function(err) {
        if (!err)
          template(opt, next)
        else
          next(new Error('cancelled'))
      })
    } else if (outfile) {
      template(opt, next)
    } else {
      next(null)
    }
  }

  function runPackage(err) {
    if (err)
      return console.error(chalk.red('error'), err.message)

    if (opt.packageTransform) {
      updatePackage(opt.packageTransform, opt, function(err) {
        if (err)
          console.error(chalk.red('error'), err.message)
        else 
          cb(null)
      })
    } else
      cb(null)
  }
}