'use strict';

var BASE_JS_PATH = '../../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );

beforeEach( function() {
  jsdom({
    done: function( errors, window ) {
      var atom = require( BASE_JS_PATH + '/components/Atom' );
    }
  } );
} )

describe( 'Atom', function() {
  // TODO: Implement tests.
} );
