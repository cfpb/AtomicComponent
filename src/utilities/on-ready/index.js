/* ==========================================================================
   On Ready

   Utility for triggering functions only after the page is loaded

   ========================================================================== */

'use strict';

var _readyFunctions = [];

/**
* Checks if the document is ready, if it is, trigger the passed function,
* if not, save the function to an array to be triggered after the page is loaded
* @param {function} fn -
*   Function to run only after the DOM has completely loaded
* @returns {foo} bar
*/
function onReady( fn ) {
  // Ensure we passed a function as the argument
  if ( typeof fn !== 'function' ) {
    return;
  }

  // If the ready state is already complete, run the passed function,
  // otherwise add it to our saved arrray
  if ( document.readyState === 'complete' ) {
    fn();
  } else {
    _readyFunctions.push( fn );
  }

  // When the ready state changes to complete, run the passed function
  document.onreadystatechange = function() {
    if ( document.readyState === 'complete' ) {
      for ( var i = 0, l = _readyFunctions.length; i < l; i++ ) {
        _readyFunctions[i]();
      }
      _readyFunctions = [];
    }
  };

  return _readyFunctions;
}

module.exports = {
  onReady: onReady
};
