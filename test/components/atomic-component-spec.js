'use strict';

var BASE_JS_PATH = '../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );

beforeEach( function() {
	jsdom({
	   	done: function(errors, window) {
	    	var atomicComponent = require( BASE_JS_PATH + '/components/AtomicComponent' );
	    }
  	} );
} )

describe( 'AtomicComponent', function() {
  // TODO: Implement tests.
} );
