'use strict';

var BASE_JS_PATH = '../../../src';
var classList;
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'jsdom' );
var sinon = require( 'sinon' );

var classListPath = BASE_JS_PATH + '/utilities/dom-class-list'
var document;
var testBlockA;
var testBlockB;
var testBlockC;
var testBlockD;
var sandbox;

var HTML_SNIPPET =
'<div id="test-block-a" class="test-class test-class-a">' +
  '<div id="test-block-b" class="test-class-b" >' +
    '<div id="test-block-c" class="test-class-c"></div>' +
  '</div>' +
'</div>';

beforeEach( function() {
  classList = require( classListPath );
} );

describe( 'dom-class-list', function( ) {
  jsdom.env( HTML_SNIPPET, function( errors, window ){
    if ( errors ) throw new Error( 'jsdom Error' );
    document = global.document = window.document;
    document.body.innerHTML = HTML_SNIPPET;
    testBlockA = document.getElementById( 'test-block-a' );
    testBlockB = document.getElementById( 'test-block-b' );
    testBlockC = document.getElementById( 'test-block-c' );
  } );

  it( 'should determine if the browser supports class list',
    function() {
      expect ( classList.hasClassList ).to.equal( true );
    }
    );

  it( 'should determine if an element has a particular class',
    function() {
      var _createElement = global.document.createElement;
      expect ( classList.contains(testBlockA, 'test-class-b' ) )
      .to.equal( false );
      expect ( classList.contains(testBlockA, 'test-class-a' ) )
      .to.equal( true );
      expect ( classList.contains(testBlockA, 'test-class' ) )
      .to.equal( true );
      global.document.createElement = function(){ return {} };
      delete require.cache[require.resolve( classListPath )];
      classList = require( classListPath );
      expect ( classList.contains( testBlockA, 'test-class-b' ) )
      .to.equal( false );
      expect ( classList.contains( testBlockA, 'test-class-a' ) )
      .to.equal( true );
      expect ( classList.contains( testBlockA, 'test-class' ) )
      .to.equal( true );
      global.document.createElement = _createElement;
    }
    );

  it( 'should correctly add classes to the class list',
    function() {
      classList = require( classListPath );
      expect( testBlockB.className.indexOf( ' test-class' ) === -1 )
      .to.equal( true );
      classList.addClass( testBlockB, 'test-class' );
      expect( testBlockB.className.indexOf( 'test-class') > -1 )
      .to.equal( true );
      classList.addClass( testBlockB, 'test-class', 'test-class-new' );
      expect( testBlockB.className.indexOf( 'test-class-new' ) > -1 )
      .to.equal( true );
    }
    );

  it( 'should correctly remove classes to the class list',
    function() {
      expect( testBlockC.className.indexOf( 'test-class-c' ) > -1 )
      .to.equal( true );
      classList.removeClass( testBlockC, 'test-class-c' );
      expect( testBlockC.className.indexOf( 'test-class-c') === -1 )
      .to.equal( true );
      testBlockC.className = 'test-class-c test-class';
      classList.removeClass( testBlockC, 'test-class-c', 'test-class' );
      expect( testBlockC.className === '' ).to.equal( true );
    }
    );

  it( 'should correctly toggle classes',
    function() {
      expect( testBlockA.className.indexOf( 'test-class-a' ) > -1 )
      .to.equal( true );
      classList.toggleClass( testBlockA, 'test-class-a' );
      expect( testBlockA.className.indexOf( 'test-class-c') === -1 )
      .to.equal( true );
      testBlockC.className = 'test-class-a';
      classList.toggleClass( testBlockC, 'test-class-c', true );
      expect( testBlockC.className === 'test-class-a test-class-c' )
      .to.equal( true );
    }
    );
} );
