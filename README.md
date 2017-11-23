# Project SG


## Running
```
$ NODE_ENV=development npm run build && npm run start
```


## Roadmap

**v0.1**
Basic functionality. Get basic layout and a simple version of game mechanic in place.

* UI
  * √ Integrate candlebar chart
  * √ Show game status (time/ticks, value, cash)
  * √ Selecting a stock loads that stock in the chart
  * √ Do a UI pass
  * √ Flexbox?
  * √ Move CSS out of root.scss into module sass files

* √ Simulation loop
  * √ Basic random walk value updates for stocks
  * √ Update stock listings
  * √ Update chart

* Simulation Control
  * √ Pause/Play
  * √ system running spinner

* AI System
  * √ Show current system stats (CPU, Mem)
  * √ Show purchasable system upgrades (CPU, Mem) and reduce cost from cash
  * √ TrailingAction module
  * √ Disable modules

**v0.1.1**

* General
  * Backup seed gen for when offline
  * Start time at 0:00 (real time gets messed up when pausing)

* UI
  * Switch charts to https://github.com/rrag/react-stockcharts-examples2
  * Cash/Value graphs

* Simulation
  * ...

* Modules / AI System
  * Better TrailingAction
    * Number of shares
  * Volume Module
  * System won't run if overloaded
  * Sell modules
  * Console for AI modules that lists what they're doing
  
Performance
  * √ Better CSS system


**v0.2**

* UI
  * Better controls
  * Manual buy/sell stocks
  * Pause and reconfigure AI methods
  * Add volume to chart
  * UI cleanup
  * Filter stock list

* Simulation
  * Backfill history so when you start the game there's a graph
  * Better random walk simulation
  * Make time fake - don't track current time, rather use tick count plus start time
  * Add support for multiple exchanges
  * Add capital gains tax

* Modules / AI System
  * ...
  
* Performance / Code cleanup
  * Reduce memory usage
  * Remove chancejs and write own random functions
  * Remove lodash
  * Stock and Portfolio tables are almost the same, maybe generalize them?
  * Generalize modules?
  * Lint
  * Tests
  * Environment handling in webpack

**v0.3**

* Simulation
  * Order book and depth chart

**v1.0**

* Docker container?
