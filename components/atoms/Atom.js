
/* ==========================================================================
   Atom

   Atom Atomic Component

   ========================================================================== */

'use strict';

var AtomicComponent = require( './AtomicComponent' );
var TYPES = require( './utilities/config' ).TYPES;

var Atom = AtomicComponent.extend( {
  TYPE: TYPES.ATOM,
  CHILD_TYPES: []
} );

module.exports = Atom;
