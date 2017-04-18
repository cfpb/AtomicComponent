'use strict';

// Required modules.
var Events = require( '../../mixins/Events.js' );
var BaseTransition = require( './BaseTransition' );
var fnBind = require( '../function-bind' ).bind;
var contains = require( '../dom-class-list' ).contains;
var addClass = require( '../dom-class-list' ).addClass;
var removeClass = require( '../dom-class-list' ).removeClass;
var onReady = require( '../on-ready' ).onReady;

// Exported constants.
var CLASSES = {
  BASE_CLASS:   'u-expandable-transition',
  EXPANDED:     'u-expandable-expanded',
  COLLAPSED:    'u-expandable-collapsed',
  OPEN_DEFAULT: 'u-expandable-content__onload-open'
};

/**
 * ExpandableTransition
 * @class
 *
 * @classdesc Initializes new ExpandableTransition behavior.
 *
 * @param {HTMLNode} element
 *   DOM element to apply move transition to.
 * @param {classes} Object
 *   An Object of custom classes to override the base classes Object
 * @returns {ExpandableTransition} An instance.
 */
function ExpandableTransition( element, classes ) { // eslint-disable-line max-statements, no-inline-comments, max-len
  var classObject = classes || CLASSES;
  var _baseTransition = new BaseTransition( element, classObject );
  var timer;
  var previousHeight;
  var isAnimating = false;

  /**
   * @returns {ExpandableTransition} An instance.
   */
  function init() {
    _baseTransition.init();
    var _transitionCompleteBinded = fnBind( _transitionComplete, this );
    _baseTransition.addEventListener( BaseTransition.END_EVENT,
                                      _transitionCompleteBinded );

    onReady( function() {
      if ( contains( element, classObject.OPEN_DEFAULT ) ) {
        addClass( element, classObject.EXPANDED );
        element.style.maxHeight = element.scrollHeight + 'px';
      } else {
        previousHeight = element.scrollHeight;
        addClass( element, classObject.COLLAPSED );
      }
    } );

    return this;
  }

  /**
   * Handle the end of a transition.
   */
  function _transitionComplete() {
    this.trigger( BaseTransition.END_EVENT, { target: this } );
    if ( contains( element, classObject.EXPANDED ) && element.scrollHeight > previousHeight ) {
      element.style.maxHeight = element.scrollHeight + 'px';
    }
  }

  /**
   * Toggle the expandable
   * @returns {ExpandableTransition} An instance
   */
  function toggleExpandable() {
    if ( !contains( element, classObject.COLLAPSED ) ) {
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
    element.style.maxHeight = '0';
    addClass( element, classObject.COLLAPSED );
    removeClass( element, classObject.EXPANDED );

    return this;
  }

  /**
   * Expands the expandable content
   * @returns {ExpandableTransition} An instance.
   */
  function expand() {
    element.style.maxHeight = previousHeight + 'px';
    addClass( element, classObject.EXPANDED );
    removeClass( element, classObject.COLLAPSED );

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
  this.collapse = collapse;
  this.expand = expand;

  return this;
}

// Public static properties.
ExpandableTransition.CLASSES = CLASSES;

module.exports = ExpandableTransition;
