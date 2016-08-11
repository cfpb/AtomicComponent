
/* ==========================================================================
   Template

   Template Atomic Component

   ========================================================================== */

'use strict';

var AtomicComponent = require( './AtomicComponent' );
var TYPES = require( './utilities/config' ).TYPES;

Template = AtomicComponent.extend( {
  TYPE: TYPES.TEMPLATE,
  CHILD_TYPES: [TYPES.ORGANISM, TYPES.MOLECULE, TYPES.ATOM]
} );

module.exports = Template;
