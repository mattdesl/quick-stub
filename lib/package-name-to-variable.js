var varName = require('variable-name')
var base = require('require-package-name').base

module.exports = function(pkgName) {
  var parts = base(pkgName)
  return varName(parts)
}