var closestPackage = require('closest-package')
var readPackage = require('read-json')
var assign = require('xtend/mutable')
var fs = require('fs')
var chalk = require('chalk')

module.exports = function(fn, opt, cb) {
  var cwd = opt.cwd
  if (typeof fn !== 'function') {
    fn = simple.bind(null, fn)
  }

  closestPackage(cwd, function(err, file) {
    if (err || !file) return cb(new Error('Could not find package.json at\n'+file))
    readPackage(file, function(err, data) {
      if (err || !data) return cb(new Error('could not read package.json at\n'+file))
      fn(data, file)
      fs.writeFile(file, JSON.stringify(data, undefined, 2), cb)
    })
  })
}

function simple(obj, pkg) {
  //merges child nodes
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      simpleMerge(obj, pkg, key)
    }
  }
}

function simpleMerge(obj, pkg, key) {
  var prop = obj[key]
  if (!pkg[key]) { //doesn't exist, merge it all
    pkg[key] = prop
  } else { 
    var justReplace = ['boolean', 'string', 'number']

    if (Array.isArray(pkg[key]) && Array.isArray(prop)) {
      var arr = pkg[key]
      prop.forEach(function(item) {
        if (arr.indexOf(item) === -1)
          arr.push(item)
      })
    }
    //e.g. 'scripts' exists, only merge children
    else if (typeof pkg[key] === 'object'
      && typeof prop === 'object') {
      assign(pkg[key], prop)
    } 
    //string/bool/number, replace entirely
    else if (justReplace.indexOf(typeof pkg[key]) !== -1) {
      pkg[key] = prop
    } 
    //array, merge items that don't exist yet
    else {
      console.error(chalk.yellow('warn'), 'unhandled packageTransform data:', key)
    }
  }
}