'use strict';

var gulp = require( 'gulp' );
var plugins = require('gulp-load-plugins')();
var config = require( '../config' ).lint;

/**
 * Lints the gulpfile for errors
 */
gulp.task( 'lint:build', function() {
  return gulp.src( config.build )
    .pipe( plugins.eslint({ fix: true } ) )
    .pipe( plugins.eslint.format() )
} );

/**
 * Lints the source js files for errors
 */
gulp.task( 'lint:scripts', function() {
  return gulp.src( config.src )
    .pipe( plugins.eslint({fix:true}) )
    .pipe( plugins.eslint.format() )
} );

/**
 * Lints the test js files for errors
 */
gulp.task( 'lint:test', function() {
  return gulp.src( config.test )
    .pipe( plugins.eslint({fix:true}) )
    .pipe( plugins.eslint.format() )
} );

/**
 * Lints all the js files for errors
 */
gulp.task( 'lint', [
  'lint:build',
  'lint:scripts',
  'lint:test'
] );
