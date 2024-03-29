# Smart Money 3000

[![CircleCI](https://circleci.com/gh/crempp/smartmoney3k.svg?style=svg)](https://circleci.com/gh/crempp/smartmoney3k)
[![CRDemo](https://img.shields.io/badge/demo-cr-lightgrey.svg)](http://smartmoney3k.chadrempp.com)

An AI Stock simulation game. Build a series of rules to automatically buy and sell stocks. See how good you are at building and AI to make you rich.

## Demo
[http://smartmoney3k.chadrempp.com/](http://smartmoney3k.chadrempp.com/)

## Running
```
$ npm run dev
```

## Running in Docker
```
$ docker build . -t smartmoney3k
$ docker run -p 3000:3000 smartmoney3k
```

## Roadmap

**v0.2**

* General
  * ~~Backup seed gen for when offline~~
* UI
  * Cash/Value graphs
  * √ Fix zoom/pan reset on update
  * Technical graphs
* Simulation
  * √ Better random walk simulation
  * Technical data generation
    * Moving Average
    * Bollinger Band
    * Compare
    * MACD
    * RSI and ATR
    * Stochastic Oscillator
    * ForceIndex
    * ElderRay
    * Elder Impulse
    * SAR
    * Volume profile
    * Volume profile by Session
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
  * √ Remove chancejs and write own random functions
  * √ Remove lodash

**v0.3**
* General
  * ...
* UI
  * Better controls
  * Manual buy/sell stocks
  * Pause and reconfigure AI methods
  * UI cleanup - again
  * Filter stock list
  * Value change animations
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
