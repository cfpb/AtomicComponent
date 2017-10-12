/* ==========================================================================
   AtomicComponent

   Base Atomic Component

   Contains code copied from the following with major modifications :

   - Backbone.js ( http://backbonejs.org/docs/backbone.html ).
   - Marionette ( http://marionettejs.com/ ).

   ========================================================================== */

'use strict';

import { h, render, Component } from 'preact';

let table = document.querySelector('table');

class AtomicComponent extends Component {
  render() {
    console.log( arguments )
    let time = new Date().toLocaleTimeString();
    return <div>table.outerHTML</div>;
  }
}



// render an instance of Clock into <body>:
render(<AtomicComponent />, document.body);



module.exports = AtomicComponent;
