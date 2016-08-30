
'use strict';

var COMPONENTS_DIR = './src/components/';

var AtomicComponent = require( COMPONENTS_DIR  + 'AtomicComponent' );
var Page = require( COMPONENTS_DIR + 'Page' );
var Template = require( COMPONENTS_DIR  + '_Template' );
var Organism = require( COMPONENTS_DIR + 'Organism' );
var Molecule = require( COMPONENTS_DIR + 'Molecule' );
var Atom = require( COMPONENTS_DIR + 'Atom' );

module.exports = {
  AtomicComponent: AtomicComponent,
  Page: Page,
  Template: Template,
  Organism: Organism,
  Molecule: Molecule,
  Atom: Atom
};
