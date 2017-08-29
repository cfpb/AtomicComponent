'use strict';

const BASE_JS_PATH = '../../../src';
const chai = require( 'chai' );
const expect = chai.expect;

const HTML_SNIPPET = ``;
let atom;

describe( 'Atom', () => {
  before( () => {
    this.jsdom = require( 'jsdom-global' )( HTML_SNIPPET );
    atom = require( BASE_JS_PATH + '/components/Atom' );
  } );

  after( () => this.jsdom() );

  // TODO: Implement tests.
} );
