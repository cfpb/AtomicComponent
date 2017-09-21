'use strict';

const fs = require( 'fs' );
const globAll = require( 'glob-all' );

const BUILD = './lib';
const SRC = './src';
const TEST = './test';

module.exports = {
  BUILD: BUILD,
  SRC: SRC,
  TEST: TEST,
  lint: {
    src: [ SRC + '/**/*.js' ],
    test: [ TEST + '/unit_test/**/*.js' ],
    build: [ 'gulpfile.js', 'gulp/**/*.js' ]
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
  },
  supportedBrowsers: [
    'last 2 version',
    'Edge >= 11',
    'ie >= 9',
    'android 4',
    'BlackBerry 7',
    'BlackBerry 10'
  ]
};
