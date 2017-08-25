/* ==========================================================================
   Molecule

   Molecule Atomic Component

   ========================================================================== */

'use strict';

const AtomicComponent = require( './AtomicComponent' );
const TYPES = require( '../utilities/config' ).TYPES;

const Template = AtomicComponent.extend( {
  TYPE: TYPES.Template,
  CHILD_TYPES: [ TYPES.PAGE, TYPES.ORGANISM, TYPES.MOLECULE, TYPES.ATOM ]
} );

module.exports = Template;
