
/* ==========================================================================
   Dom class list

   Contains code copied from the following with major modifications :

   - http://stackoverflow.com/posts/18492076/revisions
   - https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
   ========================================================================== */

'use strict';

var hasClassList = "classList" in document.createElement( '_' );

function sliceArgs( args ) {
  return Array.prototype.slice.call( args, 1 );
}


/**
 * Add CSS class from an element.
 *
 * @param {HTMLNode} element - A DOM element.
 * @param {string} className - CSS class name.
 * @returns {HTMLNode} Nearest parent node that matches the selector.
 */
function addClass( element, className ) {
  var addClassNamesArray = sliceArgs( arguments );
  if ( hasClassList ) {
    element.classList.add.apply( element.classList, addClassNamesArray );
  } else if ( !element.hasClass( className ) ) {
    element.className += addClassNamesArray.join( ' ' );
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
function contains ( element, className ) {
  if ( hasClassList ) {
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
function removeClass( element ) {
  var removeClassNamesArray = sliceArgs( arguments );
  if ( hasClassList ) {
    element.classList.remove.apply( element.classList, removeClassNamesArray );
  } else {
    classes = element.className.split( ' ' );
    removeClassNamesArray.forEach( function( className ) {
      if ( className ) {
        classes.splice( classes.indexOf( className ), 1);
      }
    } );
    element.className = classes.join( ' ' );
  }
}

/**
 * Toggle CSS class on an element.
 *
 * @param {HTMLNode} element - A DOM element.
 * @param {boolean} forceFlag - Boolean indicating whether to forcibly remove class.
 * @returns {HTMLNode} Boolean indicating wether the flag existed.
 */
function toggleClass( element, className, forceFlag ) {
  var toggleClassNamesArray = sliceArgs( arguments );
  var exists = false;
  if ( hasClassList ) {
     exists = element.classList.toggle.apply( element.classList, toggleClassNamesArray  );
  } else {
    if ( forceFlag === false || contains( element, toggleClassNamesArray) ) {
      removeClass( element, forceFlag );
    } else {
      addClass( element, forceFlag );
      exists = true;
    }
  }

  return exists;
};


// Expose public methods.
module.exports = { addClass: addClass,
                   contains: contains,
                   hasClassList: hasClassList,
                   removeClass: removeClass,
                   toggleClass: toggleClass
};
