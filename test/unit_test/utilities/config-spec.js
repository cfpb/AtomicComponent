'use strict';

var BASE_JS_PATH = '../../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );
var config = require( BASE_JS_PATH + '/utilities/config' );

describe( 'config', function() {
  jsdom();
  it( 'should return the proper configurations and constants',
		function() {
			expect( config.DIRECTIONS ).to.be.an( 'object' );
			expect( config.TYPES ).to.be.an( 'object' );
			expect( config.PREFIXES ).to.be.an( 'object' );
			expect( config.UNDEFINED ).to.be.an('undefined');
			expect( config.NO_OP_FUNCTION ).to.be.an('function');
			expect( config.NO_OP_FUNCTION() ).to.be.an('undefined');
		}
	);
} );
