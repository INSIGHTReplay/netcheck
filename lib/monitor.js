/**
 * @fileOverview The connectivity monitor.
 */

var EventEmitter = require('events').EventEmitter;

var cip = require('cip');
var network = require('network');
var isOnline = require('is-online');
var CEventEmitter = cip.cast(EventEmitter);

/**
 * The connectivity monitor.
 *
 * @constructor
 */
var Monitor = module.exports = CEventEmitter.extendSingleton(function () {
  /** @type {Boolean} Indicates if the monitor is active */
  this.isActive = false;

  /** @type {Boolean} Indicates if the first internet test was complete */
  this.internetTestComplete = false;
  /** @type {Boolean} Indicates if internet connectivity was detected */
  this.hasInternet = false;

  /** @type {Boolean} Indicates if the first local net test was complete */
  this.localTestComplete = false;
  /** @type {Boolean} Indicates if local net connectivity was detected */
  this.hasLocal = false;

  /** @type {Object} The operating options */
  this.options = {
    monitorInternet: true,
    monitorLocal: true,
    intervalInternet: 60000,
    intervalLocal: 60000,
  };
});

/**
 * Start the connectivity monitor.
 *
 */
Monitor.prototype.init = function() {
  if (this.isActive) {
    return;
  }
  this.isActive = true;

  this._startInternetCheck();
  this._startLocalCheck();
};

/**
 * Perform the Internet connectivity check.
 *
 * @private
 */
Monitor.prototype._startInternetCheck = function() {
  if (!this.options.monitorInternet) {
    return;
  }

  var self = this;
  isOnline(function(err, online) {
    var newState = !!online;
    if (newState !== self.hasInternet || !self.internetTestComplete) {
      self.emit('internet', newState);
    }
    self.hasInternet = newState;
    self.internetTestComplete = true;
    setTimeout(self._startInternetCheck.bind(self), self.options.intervalInternet);
  });
};

/**
 * Perform the local network connectivity check.
 *
 * @private
 */
Monitor.prototype._startLocalCheck = function() {
  if (!this.options.monitorLocal) {
    return;
  }

  var self = this;
  /* jshint camelcase:false */
  network.get_private_ip(function(err) {
    var newState = false;
    if (err) {
      newState = false;
    } else {
      newState = true;
    }
    if (newState !== self.hasLocal || !self.localTestComplete) {
      self.emit('local', newState);
    }
    self.hasLocal = newState;
    self.localTestComplete = true;

    setTimeout(self._startLocalCheck.bind(self), self.options.intervalLocal);
  });
};
