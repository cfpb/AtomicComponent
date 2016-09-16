'use strict';

var BASE_JS_PATH = '../../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );
var bind = require( BASE_JS_PATH + '/utilities/function-bind' ).bind;

describe( 'function-bind', function() {
  jsdom();
  it( 'should bind the proper context',
    function() {
      var context = { testing: true };
      var mockFunction = function(){ return this };
      var boundFunction = bind( mockFunction, context );
      expect ( boundFunction() === context ).to.equal( true );
    }
  );
} );
