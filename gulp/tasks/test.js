'use strict';

const configTest = require( '../config' ).tests;
const gulp = require( 'gulp' );
const gulpIstanbul = require( 'gulp-istanbul' );
const gulpMocha = require( 'gulp-mocha' );

/**
* Run Mocha JavaScript unit tests.
* @param {Function} cb - Callback function to call on completion.
*/

function unitTest( cb ) {
  gulp.src( configTest.src )
  .pipe( gulpIstanbul( {
    includeUntested: true
  } ) )
  .pipe( gulpIstanbul.hookRequire() )
  .on( 'finish', () => {
    gulp.src( configTest.test + '/unit-test/**/*.js' )
    .pipe( gulpMocha( {
      reporter: 'nyan'
    } ) )
    .pipe( gulpIstanbul.writeReports( {
      dir: configTest.test + '/unit-test-coverage'
    } ) )
    .on( 'end', cb );
  } );
}

gulp.task( 'test', unitTest );
