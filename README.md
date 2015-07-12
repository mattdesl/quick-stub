# @mattdesl/quick-stub

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Some personalized scaffolding tools I am using to automate my workflow. 

This is an experiment / proof of concept. One day it may grow into a generalized tool for scaffolding modules, apps, components, etc. Feel free to fork or post issues if you want to discuss.

## Usage

Install the module globally to access all the bins. 

```sh
npm install @mattdesl/quick-stub -g
```

Now any of the scripts can be run from the command-line. Run them inside a module folder with a `package.json` file. Example:

```sh
# make a module
mkdir my-module
cd my-module
npm init

# add a test and install its dependencies
quick-test tests/index.js
```

The above installs `tape` and `faucet` and writes the following:

```js
var myModule = require('../')
var test = require('tape')

test('your package description', function(t) {

  t.end()
})
```

It also adds the following to your package.json:

```json
"scripts": {
  "test": "node test/index.js | faucet"
}
```

All scripts listed below. As you can see they are highly personalized to my workflow.

- [quick-test](#test)
- [quick-build](#build)
- [quick-bin](#bin)
- [quick-html](#html)
- [quick-budo](#budo)
- [quick-component](#component)

### test

Installs `tape` and `faucet` as dependencies, stubs out a [test file](templates/test.js), and adds a `test` script to your package.json.

Usage: 

```sh
quick-test [entry] [opt]
  [entry]    the file to write, default test.js
  -f         force overwrite (no prompt)
```

Examples:

```sh
quick-test
quick-test tests/index.js
```

### build

Installs `browserify` and `uglify-js`, then adds a `"build"` script to your package.json that looks like this:

```
"scripts": {
  "build": "browserify index.js | uglifyjs -cm > bundle.js"
}
```

Options: 

```
quick-build [entry] [opt]
  [entry]         the entry to build, default index.js
  --outfile, -o   the outfile, default bundle.js
```

### bin

Adds a `bin` field to your package.json and stubs out a simple `bin/index.js` file with the following:

```
#!/usr/bin/env node

```

Options:

```
quick-bin [filename] [opt]
  [filename]      the file name, default index.js
  --minimist, -m  include minimist dependency + code
  --dir           the directory, default 'bin'
```

With `--minimist` the file includes [arg parsing](templates/bin-minimist.js).

### html

Stubs out a simple [HTML5 template](templates/index.html) at the given file, or defaults to `index.html`. 

```sh
quick-html [entry]
  [entry]    the output file, default index.html
```

### budo

Add [budo](https://github.com/mattdesl/budo) to your package.json.

```sh
quick-budo test.js --prod
```

The above command installs budo, garnish, babelify, errorify and adds the following script:

```
"start": "budo test.js -t babelify -p errorify | garnish"
```

### component

Create a folder with a script, css and template file.

```sh
quick-component ./src/components/my-comp
```

Options:

```
quick-component [path] [opts]
  [path]      the folder that will be created
  --css, -c   the name for the style file (default style.css)
  --script, -s   the name for the script file (default index.js)
  --template, -t   the name for the template file (default template.html)
```

## rc configuration

You can add a `.quick-stubrc` file in your `$HOME` directory to change the command that is run with `npm install`. For example, to [npm-install-analytics](https://github.com/mattdesl/npm-install-analytics):

```json
{
  "command": "npm-install-analytics"
}
```

Other configurations may be added at a later point.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/quick-stub/blob/master/LICENSE.md) for details.
