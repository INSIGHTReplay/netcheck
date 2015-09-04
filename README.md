# netcheck

> Will monitor Internet and local network connectivity and inform about their state.

[![Build Status](https://secure.travis-ci.org/INSIGHTReplay/netcheck.png?branch=master)](http://travis-ci.org/INSIGHTReplay/netcheck)

## Install

Install the module using NPM:

```
npm install netcheck --save
```

## <a name='TOC'>Table of Contents</a>

1. [Overview](#overview)
1. [API](#api)

## Overview

Netcheck will provide methods and events to notify you of changes in network connectivity.

### Quick Example

```js
var netcheck = require('netcheck');

// Launch monitors, you only need to invoke this once.
netcheck.init();

netcheck.on('internet', function(isConnected) {
    // handle internet connectivity state change
});

netcheck.on('local', function(isConnected) {
    // handle local conntivity state change
});

netcheck.hasInternet()
    .then(function() {
        // We have internet connectivity
    })
    .catch(function() {
        // No connectivity
    });

netcheck.hasLocal()
    .then(function() {
        // We have connectivity with the local network
    })
    .catch(function() {
        // No connectivity
    });
```

## API

### Methods

* `init()` Starts the connectivity monitor, you only need to invoke this once.
* `hasInternet()` Returns a [bluebird][Bluebird] Promise and informs if Internet is accessible.
* `hasLocal()` Returns a [bluebird][Bluebird] Promise and informs if node server is connected to a local network.
* `setup(options)` Define options for the monitor operation:
    * `monitorInternet` *Type*: **Boolean** *Default*: `true` Enable or disable Internet monitor.
    * `monitorLocal` *Type*: **Boolean** *Default*: `true` Enable or disable local network monitor.
    * `intervalInternet` *Type*: **Number** *Default*: `60000` Define the monitor interval in milliseconds for Internet check, default is 1min.
    * `intervalLocal` *Type*: **Number** *Default*: `60000` Define the monitor interval in milliseconds for local network check, default is 1min.

> You may not trigger the connectivity monitor by not calling the `netcheck.init()` method, when any of the `hasInternet()` or `hasLocal()` methods are called they will perform the tests on the spot.

### Events

netcheck extends Node's native EventEmitter and provides the following methods:

* `on(event, cb)`
* `once(event, cb)`
* `removeListener(event, cb)`
* `removeAllListeners()`

> [Read on for more on their definition and behavior](https://nodejs.org/api/events.html).

Events emitted:

* `internet` Gets emitted whenever a state change has occurred on the Internet connectivity.
    * *isConnected*, *Type*: **Boolean** A single argument indicating connectivity.
* `local` Gets emitted whenever a state change has occurred on the Local Network connectivity.
    * *isConnected*, *Type*: **Boolean** A single argument indicating connectivity.


## Release History

- **v0.0.1**, *04 Sep 2015*
    - Big Bang

## Contributors

* [Thanasis Polychronakis](https://github.com/thanpolas)

## License

Copyright ©2015 Insight Replay, Inc. Licensed under the MIT license.

[Bluebird]: https://github.com/petkaantonov/bluebird
