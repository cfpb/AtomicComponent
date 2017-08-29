'use strict';

const BASE_JS_PATH = '../../../src';
const chai = require( 'chai' );
const expect = chai.expect;

const HTML_SNIPPET = ``;
let molecule;

describe( 'Molecule', () => {
  before( () => {
    this.jsdom = require( 'jsdom-global' )( HTML_SNIPPET );
    molecule = require( BASE_JS_PATH + '/components/Molecule' );
  } );

  after( () => this.jsdom() );

  // TODO: Implement tests.
} );
