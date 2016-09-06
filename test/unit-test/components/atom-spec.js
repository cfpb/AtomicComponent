'use strict';

var BASE_JS_PATH = '../../../src';
var chai = require( 'chai' );
var jsdom = require( 'mocha-jsdom' );

beforeEach( function() {
  jsdom({
    done: function( errors, window ) {
      if ( errors ) throw new Error( 'jsdom Error' );
      var atom = require( BASE_JS_PATH + '/components/Atom' );
    }
  } );
} )

describe( 'Atom', function() {
  // TODO: Implement tests.
} );
