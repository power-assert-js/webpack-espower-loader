[![Build Status][travis-image]][travis-url]
[![NPM package][npm-image]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![License][license-image]][license-url]

# webpack-espower-loader

Power Assert instrumentor module for webpack.

## Description

`webpack-espower-loader` is a webpack loader module for [power-assert](https://github.com/twada/power-assert).
`webpack-espower-loader` applies [espower](http://github.com/twada/espower) to target sources through webpack loader chain.

Please note that `webpack-espower-loader` is a beta version project. Pull-requests, issue reports and patches are always welcomed.

See [power-assert](https://github.com/twada/power-assert) project for more documentation.

## Installation

Install `power-assert` and `webpack-espower-loader` via npm:

```console
$ npm install --save-dev webpack-espower-loader
```

## Usage

Require `power-assert` in your test.

```diff
--- a/test/your_test.js
+++ b/test/your_test.js
@@ -1,4 +1,4 @@
-var assert = require('assert');
+var assert = require('power-assert');
```

Configure `webpack.config.js` to apply `webpack-espower-loader` through webpack loader transformation chain.

```js
{
    module: {
        loaders: [
            { test: /_test\.js$/, loader: "webpack-espower-loader" }
        ]
    }
}
```

You can pass espower options by including to webpack configuration object (e.g. webpack.config.js).
If not passed, default options (Same as [espower.defaultOptions()](https://github.com/twada/espower#var-options--espowerdefaultoptions)) will be used, but `destructive` option is set to `true` by `espower-source` module.

```js
{
    espower: {
        patterns: [
            'assert(value, [message])',
            'assert.ok(value, [message])',
            'assert.equal(actual, expected, [message])',
            'assert.notEqual(actual, expected, [message])',
            'assert.strictEqual(actual, expected, [message])',
            'assert.notStrictEqual(actual, expected, [message])',
            'assert.deepEqual(actual, expected, [message])',
            'assert.notDeepEqual(actual, expected, [message])'
        ]
    }
}
```

## Changelog

See [CHANGELOG.md](https://github.com/power-assert-js/webpack-espower-loader/blob/master/CHANGELOG.md).

## License

Licensed under the MIT license. See [LICENSE](https://github.com/power-assert-js/webpack-espower-loader/blob/master/LICENSE).

[travis-url]: https://travis-ci.org/power-assert-js/webpack-espower-loader
[travis-image]: https://secure.travis-ci.org/power-assert-js/webpack-espower-loader.svg?branch=master

[npm-url]: https://npmjs.org/package/webpack-espower-loader
[npm-image]: https://badge.fury.io/js/webpack-espower-loader.svg

[depstat-url]: https://gemnasium.com/power-assert-js/webpack-espower-loader
[depstat-image]: https://gemnasium.com/power-assert-js/webpack-espower-loader.svg

[license-url]: https://github.com/power-assert-js/webpack-espower-loader/blob/master/LICENSE
[license-image]: http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat
