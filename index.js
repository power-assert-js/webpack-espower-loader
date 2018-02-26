/**
 * webpack-espower-loader - Power Assert instrumentor for webpack.
 *
 * https://github.com/power-assert-js/webpack-espower-loader
 *
 * Copyright (c) 2015 Kenta Mori
 * Licensed under the MIT license.
 *   https://github.com/power-assert-js/webpack-espower-loader/blob/master/LICENSE
 */
'use strict';

var convert = require('convert-source-map');
var espower = require('espower-source');
var extend = require('xtend');
var loaderUtils = require('loader-utils');

module.exports = function(jsCode, inMap) {
  var filepath = this.resourcePath;
  var options = loaderUtils.getOptions(this) || {};
  if (inMap) {
    options = extend(options, {
      sourceMap: inMap,
    });
  }
  if (this.cacheable) {
    this.cacheable();
  }
  var poweredCodeWithMap = espower(jsCode, filepath, options);
  var outMap = convert.fromSource(poweredCodeWithMap);
  this.callback(null, convert.removeComments(poweredCodeWithMap), outMap.toObject());
};

