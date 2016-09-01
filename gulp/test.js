
'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var configTest = require('../config').tests;
var jsdom = require( 'mocha-jsdom' );

/**
* Run Mocha JavaScript unit tests.
* @param {Function} cb - Callback function to call on completion.
*/

function unitTest(cb) {

  gulp.src(configTest.src)
  .pipe(plugins.istanbul({
    includeUntested: false
  }))
  .pipe(plugins.istanbul.hookRequire())
  .on('finish', function() {
    gulp.src( configTest.test + '/unit_test_coverage/**/' )
   .pipe(plugins.clean({force: true, read: false}))
    gulp.src(configTest.test + '/**/*.js')
    .pipe(plugins.mocha({
      reporter: 'nyan'
    }))
    .pipe(plugins.istanbul.writeReports({
      dir: configTest.test + '/unit_test_coverage'
    }))
    .on('end', cb);
  });

}

gulp.task( 'test', unitTest );
