'use strict';

var BASE_JS_PATH = '../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );

beforeEach( function() {
	jsdom({
	   	done: function(errors, window) {
	    	var page = require( BASE_JS_PATH + '/components/page' );
	    }
  	} );
} );

describe( 'Page', function() {
  // TODO: Implement tests.
} );
