# @mattdesl/quick-stub

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Stubs some personalized files and configurations for building modules. This is experimental, and may eventually become a more formalized tool for others to build their own scaffolding CLIs.

**Note:** This is mostly a proof-of-concept. 

## Usage

Install the script globally to access its bins:

```sh
npm install @mattdesl/quick-stub -g
```

Then run the desired script. Examples:

```sh
#write a test file
quick-test tests/test.js

#add a stub bin/index.js, install minimist
quick-bin --minimist

#add browserify to your package.json script
quick-build --outfile demo/bundle.js
```

Scripts:

- [quick-build](#build)
- [quick-bin](#bin)
- [quick-html](#html)
- [quick-test](#test)

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
  --minimist, -m  include minimist as a dependency
  --dir           the directory, default 'bin'
```

### html

Stubs out a simple HTML5 template at the given file, or defaults to `index.html`. 

```sh
quick-html [entry]
  [entry]    the output file, default index.html
```

### test

```sh
quick-test [entry] [opt]
  [entry]    the file to write, default test.js
  -f         force overwrite (no prompt)
```

Installs `tape` and `tap-spec` as dependencies, stubs out a test file like this:

```js
var quickStub = require('../')
var test = require('tape')

test('some personalized file stubbing tools', function(t) {
  
  t.end()
})
```

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/quick-stub/blob/master/LICENSE.md) for details.
