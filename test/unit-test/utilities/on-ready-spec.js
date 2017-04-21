'use strict';

var BASE_JS_PATH = '../../../src';

var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'jsdom-global' );
var onReady;
var _documentState;

const DOCUMENT_STATES = {
  COMPLETE: 'complete',
  LOADING:  'loading'
}

function setDocumentState( state ) {
  _documentState = state;
}

function triggerReadyState( state , time=100) {

  return new Promise( function readyStateChange( resolve, reject ) {
    window.setTimeout( function() {
      setDocumentState( state );
      var readyStateEvent = new Event( 'readystatechange' );
      document.dispatchEvent( readyStateEvent );
      resolve( document );
    }, time );
  } );
}

describe( 'on-ready', function() {
  before( function() {
    this.jsdom = jsdom();
    onReady = require( BASE_JS_PATH + '/utilities/on-ready' ).onReady;

    Object.defineProperty( document, 'readyState', {
         get: function() {
            return _documentState
          }
    } );
  } );

  beforeEach( function() {
    setDocumentState( DOCUMENT_STATES.LOADING );
  } );

  after( function() {
    this.jsdom();
  } );


  it( 'should return early if passed a string',
    function() {
      var _readyFuntions = onReady( 'foo' );

      expect( typeof _readyFuntions ).to.equal( 'undefined' );
    }
  );

  it( 'should add a function to the saved array and trigger it' +
       'when readyState completes',

    function() {
      var readyReturn;
      var _readyFunctions

      onReady( function() {
        readyReturn = 'foo';
      } );

      _readyFunctions = onReady( function() {
        readyReturn = 'foo';
      } );

      expect( _readyFunctions.length ).to.equal( 2 );

      return triggerReadyState( DOCUMENT_STATES.COMPLETE )
             .then( function () {
                expect( typeof _readyFunctions ).to.equal( 'object' );
                expect( _readyFunctions.length ).to.equal( 0 );
             } );
      }
  );

  it( 'should add a function to the saved array but not trigger it' +
       'if state is loading',

    function() {
      var readyReturn;
      var _readyFunctions

      onReady( function() {
        readyReturn = 'foo';
      } );

      _readyFunctions = onReady( function() {
        readyReturn = 'foo';
      } );

      expect( _readyFunctions.length ).to.equal( 2 );

      return triggerReadyState( DOCUMENT_STATES.LOADING )
             .then( function () {
                expect( typeof _readyFunctions ).to.equal( 'object' );
                expect( _readyFunctions.length ).to.equal( 2 );
             } );
      }
  );

} );
