import { simulationTickMs } from './Settings';
import { generateExchanges } from "./Generators";
import Portfolio from './Portfolio';
import Chart from './Chart'

export default class GameState {

  constructor(stateChangeCB) {
    this.stateChangeCB = stateChangeCB;

    this.time = Date.now(); // Milliseconds
    this.tick = 0;

    this.exchanges = generateExchanges();
    this.portfolio = new Portfolio();
    this.cash = 100000.00;

    // TEMP
    this.portfolio.addPosition(this.exchanges[0].stocks[0], 67, this.time);
    this.portfolio.addPosition(this.exchanges[0].stocks[5], 560, this.time);
    this.portfolio.addPosition(this.exchanges[0].stocks[10], 30, this.time);

    this.chart = new Chart(this.portfolio.positions[0].stock);
  }

  startSimulation() {
    this.intervalID = window.setInterval(() => {
      this.simulateTick();
    }, simulationTickMs);
  }

  stopSimulation() {
    clearInterval(this.intervalID);
  }

  simulateTick () {
    console.log("tick");

    this.tick++;
    this.time = Date.now(); // Milliseconds

    for (let exchange of this.exchanges) {
      for (let stock of exchange.stocks) {
        stock.update(this.time);
      }
    }

    this.portfolio.updateValue();

    if (this.tick % this.chart.timeSliceSeconds == 0) {
      this.chart.updateData();
    }

    this.stateChangeCB(this.getStateObject());
  }

  getStateObject () {
    return JSON.parse(JSON.stringify(this));
  }
};

