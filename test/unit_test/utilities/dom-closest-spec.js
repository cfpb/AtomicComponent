'use strict';

var BASE_JS_PATH = '../../../src';

var chai = require( 'chai' );
var expect = chai.expect;
var domClosest = require( BASE_JS_PATH + '/utilities/dom-closest' ).closest;
var jsdom = require( 'jsdom' );
var sinon = require( 'sinon' );
var sandbox;

var testBlockA;
var testBlockB;
var testBlockC;
var testBlockD;

var HTML_SNIPPET =
'<section id="test-block-a">' +
'<div id="test-block-b">' +
'<div id="test-block-c" >' +
'<div id="test-block-d"></div>' +
'</div>' +
'</div>' +
'</section>';

describe( 'dom-closest', function() {
  var jsDomDoc = jsdom.jsdom(HTML_SNIPPET);
  var document = jsDomDoc.defaultView.document;

  before( function() {
    testBlockA = document.getElementById( 'test-block-a' );
    testBlockB = document.getElementById( 'test-block-b' );
    testBlockC = document.getElementById( 'test-block-c' );
    testBlockD = document.getElementById( 'test-block-d' );
  } );

  it( 'should find the current DOM node if the node matches the selector',
    function() {
      var element = domClosest( testBlockD, 'div' );
      expect ( element === testBlockD ).to.equal( true );
      element = domClosest( testBlockD, 'div div' );
      expect ( element === testBlockD ).to.equal( true );
    }
    );

  it( 'should return null if a node isn\'t found',
    function() {
      var element = domClosest( testBlockA, '.test-block' );
      expect ( element === null ).to.equal( true );
      element = domClosest( testBlockA, 'div.test' );
      expect ( element === null ).to.equal( true );
    }
    );

  it( 'should return the correct parent node',
    function() {
      var element = domClosest( testBlockD, 'section' );
      expect ( element === testBlockA ).to.equal( true );
      element = domClosest( testBlockC, 'section > div' );
      expect ( element === testBlockB ).to.equal( true );
    }
    );

  it( 'should use the native closest method if it exists',
    function() {
      var spy = testBlockD.closest = sinon.spy();
      var element = domClosest( testBlockD, 'section' );
      expect ( spy.called ).to.equal( true );
    }
    );

  it( 'should use the correct matches method',
    function() {
      var spy = sinon.spy();
      delete testBlockD.closest;
      testBlockD.matches = undefined
      testBlockD.webkitMatchesSelector = spy;
      domClosest( testBlockD, 'section' );
      expect ( spy.called ).to.equal( true );

      testBlockD.webkitMatchesSelector = undefined;
      spy.reset();
      testBlockD.mozMatchesSelector = spy;
      domClosest( testBlockD, 'section' );
      expect ( spy.called ).to.equal( true );

      testBlockD.mozMatchesSelector = undefined;
      spy.reset();
      testBlockD.msMatchesSelector = spy;
      domClosest( testBlockD, 'section' );
      expect ( spy.called ).to.equal( true );
    }
    );
} );
