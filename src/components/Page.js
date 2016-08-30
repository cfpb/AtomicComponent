
'use strict';

/* ==========================================================================
   Page

   Page Atomic Component

   ========================================================================== */

var AtomicComponent = require( './AtomicComponent' );
var TYPES = require( '../utilities/config' ).TYPES;

var Page = AtomicComponent.extend( {
  TYPE: TYPES.TEMPLATE,
  CHILD_TYPES: [TYPES.TEMPLATE, TYPES.ORGANISM, TYPES.MOLECULE, TYPES.ATOM]
} );

module.exports = Page;
