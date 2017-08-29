'use strict';

const BASE_JS_PATH = '../../../src';
const bind = require( BASE_JS_PATH + '/utilities/function-bind' ).bind;
const chai = require( 'chai' );
const expect = chai.expect;

describe( 'function-bind', () => {
  it( 'should bind the proper context', () => {
      const context = { testing: true };
      const mockFunction = function(){ return this };
      const boundFunction = bind( mockFunction, context );
      expect ( boundFunction() === context ).to.equal( true );
    }
  );
} );
