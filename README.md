# Project SG


## Running
```
$ NODE_ENV=development npm run build && npm run start
```


## Roadmap

**v0.1**
Basic functionality. Get basic layout and a simple version of game mechanic in place.

* √ Random stock generation
* √ Exchange and Portfolio stock listing
* √ Integrate candlebar chart
* √ Show game status (time/ticks, value, cash)
* √ Simulation loop
** √ Basic random walk value updates for stocks
** √ Update stock listings
** √ Update chart
* Selecting a stock loads that stock in the chart
* Simulation controls
** Pause
* System controls
** Show current system stats (CPU, Mem)
** Show purchasable system upgrades (CPU, Mem) and reduce cost from cash
* Select stock to show graph

v0.1.1
* Switch charts to https://github.com/rrag/react-stockcharts-examples2
* Do a UI pass
* Better TrailingAction

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