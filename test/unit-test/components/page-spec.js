'use strict';

const BASE_JS_PATH = '../../../src';
const chai = require( 'chai' );
const expect = chai.expect;

const HTML_SNIPPET = ``;
let page;

describe( 'Page', () => {
  beforeEach( () => {
    this.jsdom = require( 'jsdom-global' )( HTML_SNIPPET );
    page = require( BASE_JS_PATH + '/components/page' );
  } );

  after( () => this.jsdom() );

  // TODO: Implement tests.
} );
