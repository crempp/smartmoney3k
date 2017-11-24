# Smart Money 3000

An AI Stock simulation game. Build a series of rules to automatically buy and sell stocks. See how good you are at building and AI to make you rich.


## Demo
[https://smartmoney3k.herokuapp.com/](https://smartmoney3k.herokuapp.com/)


## Running
```
$ NODE_ENV=development npm run build && npm run start
```

## Roadmap

**v0.2**

* General
  * Backup seed gen for when offline
* UI
  * Cash/Value graphs
  * Value change animations
* Simulation
  * ...
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
  * Can I pass the actual gamestate object rather than the serialized version?
  * Use Redux

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
  * Better random walk simulation
  * Add support for multiple exchanges
  * Add capital gains tax
  * Add influence factors such as weather
* AI (Module) System
  * ...
* Performance/Code Cleanup
  * Reduce memory usage
  * Remove chancejs and write own random functions
  * Remove lodash
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