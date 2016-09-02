
# AtomicComponent

Micro Framework for building Atomic Components

## Installation
  - Run `npm install`.
  - Run `gulp build`.

## Usage

This framework is intended to be used in conjuction with adherance to Atomic Design principles. It helps provide a uniform way to build Atomic components using HTML, CSS, and Javascript. An example use case in building a Molecule is as follows:

Molecules are prefixed with “m-” in CSS, Javascript, and HTML files.

**HTML**:
```
  <div class="m-notification">
        <span class="m-notification_icon cf-icon"></span>
        <div class="m-notification_content" role="alert"></div>
   </div>
```

**CSS**:
```
  .m-notification {
      display: none;
      position: relative;
      padding: @m-notification-padding__px;
      padding-left: 40px;
  ```

**Javascript**:
   ```
  var CONSTANTS = { MESSAGE: 'message', EXPLANATION: 'explanation' };

  var NotificationMolecule = Molecule.extend( {
        classes: {
          baseElement: '.m-notification',
          isVisible:    'm-notification__visible'
        },

        ui: {
          explanation: 'm-notification_explanation',
          message:     'm-notification_message'
        },

        initialize: function() {
          this.ui.message.textContent = CONSTANTS.MESSAGE;
          this.ui.explanation.textContent = CONSTANTS.EXPLANATION;
        }
  } );

  NotificationMolecule.constants = CONSTANTS;
  NotificationMolecule.init();
   ```

## Gulp Tasks

In addition to gulp watch, there are a number of other important gulp tasks, particularly gulp build and gulp test, which will build the project and test it, respectively. Using the gulp --tasks command you can view all available tasks. The important ones are listed below:

```
gulp build           # Concatenate, optimize, and copy source files to the /build/ directory.
gulp lint            # Lint the scripts and build files.
gulp test            # Run linting, unit and acceptance tests (see below).
```

## Contributing

We welcome your feedback and contributions.
See the [contribution guidelines](CONTRIBUTING.md) for more details.

Additionally, you may want to consider
[contributing to the Capital Framework](https://cfpb.github.io/capital-framework/contributing/),
which is the front-end pattern library used in this project.

## Open source licensing info

1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
