/* ==========================================================================
   AtomicComponent

   Base Atomic Component

   Contains code copied from the following with major modifications :

   - Backbone.js ( http://backbonejs.org/docs/backbone.html ).
   ========================================================================== */
'use strict';

var _assign = require('../utilities/assign').assign;
var _isFunction = require('../utilities/type-checkers').isFunction;
var dataSet = require('../utilities/data-set').dataSet;
var Delegate = require('dom-delegate').Delegate;
var Events = require('../mixins/Events');

function AtomicComponent(element, attrs) {
  this.u_id = this._uniqueId('ac');
  this.ui = {};
  this.element = element;
  attrs = attrs || (attrs = {});
  _assign(this, attrs, this.defaults);
  this.ensureElement();
  this.setCachedElements();
  this.initialize.apply(this, arguments);
}

// Public Methods and properties.
_assign(AtomicComponent.prototype, Events, {

  tagName: 'div',

  initialize: function initialize() {},

  render: function() {
    return this;
  },

  ensureElement: function() {
    if (!this.element) {
      var attrs = _assign({}, this.attributes);
      if (this.id) attrs.id = this.id || this.u_id;
      if (this.className) attrs['class'] = this.className;
      this.setElement(document.createElement(this.tagName));
      this.setElementAttributes(attrs);
    } else {
      this.setElement(this.element);
    }
  },

  setElement: function(element) {
    this.undelegateEvents();
    this.element = element;
    this.delegateEvents();

    return this;
  },

  setCachedElements: function() {
    var key;

    for (key in this.ui) {
      if (this.ui.hasOwnProperty(key)) {
        this[key] = this.element.querySelector(this.ui[key]);
      }
    }

    return this;
  },

  remove: function() {
    if (this.element) {
      this.element.parentNode.removeChild(this.element);
      if (this.element.view) delete this.element.view;
      delete this.element;
    }

    this.undelegateEvents();

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

  addClass: function(className, element) {
    (element || this.element).classList.add(className);
    return this;
  },

  removeClass: function(className, element) {
    (element || this.element).classList.remove(className);

    return this;
  },

  delegateEvents: function(events) {
    var key;
    var method;
    var match;
    var delegateEventSplitter = /^(\S+)\s*(.*)$/;

    events = events || (events = this.events);
    if (!events) return this;
    this.undelegateEvents();
    this._delegate = new Delegate(this.element);
    for (key in events) {
      method = events[key];
      if (_isFunction(this[method])) method = this[method];
      if (!method) continue;
      match = key.match(delegateEventSplitter);
      this.delegate(match[1], match[2], method.bind(this));
    }

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

    return this;
  },

  _uniqueId: function(prefix) {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  }

});


// Static Methods
AtomicComponent.extend = function extend(attributes) {
  function child() {
    this._super = AtomicComponent.prototype;
    return AtomicComponent.apply(this, arguments);
  }
  child.prototype = Object.create(AtomicComponent.prototype);
  _assign(child.prototype, attributes);
  _assign(child, AtomicComponent);
  if (attributes && attributes.hasOwnProperty('selector')) {
    child.selector = attributes.selector;
  }

  return child;
};


AtomicComponent.init = function init() {
  var elements = document.querySelectorAll(this.selector);
  var element;
  var view;

  for (var i = 0; i < elements.length; ++i) {
    element = elements[i];
    view = new this(element);
  }

  return this;
};

module.exports = AtomicComponent;
