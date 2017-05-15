'use strict';

var assert = require('power-assert');
var sourceMap = require("source-map");
var Consumer = sourceMap.SourceMapConsumer;
var espower = require('../index');
var fs = require('fs');

describe('webpack-espowered-loader', function() {
  it('should return powered source', function() {
    var source = fs.readFileSync('test/fixtures/instrumentation/fixture.js', 'utf8');

    // set context for webpack loader
    var context = {};
    context.resourcePath = '/path/to/original.js';
    context.options = {};
    context.callback = function(err, powered, map) {
      var expected = fs.readFileSync('test/fixtures/instrumentation/expected.js', 'utf8');
      assert.equal(powered, expected + '\n', 'got powered source');
    };

    espower.call(context, source, null);
  });

  it('should return sourcemap', function() {
    var source = 'var zero = 0;\nassert(zero, 1);'

    // set context for webpack loader
    var context = {};
    context.resourcePath = '/path/to/original.js';
    context.options = {};
    context.callback = function(err, powered, map) {
      var smc = new Consumer(map);
      var originalPosition = smc.originalPositionFor({
        source: '/path/to/root/original.coffee',
        line: 31,
        column: 4
      });
      assert.equal(originalPosition.source, '/path/to/original.js', 'got original source');
      assert.equal(originalPosition.line, 2, 'got original line');
      assert.equal(originalPosition.column, 13, 'got original column');
    };

    espower.call(context, source, null);
  });
});

