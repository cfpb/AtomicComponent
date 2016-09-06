
/* ==========================================================================
   TableOrganism

   ========================================================================== */

'use strict';

var config = require( '../src/utilities/config' );
var Organism = require( '../src/components/Organism' );
var TableSortable = require( './table-sortable' );
var TableRowLinks = require( './table-row-links' );

var TableOrganism = Organism.extend( {

  ui: {
    base: '.o-table'
  },

  modifiers: [TableSortable, TableRowLinks]

} );

TableOrganism.constants.DIRECTIONS = config.DIRECTIONS;

module.exports = TableOrganism;
