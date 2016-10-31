# Angular Decorators Utilities
A small library containing utilities for AngularJS applications supplied as decorators

[![npm](https://img.shields.io/npm/v/ng-decorators-utils.svg?style=flat-square)](https://www.npmjs.com/package/ng-decorators-utils)

### Contents
- [Notes](#notes)
- [Installation](#installation)

### Notes
Because this module utilises and exposes ECMAScript future features (expected to be ES8 at time of writing), you as a developer must be using a transpiler such as Babel to use this module. If you are unfamiliar with transpilers, pay particular attention to the final stages of the installation details in this readme.

### Installation
Currently this library is available through NPM. Copy and paste the following into your terminal to include the module in your project:

```javascript
npm install ng-decorators-utils --save
```

To use this module as designed you must have either Babel or another transpiler available to compile your source code into a browser friendly distribution prior to runtime.

Babel is currently the most popular choice when it comes to transpilers, however, due to restrictions in Babel 6, to use the module fully you must also include the decorators transform that can be [found here](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy).

Include Babel, and the relevant transforms in your project by running the following:

```javascript
npm install babel-cli babel-preset-es2015 babel-plugin-transform-decorators-legacy --save-dev
```

And ensure that you include the decorators transform in your Babel configuration:

```javascript
{
    "plugins": ["transform-decorators-legacy"]
}
```
