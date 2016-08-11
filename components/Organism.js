/* ==========================================================================
   Organism

   Organism Atomic Component

   ========================================================================== */

'use strict';

var AtomicComponent = require( './AtomicComponent' );
var TYPES = require( './utilities/config' ).TYPES;

Organism = AtomicComponent.extend( {
  TYPE: TYPES.ORGANISM,
  CHILD_TYPES: [TYPES.MOLECULE, TYPES.ATOM]
} );

module.exports = Organism;
