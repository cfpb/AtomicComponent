
/* ==========================================================================
   Dom class list

   Contains code copied from the following with minimal modifications :

   - http://stackoverflow.com/posts/18492076/revisions
   ========================================================================== */

'use strict';

/**
 * Add CSS class from an element.
 *
 * @param {HTMLNode} element - A DOM element.
 * @param {string} className - CSS class name.
 * @returns {HTMLNode} Nearest parent node that matches the selector.
 */
function addClass( element, className ) {
  if ( 'classList' in element ) {
    element.classList.add(className);
  } else if (!element.hasClass(className)) {
    var classes = element.className.split( ' ' );
    classes.push(className);
    element.className = classes.join( ' ' );
  }

  return element;
}

/**
 * Get the nearest parent node of an element.
 *
 * @param {HTMLNode} element - A DOM element.
 * @param {string} className - CSS selector.
 * @returns {HTMLNode} Nearest parent node that matches the selector.
 */
function hasClass ( element, className ) {
  if ( 'classList' in element ) {
    return element.classList.contains( className );
  } else {
    return ( -1 < element.className.indexOf( className ) );
  }
}

/**
 * Remove CSS class from an element.
 *
 * @param {HTMLNode} element - A DOM element.
 * @param {string} className - CSS selector.
 * @returns {HTMLNode} Nearest parent node that matches the selector.
 */
function removeClass( element, className ) {
  var args = new Array(arguments.length);
  var hasClassList = 'classList' in element;
  var classes;
  for( var i = 1; i < args.length; ++i ) {
    if ( hasClassList ) {
      element.classList.remove(arguments[i]);
    } else {
      classes = element.className.split( ' ' );
      classes.splice(classes.indexOf(arguments[i]), 1);
      element.className = classes.join( ' ' );
    }
  }

  return element;
};


// Expose public methods.
module.exports = { addClass: addClass,
                   hasClass: hasClass,
                   removeClass: removeClass
};
