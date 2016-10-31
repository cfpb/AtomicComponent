'use strict';

// Required modules.
var Events = require( '../../mixins/Events.js' );
var BaseTransition = require( './BaseTransition' );
var fnBind = require( '../function-bind' ).bind;
var contains = require( '../dom-class-list' ).contains;
var addClass = require( 'atomic-component/src/utilities/dom-class-list' ).addClass;
var removeClass = require( 'atomic-component/src/utilities/dom-class-list' ).removeClass;

// Exported constants.
var CLASSES = {
  BASE_CLASS:     'u-expandable-transition',
  EXPANDED:       'u-expandable-expanded',
  COLLAPSED:      'u-expandable-collapsed',
  OPEN_DEFAULT:   'u-expandable-content__onload-open'
};

/**
 * ExpandableTransition
 * @class
 *
 * @classdesc Initializes new ExpandableTransition behavior.
 *
 * @param {HTMLNode} element
 *   DOM element to apply move transition to.
 * @returns {ExpandableTransition} An instance. 
 */
function ExpandableTransition( element, CLASSES ) { // eslint-disable-line max-statements, no-inline-comments, max-len

  var _baseTransition = new BaseTransition( element, CLASSES ),
      timer,
      previousHeight,
      isAnimating = false;

  /**
   * @returns {ExpandableTransition} An instance.
   */
  function init() {
    _baseTransition.init();
    var _transitionCompleteBinded = fnBind( _transitionComplete, this );
    _baseTransition.addEventListener( BaseTransition.END_EVENT,
                                      _transitionCompleteBinded );

    if ( contains( element, CLASSES.OPEN_DEFAULT ) ) {
      addClass( element, CLASSES.EXPANDED );
      element.style.maxHeight = element.scrollHeight + 'px';
    } else {
      previousHeight = element.scrollHeight;
      addClass( element, CLASSES.COLLAPSED );
    }

    return this;
  }

  /**
   * Handle the end of a transition.
   */
  function _transitionComplete() {
    this.trigger( BaseTransition.END_EVENT, { target: this } );
    if ( contains( element, CLASSES.EXPANDED ) && element.scrollHeight > previousHeight ) {
      element.style.maxHeight = element.scrollHeight + 'px';
    }
  }

  /**
   * Toggle the expandable
   * @returns {ExpandableTransition} An instance
   */
  function toggleExpandable() {
    if ( !contains( element, CLASSES.COLLAPSED ) ) {
      collapse();
    } else {
      expand();
    }

    return this;
  }

  /**
   * Collapses the expandable content
   * @returns {ExpandableTransition} An instance.
   */
  function collapse() {
    previousHeight = element.scrollHeight;
    element.style.maxHeight = '0px';
    addClass( element, CLASSES.COLLAPSED );
    removeClass( element, CLASSES.EXPANDED );

    return this;
  }

  /**
   * Expands the expandable content
   * @returns {ExpandableTransition} An instance.
   */
  function expand() {
    element.style.maxHeight = previousHeight + 'px';
    addClass( element, CLASSES.EXPANDED );
    removeClass( element, CLASSES.COLLAPSED );

    return this;
  }

  // Attach public events.
  this.addEventListener = Events.on;
  this.trigger = Events.trigger;
  this.removeEventListener = Events.off;

  this.animateOff = _baseTransition.animateOff;
  this.animateOn = _baseTransition.animateOn;
  this.halt = _baseTransition.halt;
  this.isAnimated = _baseTransition.isAnimated;
  this.setElement = _baseTransition.setElement;
  this.remove = _baseTransition.remove;

  this.init = init;
  this.toggleExpandable = toggleExpandable;

  return this;
}

// Public static properties.
ExpandableTransition.CLASSES = CLASSES;

module.exports = ExpandableTransition;