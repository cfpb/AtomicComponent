'use strict';

var BASE_JS_PATH = '../../../src';
var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'jsdom' );
var sinon = require( 'sinon' );

var AtomicComponent;
var document;
var Element;

var HTML_SNIPPET =
'<div id="test-block-a" class="test-class test-class-a">' +
  '<div id="test-block-b" class="test-class-b" >' +
    '<div id="test-block-c" class="test-class-c"></div>' +
' </div>' +
'</div>';


describe( 'AtomicComponent', function() {
  jsdom.env( HTML_SNIPPET, function( errors, window ) {
    if ( errors ) throw new Error( 'jsdom Error' );
    document = global.document = window.document;
    document.body.innerHTML = HTML_SNIPPET;
    global.Element = window.HTMLElement;
    AtomicComponent = require( BASE_JS_PATH + '/components/AtomicComponent' );
  } );

  it( 'should correctly create an Atomic Component instance',
    function() {
      var element = document.getElementById( 'test-block-a');
      var initialize = sinon.spy();
      var options = {
        initialize: initialize,
        events:     {
          'keydown' : 'keyAction'
        },
        keyAction: sinon.stub()
      };

      var atomicComponent = new AtomicComponent( element, options );
      expect( atomicComponent.element === element ).to.equal( true );
      expect( atomicComponent.events ).to.be.an( 'object' );
      expect( initialize.called ).to.equal( true );
      expect( atomicComponent.uId.indexOf( 'ac') > -1 ).to.equal( true );
      expect( atomicComponent.render() === atomicComponent ).to.equal( true );
    }
    );

  it( 'should correctly attach an element',
    function() {
      var atomicComponent = new AtomicComponent();
      expect( atomicComponent.element.tagName === 'DIV' ).to.equal( true );
      var element = document.createElement( 'span' );
      atomicComponent = new AtomicComponent( element );
      expect( atomicComponent.element.tagName === 'SPAN' ).to.equal( true );
      atomicComponent = new AtomicComponent('', {id: 'test_id',
        className: 'test_class_name' } );
      expect( atomicComponent.element.id === 'test_id' ).to.equal( true );
      expect( atomicComponent.element.className === 'test_class_name' ).to.equal( true );
    }
    );

  it( 'should correctly create sub classes',
    function() {
      var subComponent = new ( AtomicComponent.extend( {} ) );
      expect( subComponent._super === AtomicComponent.prototype ).to.equal( true );
      expect( subComponent instanceof AtomicComponent ).to.equal( true );
    }
    );


  it( 'should add the bound attribute to passed elements',
    function() {
      var element = document.getElementById( 'test-block-a');
      var atomicComponent = new AtomicComponent(element) ;
      expect( element.hasAttribute('data-bound') ).to.equal( true );
    }
    );

} );
