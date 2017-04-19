'use strict';

var BASE_JS_PATH = '../../../src';

var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'jsdom-global' );
var onReady;

describe( 'on-ready', function() {
  before( function() {
    this.jsdom = jsdom();
    onReady = require( BASE_JS_PATH + '/utilities/on-ready' ).onReady;
  } );

  after( function() {
    this.jsdom();
  } );

  beforeEach( function() {
    // You have to create your own readyState
    // https://stackoverflow.com/questions/37059010/workarounds-for-jsdom-document-readystate-being-readonly/37061458
    Object.defineProperty( document, 'readyState', {
      get: function() { return 'loading'; },
      configurable: true
    } );
  } );

  // Complete our readyState if we didn't within the test
  afterEach( function() {
    if ( document.readyState !== 'complete' ) {
      Object.defineProperty( document, 'readyState', {
        get: function() { return 'complete'; }
      } );
    }
  } );

  it( 'should return early if passed a string',
    function() {
      onReady( 'foo' );

      expect( typeof window.readyFuntions ).to.equal( 'undefined' );
      expect( window.readyFunctions.length ).to.equal( 0 );
    }
  );

  it( 'should add a funtion to the global array but not trigger it' +
       'till readyState completes',
    function() {
      var readyReturn;

      onReady( function() {
        readyReturn = 'foo';
      } );

      expect( typeof window.readyFunctions ).to.equal( 'object' );
      expect( window.readyFunctions.length ).to.equal( 1 );
      expect( readyReturn ).to.equal( undefined );
    }
  );

  // It seems that even though we're striggering the readyState,
  // it's not triggering the change in our coude
  xit( 'should trigger the function after readyState completes',
    function() {
      var readyReturn;

      onReady( function() {
        readyReturn = 'foo';
      } );

      Object.defineProperty( document, 'readyState', {
        get: function() { return 'complete'; }
      } );

      expect( readyReturn ).to.equal( 'foo' );
    }
  );

  // I believe it's the same issue here
  xit( 'should clear the array after readyState completes',
    function() {
      onReady( function() {
        return 'foo';
      } );

      Object.defineProperty( document, 'readyState', {
        get: function() { return 'complete'; }
      } );

      expect( window.readyFunctions.length ).to.equal( 0 );
    }
  );
} );
