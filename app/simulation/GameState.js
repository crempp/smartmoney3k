import { simulationTickMs } from './Settings';
import { generateExchanges } from "./Generators";
import Portfolio from './Portfolio';

export default class GameState {

  constructor(stateChangeCB) {
    this.stateChangeCB = stateChangeCB;

    this.time = Date.now(); // Milliseconds

    this.exchanges = generateExchanges();

    this.portfolio = new Portfolio();
    // TEMP
    this.portfolio.addPosition(this.exchanges[0].stocks[0], 67, this.time);
    this.portfolio.addPosition(this.exchanges[0].stocks[5], 560, this.time);
    this.portfolio.addPosition(this.exchanges[0].stocks[10], 30, this.time);
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

    this.time = Date.now(); // Milliseconds

    for (let exchange of this.exchanges) {
      for (let stock of exchange.stocks) {
        stock.update(this.time);
      }
    }

    this.portfolio.updateValue();

    this.stateChangeCB(this.getStateObject());
  }

  getStateObject () {
    return JSON.parse(JSON.stringify(this));
  }
};