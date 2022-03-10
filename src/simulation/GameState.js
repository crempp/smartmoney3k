import {
  simulationTickMs,
  initialCash,
  backfillTicks,
  chartTimeSliceSeconds
} from './Settings';
import { generateExchanges } from './Generators';
import Portfolio from './Portfolio';
import Chart from './Chart';
import System from './System';
import Exchange from "./Exchange";

export default class GameState {

  constructor(triggerGameStateChangeCB) {
    this.triggerGameStateChangeCB = triggerGameStateChangeCB;

    this.running = false;
    this.time = 0; // Milliseconds
    this.tick = 0;
    this.exchanges = generateExchanges();
    this.portfolio = new Portfolio(this);
    this.cash = initialCash;
    this.system = new System(this);
    this.chart = new Chart(null);

    this.backfillStockData();

    // Select first stock for chart initially (don't trigger state change).
    this.chart.setStock(this.exchanges[0].stocks[0]);
  }

  purchaseCPU(count, costValidation) {
    let cost = this.system.nextCPUCosFunction();
    if (costValidation !== cost ) {
      console.warn('CPU cost validation error! Expected ' + costValidation +
        ' actual cost ' + cost);
    }

    let totalCost = count * cost;
    // If we don't have enough money just don't do anything
    if (totalCost < this.cash) {
      this.system.purchaseCPU(count);
      this.cash -= totalCost;
    }
    this.triggerGameStateChangeCB(this.getStateObject());
  }

  purchaseMem(count, costValidation) {
    let cost = this.system.nextMemCostFunction();
    if (costValidation !== cost ) {
      console.warn('MEM cost validation error! Expected ' + costValidation +
        ' actual cost ' + cost);
    }

    let totalCost = count * cost;
    // If we don't have enough money just don't do anything
    if (totalCost < this.cash) {
      this.system.purchaseMem(count);
      this.cash -= totalCost;
    }
    this.triggerGameStateChangeCB(this.getStateObject());
  }

  purchaseComponent(data){
    // If we don't have enough money just don't do anything
    if (data.cost < this.cash) {
      this.cash -= data.cost;
      this.system.addModule(data);
    }
    this.triggerGameStateChangeCB(this.getStateObject());
  }

  setStock (stock) {
    this.chart.setStock(stock);
    this.triggerGameStateChangeCB(this.getStateObject());
  }

  getStock(symbol) {
    for (let s of this.exchanges[0].stocks) {
      if (s.symbol === symbol) return s;
    }
    return null;
  }

  updateRunningModule(id, data) {
    for (let module of this.system.modules) {
      if (module.id === id) {
        module.action = data.action;
        module.direction = data.direction;
        module.enabled = data.enabled;
        module.percentChange = parseInt(data.percentChange);
        module.trailingSeconds = parseInt(data.trailingSeconds);
      }
    }
  }

  marketAction(action) {
    console.debug("Market Action requested");
    console.debug("  attempting to " + action.action + " " + action.shares + " shares at $" + action.stock.price);
    if (action.action === 'buy'){
      // Will return null if fails
      let cost = this.portfolio.buyPosition(action.stock, action.shares, this.time)
      if (cost) {
        this.cash -= cost;
        console.debug("  Action succeeded, you now have $" + this.cash);
      } else {
        console.debug("  Action failed");
      }
    } else if (action.action === 'sell') {
      // Will return null if fails
      let sharesSold = this.portfolio.sellPosition(action.stock, action.shares, this.time)
      if (sharesSold) {
        this.cash += sharesSold * action.stock.price;
        console.debug("  Action succeeded, you now have $" + this.cash);
      } else {
        console.debug("  Action failed");
      }
    }

  }

  startSimulation() {
    this.intervalID = window.setInterval(() => {
      this.simulateTick();
    }, simulationTickMs);
    this.running = true;
    this.triggerGameStateChangeCB(this.getStateObject());
  }

  stopSimulation() {
    clearInterval(this.intervalID);
    this.running = false;
    this.triggerGameStateChangeCB(this.getStateObject());
  }

  backfillStockData () {
    for (let i = 0; i < backfillTicks; i++) {
      // Update time
      this.tick++;
      this.time += 1000; // Milliseconds

      // Update stock values
      for (let exchange of this.exchanges) {
        for (let stock of exchange.stocks) {
          stock.update(this.time);
        }
      }
    }
  }

  simulateTick () {
    // console.debug('tick');

    // Update time
    this.tick++;
    this.time += 1000; // Milliseconds

    // Update stock values
    for (let exchange of this.exchanges) {
      for (let stock of exchange.stocks) {
        stock.update(this.time);
      }
    }

    // Update portfolio
    this.portfolio.update();

    // Update chart
    if (this.tick % chartTimeSliceSeconds === 0) {
      this.chart.updateData();
    }

    // Run system
    this.system.run(this.marketAction.bind(this));

    // Force a React state update
    this.triggerGameStateChangeCB(this.getStateObject());
  }

  getStateObject () {
    // Ignore state property, it causes a circular reference.
    let stateString = JSON.stringify(this, ( key, value) => {
      if( key == 'state') { return null;}
      else {return value;}
    });
    return JSON.parse(stateString);
  }
};

