import { moduleAttributes } from '../Settings';
import { uuid } from '../../utils/random';

/**
 * Perform a buy or sell when a stock changes by a set percentage over a given
 * number of seconds
 */
export default class TrailingAction {
  constructor(action, percentChange, trailingSeconds) {
    this.name = 'TrailingAction';
    this.id = uuid();
    this.cpuUsage = moduleAttributes.trailingAction.cpuUsage;
    this.memUsage = moduleAttributes.trailingAction.memUsage;

    this.action = action;
    this.percentChange = percentChange;
    this.trailingSeconds = trailingSeconds;
  }

  run(exchange, actionCB) {
    // console.debug("Running : TrailingAction")
    // console.debug("  " + this.action + " - " + this.percentChange + " - " + this.trailingSeconds);

    for (let stock of exchange.stocks) {
      if (stock.history.length >= this.trailingSeconds) {
        let currentPrice = stock.price;
        let historicalPrice = stock.history.slice(-this.trailingSeconds)[0].price;
        let changePct = 1 - (historicalPrice / currentPrice);
        if (this.action === 'buy' && changePct >= this.percentChange) {
          actionCB({
            action: 'buy',
            shares: 1,
            stock: stock
          })
        } else if (this.action === 'sell' && changePct <= this.percentChange) {
          actionCB({
            action: 'sell',
            shares: 1,
            stock: stock
          })
        }
      }

    }
  }
}