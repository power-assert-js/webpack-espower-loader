'use strict';

var assert = require('power-assert');
var sourceMap = require("source-map");
var Consumer = sourceMap.SourceMapConsumer;
var espower = require('../index');

describe('webpack-espowered-loader', function() {
  it('should return powered source', function() {
    var source = 'var zero = 0;\nassert(zero, 1);'

    // set context for webpack loader
    var context = {};
    context.resourcePath = '/path/to/original.js';
    context.options = {};
    context.callback = function(err, powered, map) {
      var expected = "var zero = 0;\nassert(assert._expr(assert._capt(zero, 'arguments/0'), {\n    content: 'assert(zero, 1)',\n    filepath: 'original.js',\n    line: 2\n}), 1);\n\n";
      assert.equal(powered, expected, 'got powered source');
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
        line: 6,
        column: 4
      });
      assert.equal(originalPosition.source, '/path/to/original.js', 'got original source');
      assert.equal(originalPosition.line, 2, 'got original line');
      assert.equal(originalPosition.column, 13, 'got original column');
    };

    espower.call(context, source, null);
  });
});

