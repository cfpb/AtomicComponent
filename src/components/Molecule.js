
/* ==========================================================================
   Molecule

   Molecule Atomic Component

   ========================================================================== */

'use strict';

var AtomicComponent = require( './AtomicComponent' );
var TYPES = require( '../utilities/config' ).TYPES;

var Molecule = AtomicComponent.extend( {
  TYPE: TYPES.MOLECULE,
  CHILD_TYPES: [TYPES.ATOM]
} );

module.exports = Molecule;
