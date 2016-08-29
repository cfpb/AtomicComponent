/* ==========================================================================
   AtomicComponent

   Base Atomic Component

   Contains code copied from the following with major modifications :

   - Backbone.js ( http://backbonejs.org/docs/backbone.html ).
   ========================================================================== */
'use strict';

var assign = require('../utilities/object-assign').assign;
var isFunction = require('../utilities/type-checkers').isFunction;
var classList = require('../utilities/dom-class-list');
var dataSet = require('../utilities/data-set').dataSet;
var Delegate = require('dom-delegate').Delegate;
var Events = require('../mixins/Events');

function AtomicComponent(element, attrs) {
  this.u_id = this._uniqueId('ac');
  this.element = element;
  attrs = attrs || (attrs = {});
  assign(this, attrs, this.defaults);
  this.ensureElement();
  this.setCachedElements();
  this.initialize.apply(this, arguments);
  this.trigger( 'initialized' );
}

// Public Methods and properties.
assign(AtomicComponent.prototype, Events, classList, {

  tagName: 'div',

  initialize: function(){},

  render: function() {
    return this;
  },

  ensureElement: function() {
    if (!this.element) {
      var attrs = assign({}, this.attributes);
      if (this.id) attrs.id = this.id || this.u_id;
      if (this.className) attrs['class'] = this.className;
      this.setElement(document.createElement(this.tagName));
      this.setElementAttributes(attrs);
    } else {
      this.setElement(this.element);
    }
    this.element.setAttribute( 'data-bound', true );
  },

  setElement: function(element) {
    this.undelegateEvents();
    this.element = element;
    this.delegateEvents();

    return this;
  },

  setCachedElements: function() {
    var key;
    var ui = assign( {}, this.ui );
    var element;
    for ( key in ui ) {
      if ( ui.hasOwnProperty( key ) ) {
        element = this.element.querySelectorAll( ui[key] );

        if ( element.length === 1 ) {
          ui[key] = element[0];
        } else if ( element.length > 1 ) {
          ui[key] = element
        }
      }
    }

    console.log( ui )
    return this.ui = ui;
  },

  destroy: function() {
    if (this.element) {
      this.element.parentNode.removeChild(this.element);
      if (this.element.view) delete this.element.view;
      delete this.element;
    }

    this.undelegateEvents();
    this.trigger( 'destroyed' );

    return true;
  },

  setElementAttributes: function(attributes) {
    var property;
    for (property in attributes) {
      if (attributes.hasOwnProperty(property)) {
        this.element.setAttribute(property, attributes[property]);
      }
    }
  },

  delegateEvents: function(events) {
    var key;
    var method;
    var match;
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    events = events || ( events = this.events );
    if ( !events ) return this;
    this.undelegateEvents();
    this._delegate = new Delegate( this.element );
    for ( key in events ) {
      method = events[key];
      if ( isFunction( this[method] ) ) method = this[method];
      if ( !method ) continue;
      match = key.match( delegateEventSplitter );
      this.delegate( match[1], match[2], method.bind( this ) );
    }
    this.trigger( 'bound' );

   return this;
  },

  delegate: function(eventName, selector, listener) {
    this._delegate.on(eventName, selector, listener);
    return this;
  },

  undelegateEvents: function() {
    if (this._delegate) {
      this._delegate.destroy();
    }

    this.element.removeAttribute( 'data-bound' )

    return this;
  },

  _uniqueId: function(prefix) {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  }

} );

// Static Methods
AtomicComponent.extend = function extend(attributes) {
  function child() {
    this.super = AtomicComponent.prototype;
    return AtomicComponent.apply(this, arguments);
  }
  child.prototype = Object.create( AtomicComponent.prototype );
  assign(child.prototype, attributes);
  assign(child, AtomicComponent);

  if ( attributes.hasOwnProperty( 'classes' ) &&
       attributes.classes.hasOwnProperty( 'baseElement' ) ) {
    child.selector = attributes.classes.baseElement;
  }
  child.constants = {};

  return child;
};

AtomicComponent.init = function init() {
  var elements = document.querySelectorAll( this.selector );
  var element;
  var view;

  for ( var i = 0; i < elements.length; ++i ) {
    element = elements[i];
    if( element.hasAttribute( 'data-bound' ) === false ) {
      view = new this( element );
    }
  }

  return this;
};

module.exports = AtomicComponent;
