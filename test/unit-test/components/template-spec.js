'use strict';

const BASE_JS_PATH = '../../../src';
const chai = require( 'chai' );
const expect = chai.expect;

const HTML_SNIPPET = ``;
let template;

describe( 'Template', function() {

  before( () => {
    this.jsdom = require( 'jsdom-global' )( HTML_SNIPPET );
    template = require( BASE_JS_PATH + '/components/template' );
  } );

  after( () => this.jsdom() );

  // TODO: Implement tests.
} );
