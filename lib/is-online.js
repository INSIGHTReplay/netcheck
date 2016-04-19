/**
 * @fileOverview Wrapper implementation for is online check.
 */

var Promise = require('bluebird');

var isOnline = Promise.promisify(require('isOnline'));
var isReachable = Promise.promisify(require('isReachable'));

/**
 * Wrapper implementation for is online check.
 *
 * @param {?string} customHostname set hostname to reach.
 * @return {Promise(boolean)} A Promise with boolean value.
 */
var isOnline = module.exports = Promise.method(function(customHostname) {
  if (!customHostname) {
    return isOnline();
  } else {
    return isReachable(customHostname);
  }
});

