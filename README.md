
# :warning: THIS REPO IS DEPRECATED (10/17/2017) :warning:
Please migrate to using [capital-framework](https://github.com/cfpb/capital-framework).

# AtomicComponent

Micro Framework for building Atomic Components.

## Installation
  - Run `npm install`.
  - Run `gulp build`.

## Usage

This framework is intended to be used in conjunction with adherence to Atomic Design principles. It helps provide a uniform way to build Atomic components using HTML, CSS, and JavaScript. An example use case in building a Molecule is as follows:

Molecules are prefixed with “m-” in CSS, JavaScript, and HTML files.

**HTML**:
```
<div class="m-notification">
    <span class="m-notification_icon cf-icon"></span>
    <div class="m-notification_content" role="alert">
        <div class="h4 m-notification_message">message</div>
            <p class="h4 m-notification_explanation">
              Please check the URL and try again.
            </p>
        </div>
    </div>
</div>
```

**CSS**:
```
.m-notification {
    display: none;
    position: relative;
    padding: @notification-padding__px;
    …
```

**JavaScript**:
```
const CONSTANTS = { MESSAGE: 'message', EXPLANATION: 'explanation' };

const NotificationMolecule = Molecule.extend( {
      classes: {
        isVisible:    'm-notification__visible'
      },

      ui: {
        base:        '.m-notification',
        explanation: '.m-notification_explanation',
        message:     '.m-notification_message'
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

In addition to `gulp watch`, there are a number of other important gulp tasks, particularly `gulp build` and `gulp test`, which will build the project and test it, respectively. Using the `gulp --tasks` command you can view all available tasks. The important ones are listed below:

```
gulp build           # Concatenate, optimize, and copy source files to the /lib/ directory.
gulp lint            # Lint the scripts and build files.
gulp test            # Run unit tests.
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
