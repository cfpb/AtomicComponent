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
      var _readyFuntions = onReady( 'foo' );

      expect( typeof _readyFuntions ).to.equal( 'undefined' );
    }
  );

  it( 'should add a funtion to the saved array but not trigger it' +
       'till readyState completes',
    function() {
      var readyReturn;

      var _readyFunctions = onReady( function() {
        readyReturn = 'foo';
      } );

      expect( typeof _readyFunctions ).to.equal( 'object' );
      expect( _readyFunctions.length ).to.equal( 1 );
      expect( readyReturn ).to.equal( undefined );
    }
  );

  // Due to the issue listed in the next two tests, this returns 3 instead
  // of two because it's never firing and cleaning the array in the
  // previous test
  xit( 'should add a funtion to the saved array each time it is called',
    function() {
      var readyReturn;
      var _readyFunctions;

      _readyFunctions = onReady( function() {
        readyReturn = 'foo';
      } );

      _readyFunctions = onReady( function() {
        readyReturn = 'bar';
      } );

      expect( typeof _readyFunctions ).to.equal( 'object' );
      expect( _readyFunctions.length ).to.equal( 2 );
      expect( readyReturn ).to.equal( undefined );
    }
  );

  // It seems that even though we're striggering the readyState,
  // it's not triggering the change in our coude
  xit( 'should trigger the saved functions after readyState completes',
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
      var _readyFunctions = onReady( function() {
        return 'foo';
      } );

      Object.defineProperty( document, 'readyState', {
        get: function() { return 'complete'; }
      } );

      expect( _readyFunctions.length ).to.equal( 0 );
    }
  );
} );
