'use strict';

const config = require( '../config' );
const gulp = require( 'gulp' );
const gulpRename = require( 'gulp-rename' );
const webpack = require( 'webpack' );
const webpackStream = require( 'webpack-stream' );

// TODO:
// Consolidate build scripts to call one helper function like in cfgov-refresh.

/**
 * Generate main bundle.
 * @returns {PassThrough} A source stream.
 */
function exampleScripts() {
  return gulp.src( './examples/index.js' )
    .pipe( webpackStream( {
      module: {
        rules: [ {
          use: [ {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: [ [ 'env', {
                targets: {
                  browsers: [
                    'last 2 version',
                    'Edge >= 11',
                    'not ie <= 8',
                    'android 4',
                    'BlackBerry 7',
                    'BlackBerry 10'
                  ]
                },
                debug: true
              } ] ]
            }
          } ],
          exclude: /node_modules/
        } ]
      },
      output: {
        filename: 'example.js'
      },
      plugins: [
        // Change warnings flag to true to view linter-style warnings at runtime.
        new webpack.optimize.UglifyJsPlugin( {
          compress: { warnings: true }
        } )
      ]
    }, webpack ) )
    .pipe( gulpRename( 'example.min.js' ) )
    .pipe( gulp.dest( config.BUILD ) );
}

/**
 * Generate main bundle.
 * @returns {PassThrough} A source stream.
 */
function buildScripts() {
  return gulp.src( './index.js' )
    .pipe( webpackStream( {
      module: {
        rules: [ {
          use: [ {
            loader: 'babel-loader?cacheDirectory=true',
            options: {
              presets: [ [ 'env', {
                targets: {
                  browsers: [
                    'last 2 version',
                    'Edge >= 11',
                    'not ie <= 8',
                    'android 4',
                    'BlackBerry 7',
                    'BlackBerry 10'
                  ]
                },
                debug: true
              } ] ]
            }
          } ],
          exclude: /node_modules/
        } ]
      },
      output: {
        filename: 'main.js'
      },
      plugins: [
        // Change warnings flag to true to view linter-style warnings at runtime.
        new webpack.optimize.UglifyJsPlugin( {
          compress: { warnings: true }
        } )
      ]
    }, webpack ) )
    .pipe( gulpRename( 'main.min.js' ) )
    .pipe( gulp.dest( config.BUILD ) );
}
gulp.task( 'buildScripts', buildScripts );
gulp.task( 'exampleScripts', exampleScripts );

gulp.task( 'scripts', [ 'buildScripts', 'exampleScripts' ] );
