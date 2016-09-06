
/* ==========================================================================
   Table Row Links

   Mixin for adding row link click functionality to table organism.

   ========================================================================== */

'use strict';

var TableRowLinks = {

  events: {
    'click tbody tr': 'onRowLinkClick'
  },

  ui: {
    base: '.o-table__row-links',
  },

  /**
   * Handle a click of the table.
   *
   * @param {Object} event Mouse event for click on the table.
   */
  onRowLinkClick: function onRowLinkClick( event ) {
    var target = event.target;
    var link = target && target.querySelector( 'a' );
    if( link ) window.location = link.getAttribute( 'href' );
  }

};

module.exports = TableRowLinks;
