var Organism = require('./Organism');

var Table = Organism.extend( {
  selector: '.o-table',

  ui: {
    sortables: '.sortable'
  },

  events: {
  	'click .sortable': 'sortColumn'
  },

  getTableData: function() {
  	if ( this.tableData.length ) {
     	return;
    }

  	for ( var i = 1, row; row = this.element.rows[ i ]; i++ ) {
      this.tableData[i] = [];
      for ( var j = 0, cell; cell = row.cells[ j ]; j++ ) {
        this.tableData[i][j] = row.cells[ j ].textContent;
        this.tableData[i][j].row = i;
      }
    }
    console.log( this.tableData );
    return this.tableData
  },

  initialize: function( ) {
    this.isTableSorted = false;
    this.sortColumn = 0;
    this.tableData = [];
    this.getTableData();
  },

  sortColumn: function( ) {
    console.log();
  },

  arraySorter: function( order, sortType ) {
  	return function( a, b ) {
	  // Set a and b to the first Array in each Array-of-Arrays
	  a = a[0];
	  b = b[0];

	  // For number sort, convert a & b to numbers.
	  if ( sortType === 'number' ) {
	    a = Number( a.replace( /[^\d.-]/g, '' ) );
	    b = Number( b.replace( /[^\d.-]/g, '' ) );
	  }

	  return b - a;
  	};
  }
} );

module.exports = Table;
