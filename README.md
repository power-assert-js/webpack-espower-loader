[![Build Status][travis-image]][travis-url]
[![NPM package][npm-image]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![License][license-image]][license-url]

# webpack-espower-loader

Power Assert instrumentor module for webpack.

## Description

`webpack-espower-loader` is a webpack loader module for [power-assert](https://github.com/power-assert-js/power-assert).
`webpack-espower-loader` applies [espower](http://github.com/power-assert-js/espower) to target sources through webpack loader chain.

Pull-requests, issue reports and patches are always welcomed.

See [power-assert](https://github.com/power-assert-js/power-assert) project for more documentation.

## FAQ

#### webpack-espower-loader does not work with babel-loader!

webpack-espower-loader does not work with [babel-loader](https://github.com/babel/babel-loader) due to the change of transpiled code since babel 5.0. Please use [babel-plugin-espower](https://github.com/power-assert-js/babel-plugin-espower) with babel-loader.


## Installation

Install `power-assert` and `webpack-espower-loader` via npm:

```console
$ npm install --save-dev webpack-espower-loader
```

## Caution

For webpack3 or lower, you need to use [the 1.x release of webpack-espower-loader](https://github.com/power-assert-js/webpack-espower-loader/tree/1.x).

```
$ npm install --save-dev webpack-espower-loader@1.0.2
```

## Usage

Configure `webpack.config.js` to apply `webpack-espower-loader` through webpack loader transformation chain. Options are passed through to espower.
If not passed, default options (Same as [espower.defaultOptions()](https://github.com/power-assert-js/espower#var-options--espowerdefaultoptions)) will be used.

```js
{
    module: {
        exprContextCritical: false,
        rules: [{
            test: /_test\.js$/,
            use: [{
                loader: "webpack-espower-loader",
                options: {
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
            }]
        }]
    }
}
```

## Changelog

See [CHANGELOG.md](https://github.com/power-assert-js/webpack-espower-loader/blob/master/CHANGELOG.md).

## Author

* [zoncoen (Kenta Mori)](https://github.com/zoncoen)

## Contributors

* [twada (Takuto Wada)](https://github.com/twada)
* [chrisfarms (Chris Farmiloe)](https://github.com/chrisfarms)

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
