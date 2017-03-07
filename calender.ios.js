/**
 * @providesModule calender
 * @flow
 */
'use strict';

var Nativecalender = require('NativeModules').calender;

/**
 * High-level docs for the calender iOS API can be written here.
 */

var calender = {
  test: function() {
    Nativecalender.test();
  }
};

module.exports = calender;
