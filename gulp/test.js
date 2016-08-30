
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var configTest = require('../config').test;

/**
* Run Mocha JavaScript unit tests.
* @param {Function} cb - Callback function to call on completion.
*/

function unitTest(cb) {
  gulp.src('./test')
  .pipe(plugins.istanbul({
    includeUntested: false
  }))
  .pipe(plugins.istanbul.hookRequire())
  .on('finish', function() {
    gulp.src(configTest.tests + '/**/*.js')
    .pipe(plugins.mocha({
      reporter: 'nyan'
    }))
    .pipe(plugins.istanbul.writeReports({
      dir: configTest.tests + '/unit_test_coverage'
    }))
    .on('end', cb);
  });
}

gulp.task( 'test', unitTest );
