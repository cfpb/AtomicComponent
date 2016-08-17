
/* ==========================================================================
   Page

   Page Atomic Component

   ========================================================================== */

var AtomicComponent = require( './AtomicComponent' );
var TYPES = require( './utilities/config' ).TYPES;

Page = AtomicComponent.extend( {
  TYPE: TYPES.TEMPLATE,
  CHILD_TYPES: [TYPES.ORGANISM, TYPES.PAGES, TYPES.MOLECULE, TYPES.ATOM]
} );

module.exports = Template;
