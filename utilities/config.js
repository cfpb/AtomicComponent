
/* ==========================================================================
   Atomic configurations and constants

   ========================================================================== */

'use strict';

var DIRECTIONS = {
  UP: 0,
  RIGHT: 1,
  DOWN: -1,
  LEFT: -2
};

var TYPES = {
  PAGE: 1,
  TEMPLATE: 2,
  ORGANISM: 3,
  MOLECULE: 4,
  ATOM: 5
};

var PREFIXES = {
  PAGE: 'p-',
  TEMPLATE: 't-',
  ORGANISM: 'o-',
  MOLECULE: 'm-',
  ATOM: 'a-'
};

var NO_OP_FUNCTION = function(){};

var UNDEFINED;

module.exports = {
  DIRECTIONS: DIRECTIONS,
  NO_OP_FUNCTION: NO_OP_FUNCTION,
  PREFIXES : PREFIXES,
  TYPES : TYPES,
  UNDEFINED: UNDEFINED
}
