
'use strict';

var closest = require( '../../utilities/dom-closest' ).closest;
var config = require( '../../utilities/config' );
var Organism = require( './Organism' );

var DIRECTIONS = config.DIRECTIONS;
var UNDEFINED = config.UNDEFINED;

var TableOrganism = Organism.extend( {

  classes: {
    baseElement: '.o-table',
    sortDown:    'sort-down',
    sortUp:      'sort-up'
  },

  events: {
    'click .sortable': 'sortTable'
  },

  ui: {
    sortables:        '.sortable',
    tableBody:        'tbody',
    activeSortButton: null
  },

  initialize: function() {
    this.isTableSorted = false;
    this.sortColumnIndex = UNDEFINED;
    this.sortDirection = UNDEFINED;
    this.tableData = [];
  },

 /**
   * Updates the table in the DOM
   * @param { number } columnIndex - The index of the column used for sorting
   */
  getTableData: function ( columnIndex ) {
    columnIndex = columnIndex || this.sortColumnIndex;
    var cell;

    // Find the value in each row of the column we're sorting by,
    // add it to the rows Array
    var rows = this.ui.tableBody.querySelectorAll( 'tr' );
    this.tableData = [];

    for ( var i = 0; i < rows.length; ++i ) {
      cell = rows[i].cells[ columnIndex ];
      if( cell ) {
        cell = cell.textContent.trim();
      }
      this.tableData.push( [ cell, rows[ i ] ] );
    }

    this.tableData.sort( this.tableDataSorter( this.sortDirection ) )

    return this.tableData;
  },

/**
   * Sorting function for Array.sort()
   *
   * @param { number } direction - A number where a negative number indicates a
   * reverse sort.
   * @param { sortType } sortType - A string used for sort types. By default,
   * the values are sorted by their native type. If this value is set to
   * 'number', then the cells' numeric values are used.
   * @returns function - A function to be used by the Array.sort method, where
   * the parameters 'a' and 'b' is each an Array (of Arrays) to be sorted
   */
  tableDataSorter : function( direction, sortType ) {
    return function( a, b ) {
       var sign = 1;
      // Set a and b to the first Array in each Array-of-Arrays
      a = a[0];
      b = b[0];

      // For number sort, convert a & b to numbers.
      if ( sortType === 'number' ) {
        a = Number( a.replace( /[^\d.-]/g, '' ) );
        b = Number( b.replace( /[^\d.-]/g, '' ) );
      }

      if ( direction === DIRECTIONS.DOWN ) {
        sign = -1
      }

      // Sort the values
      if ( a < b ) {
        return sign * -1;
      }
      if ( a > b ) {
        return sign;
      }
      return 0;

    };
  },

  /**
   * Updates the table in the DOM
   */
  updateTable: function() {
    var documentFragment;
    var tableBody = this.ui.tableBody;

    // Empty the table body to prepare for sorting the rows
    // TODO: It might make sense to use innerHTML
    // from a performance and garbage collection standpoint.
    while ( tableBody.lastChild ) {
      tableBody.removeChild( tableBody.lastChild );
    }

    // Insert sorted rows
    documentFragment = document.createDocumentFragment();
    for ( var i = 0; i < this.tableData.length; i++ ) {
      documentFragment.appendChild( this.tableData[i][1] );
    }
    tableBody.appendChild( documentFragment );

    this.isTableSorted = true;

    return this;
  },

  sortTable: function( event ) {
    if( this.ui.activeSortButton ) {
        this.removeClass( this.ui.activeSortButton,
                          this.classes.sortedUp,
                          this.classes.sortedDown );
    }

    if ( this.ui.activeSortButton === event.target ) {
      this.sortDirection = ~this.sortDirection;
    } else {
      this.ui.activeSortButton = event.target;
      this.sortColumnIndex = closest( event.target, 'td, th' ).cellIndex;
      this.sortDirection = DIRECTIONS.UP;
    }

    var sortClass = ( this.sortDirection === DIRECTIONS.UP ) ? this.classes.sortUp : this.classes.sortDown;
    this.addClass( this.ui.activeSortButton, sortClass );
    this.getTableData();
    this.updateTable();

    return this;
  }

} );

TableOrganism.constants.DIRECTIONS = DIRECTIONS;

module.exports = TableOrganism;
