
/* ==========================================================================
   Events

   Mixin to add basic event callback functionality.
   ========================================================================== */

'use strict';

var Events = {

  /**
   * Function used to create a non-operational method that
   *
   * @param {string} eventName - The name of the event to listen for.
   * @param {Function} callback - The element to set as the base element.
   * @returns {object} An instance.
   */
  on: function( eventName, callback ) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push( callback );

    return this;
  },

  /**
   * Function used to remove events from referenced object.
   *
   * @param {string} eventName - The name of the event to listen for.
   * @returns {object} An instance.
   */
  off: function( eventName ) {
    if ( this.events[eventName] ) delete this.events[eventName];

    return this;
  },

  /**
   * Function used to trigger events on referenced object.
   *
   * @param {string} eventName - The name of the event to listen for.
   * @returns {object} An instance.
   */
  trigger: function( eventName ) {
    this.events[eventName] = this.events[eventName] || [];
    for ( var i = 0, len = this.events[eventName].length; i < len; i++ ) {
      this.events[eventName][i].apply( this, arguments );
    }

    return this;
  }

};

module.exports = Events;
