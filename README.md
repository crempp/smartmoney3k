# Project SG


## Running
```
$ NODE_ENV=development npm run build && npm run start
```


## Roadmap

**v0.1**
Basic functionality. Get basic layout and a simple version of game mechanic in place.

* UI
** √ Integrate candlebar chart
** √ Show game status (time/ticks, value, cash)
** √ Selecting a stock loads that stock in the chart

* √ Simulation loop
** √ Basic random walk value updates for stocks
** √ Update stock listings
** √ Update chart

* Simulation Control
** √ Pause/Play

* AI System
** Show current system stats (CPU, Mem)
** √ Show purchasable system upgrades (CPU, Mem) and reduce cost from cash
** TrailingAction module

v0.1.1
* Switch charts to https://github.com/rrag/react-stockcharts-examples2
* Do a UI pass
** Flexbox?
* Better TrailingAction
** Number of shares
* Disable/Sell modules

**v0.2**


Better controls
* Manual buy/sell stocks
* Pause and reconfigure AI methods

Better simulation
* Backfill history so when you start the game there's a graph
* Better random walk simulation
* Make time fake - don't track current time, rather use tick count plus start time
* Add support for multiple exchanges
* Add capital gains tax

Better UI
* Add volume to chart
* UI cleanup
* Filter stock list

Gameplay tweaking
* Move as much as possible into Simulation/Settings for easier gameplay tweeking

Performance / Code cleanup
* Reduce memory usage
* Remove chancejs and write own random functions
* Better CSS system (Radium?)

Ready for 1.0
* Docker container

Maybe?
* Order book and depth chart