'use strict';

var BASE_JS_PATH = '../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );

beforeEach( function() {
	jsdom({
	   	done: function(errors, window) {
	    	var molecule = require( BASE_JS_PATH + '/components/Molecule' );
	    }
  	} );
} )

describe( 'Molecule', function() {
  // TODO: Implement tests.
} );
