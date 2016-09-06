'use strict';

var gulp = require('gulp');
var gulpRename = require('gulp-rename');
var gulpUglify = require('gulp-uglify');
var webpackStream = require('webpack-stream');
var config = require( '../config' );


/**
 * Generate main bundle.
 * @returns {PassThrough} A source stream.
 */
function exampleScripts() {
  return gulp.src( './examples/index.js' )
    .pipe( webpackStream( {
      output: {
        filename: 'example.js'
      }
    } ) )
    .pipe( gulpUglify() )
    .pipe( gulpRename( 'example.min.js' ) )
    .pipe( gulp.dest( config.BUILD ) )
}

/**
 * Generate main bundle.
 * @returns {PassThrough} A source stream.
 */
function buildScripts() {
  return gulp.src( './index.js' )
    .pipe(webpackStream({
      output: {
        filename: 'main.js'
      }
    }))
    .pipe( gulpUglify() )
    .pipe(gulpRename('main.min.js'))
    .pipe(gulp.dest( config.BUILD ))
}
gulp.task( 'buildScripts', buildScripts );
gulp.task( 'exampleScripts', exampleScripts );

gulp.task( 'scripts', ['buildScripts','exampleScripts'] );
