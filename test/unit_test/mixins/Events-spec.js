'use strict';

var BASE_JS_PATH = '../../../src';
var Events = require( BASE_JS_PATH + '/mixins/Events' );

var chai = require( 'chai' );
var expect = chai.expect;
var jsdom = require( 'mocha-jsdom' );
var sinon = require( 'sinon' );
var sandbox;
var baseDom;
var mockEvent
var spy1;
var spy2;


beforeEach( function() {
  mockEvent = { events: {} };
  mockEvent = Object.assign( mockEvent,  Events );
  spy1 = sinon.spy();
  spy2 = sinon.spy();
} );

describe( 'Events', function() {
  jsdom();

  it( 'should add the correct methods to an object when mixed in',
    function() {
      expect( mockEvent.on ).to.be.an('function');
      expect( mockEvent.off ).to.be.an('function');
      expect( mockEvent.trigger ).to.be.an('function');
    }
  );

  it( 'should correctly add event listeners',
    function() {
      mockEvent.on('click', spy1 );
      expect( mockEvent.events['click'][0] === spy1 ).to.equal( true );
      mockEvent.on('click', spy2 );
      expect( mockEvent.events['click'][1] === spy2 ).to.equal( true );
      expect( mockEvent.events.hasOwnProperty( 'click' ) ).to.equal( true );
    }
  );

  it( 'should correctly trigger event listeners',
    function() {
      mockEvent = Object.assign( mockEvent,  Events );
      mockEvent.on('click', spy1 );
      mockEvent.trigger( 'click' );
      expect( spy1.called ).to.equal( true );
      expect( spy1.called ).to.equal( true );
    }
  );

  it( 'should correctly remove event listeners',
    function() {
      mockEvent.on('click', spy1 );
      expect( mockEvent.events['click'][0] === spy1 ).to.equal( true );
      mockEvent.on('click', spy2 );
      expect( mockEvent.events['click'][1] === spy2 ).to.equal( true );
      mockEvent.off('click');
      expect( mockEvent.events.hasOwnProperty( 'click' ) ).to.equal( false );
      mockEvent.trigger( 'click' );
      expect( spy1.called ).to.equal( false );
      expect( spy2.called ).to.equal( false );
    }
  );

} );
