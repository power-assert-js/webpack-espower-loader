/**
 * webpack-espower-loader - Power Assert instrumentor for webpack.
 *
 * https://github.com/zoncoen/webpack-espower-loader
 *
 * Copyright (c) 2015 Kenta Mori
 * Licensed under the MIT license.
 *   https://github.com/zoncoen/webpack-espower-loader/blob/master/LICENSE
 *
 * The mergeSourceMap() and instrument() functions are:
 *
 * Copyright (c) 2014-2015 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/espower-source/blob/master/MIT-LICENSE.txt
 */
'use strict';

var extend = require('xtend');
var esprima = require('esprima');
var escodegen = require('escodegen');
var espower = require('espower');
var convert = require('convert-source-map');
var transfer = require('multi-stage-sourcemap').transfer;

function mergeSourceMap(incomingSourceMap, outgoingSourceMap) {
  if (typeof outgoingSourceMap === 'string' || outgoingSourceMap instanceof String) {
    outgoingSourceMap = JSON.parse(outgoingSourceMap);
  }
  if (!incomingSourceMap) {
    return outgoingSourceMap;
  }
  return JSON.parse(transfer({
    fromSourceMap: outgoingSourceMap,
    toSourceMap: incomingSourceMap
  }));
}

function instrument(jsCode, filepath, options) {
  var jsAst = esprima.parse(jsCode, {
    tolerant: true,
    loc: true,
    source: filepath
  });
  var modifiedAst = espower(jsAst, options);
  // keep paths absolute by not using `file` and `sourceMapRoot`
  // paths will be resolved by mold-source-map
  return escodegen.generate(modifiedAst, {
    sourceMap: true,
    sourceMapWithCode: true
  });
}

function mergeEspowerOptions(options, filepath, sourcemap) {
  if (sourcemap) {
    return extend(espower.defaultOptions(), options, {
      destructive: true,
      path: filepath,
      sourceMap: sourcemap
    });
  } else {
    return extend(espower.defaultOptions(), options, {
      destructive: true,
      path: filepath
    });
  }
}

module.exports = function(jsCode, inMap) {
  var filepath = this.resourcePath;
  var espowerOptions = mergeEspowerOptions(this.options.espower, filepath, inMap);
  var instrumented = instrument(jsCode, filepath, espowerOptions);
  var outMap = convert.fromJSON(instrumented.map.toString());
  if (inMap) {
    var mergedRawMap = mergeSourceMap(inMap, outMap.toObject());
    outMap = convert.fromObject(mergedRawMap);
    outMap.setProperty('sources', inMap.sources);
    outMap.setProperty('sourcesContent', inMap.sourcesContent);
  } else {
    outMap.setProperty('sources', [filepath]);
    outMap.setProperty('sourcesContent', [jsCode]);
  }
  this.callback(null, instrumented.code, outMap.toObject());
}

