import Exchange from './Exchange';
import { simulationTickMs } from './Settings';


export default class GameState {

  constructor(stateChangeCB) {
    this.stateChangeCB = stateChangeCB;

    this.exchanges = [];

    this.exchanges.push(new Exchange("FastFunds"));
    this.exchanges.push(new Exchange("CorpXchg"));

    this.time = Date.now(); // Milliseconds
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

    this.stateChangeCB(this.getStateObject());
  }

  getStateObject () {
    return JSON.parse(JSON.stringify(this));
  }
};