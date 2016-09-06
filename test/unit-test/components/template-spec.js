'use strict';

var BASE_JS_PATH = '../../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );

beforeEach( function() {
  jsdom( {
    done: function( errors, window ) {
      if ( errors ) throw new Error( 'jsdom Error' );
      var template = require( BASE_JS_PATH + '/components/template' );
    }
  } );
} );

describe( 'Template', function() {
  // TODO: Implement tests.
} );
