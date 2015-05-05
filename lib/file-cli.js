var path = require('path')
var fs = require('fs')
var engine = require('../')
var xtend = require('xtend')

module.exports = function(argv, opt) {
  var defaultOutput = opt.defaultOutput
  var output = argv._[0] || defaultOutput
  if (output && !path.extname(output)) 
    output = path.join(output, defaultOutput)

  var template = path.resolve(__dirname, '..', 'templates', opt.template)
  engine(xtend({
    replace: argv.f || argv.force
  }, opt, {
    output: output,
    template: template,
  }))
}