# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [UNRELEASED]

### Added

### Removed

### Changed
- Bugfix: ExpandableTransition was not firing transitionComplete event.


## [1.4.0] - 2017-09-21

### Changed

- Transpile source to lib/ dir for npm publishing

## [1.3.2] - 2017-09-05

### Changed

- BUG: Reverted arrow functions within `AtomicComponent` in order to properly
handle the binded value of `this`.
- Fixed typos in code comments.

## [1.3.1] - 2017-08-30

### Added

- Babel for JS transpiling ES6.

### Removed

- `gulp-uglify` replaced with webpack uglify plugin.
- Unused `jasmine-spec-reporter`, `jasmine-reporters`, `gulp-clean`,
`gulp-coveralls`, and `browser-sync`.
- Unused `timer` and `isAnimating` variables from `ExpandableTransition`.
- Refactored to remove `gulp-load-plugins`.
- Refactored to remove `mocha-jsdom`.

### Changed

- Updated gulp file structure to match cfgov-refresh.
- Updated lint gulp task to support auto-fixing.
- Fixed codebase linter errors.
- Updated JS syntax to ES6.
- `webpack`, `webpack-stream`, `chai`, `require-dir`,
and `sinon` to latest.
- dom-class-list toggleClass method had unnecessary apply method.


## [1.3.0] - 2017-04-24

- Added onReady utility for saving functionality until document
  load has completed

## [1.2.2] - 2016-11-30

- Updates ExpandableTransition.js

## [1.2.1] - 2016-11-29

### Changed

- Fix for event mixin trigger logic.

## [1.2.0] - 2016-11-14

### Added

- Added Transition utility for use within the Expandable organism.


## [1.1.0] - 2016-10-28

### Added

- Added README files for utilities.

### Changed

- Fixed issues with documentation and example code.
- Fixed issues with initialization code which caused modifier inilization
  method not to be called.

## [1.0.0] - 2016-09-09

### Added

- Added initial code for Atomic Component framework and utilities.
