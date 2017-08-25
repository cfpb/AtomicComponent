'use strict';

const configTest = require( '../config' ).tests;
const gulp = require( 'gulp' );
const plugins = require( 'gulp-load-plugins' )();

/**
* Run Mocha JavaScript unit tests.
* @param {Function} cb - Callback function to call on completion.
*/

function unitTest( cb ) {
  gulp.src( configTest.src )
  .pipe( plugins.istanbul( {
    includeUntested: true
  } ) )
  .pipe( plugins.istanbul.hookRequire() )
  .on( 'finish', () => {
    gulp.src( configTest.test + '/unit-test/**/*.js' )
    .pipe( plugins.mocha( {
      reporter: 'nyan'
    } ) )
    .pipe( plugins.istanbul.writeReports( {
      dir: configTest.test + '/unit-test-coverage'
    } ) )
    .on( 'end', cb );
  } );
}

gulp.task( 'test', unitTest );
