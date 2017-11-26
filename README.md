# Smart Money 3000

An AI Stock simulation game. Build a series of rules to automatically buy and sell stocks. See how good you are at building and AI to make you rich.

## Demo
[https://smartmoney3k.herokuapp.com/](https://smartmoney3k.herokuapp.com/)

## Running
```
$ npm run start-dev
```

## Roadmap

**v0.2**
* General
  * ~~Backup seed gen for when offline~~
* UI
  * Streaming chart
  * Cash/Value graphs
  * Value change animations
  * Technical graphs
* Simulation
  * √ Better random walk simulation
* AI (Module) System
  * Better TrailingAction
    * Number of shares
  * Volume Module
  * System won't run if overloaded
  * Sell modules
  * Console for AI modules that lists what they're doing
  * AND/OR/NOT connectors between modules
  * Module drag-n-drop
* Performance/Code Cleanup
  * √ Remove chancejs and write own random functions
  * √ Remove lodash
  * Use Redux
    * Can I pass the act
ual gamestate object rather than the serialized version?

**v0.3**
* General
  * ...
* UI
  * Better controls
  * Manual buy/sell stocks
  * Pause and reconfigure AI methods
  * UI cleanup - again
  * Filter stock list
* Simulation
  * Add support for multiple exchanges
  * Add capital gains tax
  * Add influence factors such as weather
* AI (Module) System
  * ...
* Performance/Code Cleanup
  * Reduce memory usage
  * Stock and Portfolio tables are almost the same, maybe generalize them?
  * Generalize modules?
  * Lint
  * Tests
  * Environment handling in webpack

**v0.4**
* General
  * ...
* UI
  * ...
* Simulation
  * Order book and depth chart
* AI (Module) System
  * ...
* Performance/Code Cleanup
  * ...

**v1.0**

* General
  * Docker container?
* UI
  * ...
* Simulation
  * ...
* AI (Module) System
  * ...
* Performance/Code Cleanup
  * ...