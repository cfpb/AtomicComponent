
/* ==========================================================================
   Molecule

   Molecule Atomic Component

   ========================================================================== */

'use strict';

var AtomicComponent = require( './AtomicComponent' );
var TYPES = require( '../utilities/config' ).TYPES;

var Template = AtomicComponent.extend( {
  TYPE: TYPES.Template,
  CHILD_TYPES: [TYPES.PAGE, TYPES.ORGANISM, TYPES.MOLECULE, TYPES.ATOM]
} );

module.exports = Template;
