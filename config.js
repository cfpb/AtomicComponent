'use strict';

var fs = require('fs');
var globAll = require('glob-all');

var BUILD = './build';
var SRC = './src';
var TEST = './test';

module.exports = {
  BUILD: BUILD,
  SRC: SRC,
  TEST: TEST,
  lint: {
    src: [ SRC + '/**/*.js'],
    test: [ TEST + '/**/*.js'],
    build: ['gulpfile.js', 'gulp/**/*.js']
  },
  tests: {
    src: SRC + '/**/*.js',
    test: TEST
  },
  clean: {
    dest: BUILD
  },
  scripts: {
    src: SRC + '/**/*.js'
  }
};
