import { moduleAttributes } from '../Settings';
import { uuid } from '../../utils/random';

/**
 * Perform a buy or sell when a stock changes by a set percentage over a given
 * number of seconds
 */
export default class TrailingAction {
  constructor(state, action, direction, percentChange, trailingSeconds) {
    this.state = state;
    this.name = 'TrailingAction';
    this.id = uuid();
    this.cpuUsage = moduleAttributes.trailingAction.cpuUsage;
    this.memUsage = moduleAttributes.trailingAction.memUsage;

    this.action = action;
    this.direction = direction;
    this.percentChange = percentChange;
    this.trailingSeconds = trailingSeconds;

    this.cpuUsed = 0;
    this.memUsed = 0;
    this.enabled = false;
  }

  _getChange(stock) {
    let currentPrice = stock.price;
    let historicalPrice = stock.history.slice(-this.trailingSeconds)[0].price;
    return 100 * (1 - (historicalPrice / currentPrice));
  }

  _isBuyMatch(changePct) {
    return (
      (this.direction === 'drops' && changePct <= -this.percentChange) ||
      (this.direction === 'rises' && changePct >= this.percentChange)
    );
  }

  _isSellMatch(changePct) {
    return (
      (this.direction === 'rises' && changePct >= this.percentChange) ||
      (this.direction === 'drops' && changePct <= -this.percentChange)
    )
  }

  run(actionCB) {
    this.cpuUsed = this.cpuUsage;
    this.memUsed = this.memUsage;

    let exchange = this.state.exchanges[0];
    let portfolio = this.state.portfolio;

    if (this.enabled && this.state.tick >= this.trailingSeconds) {

      if (this.action === 'buy') {
        for (let stock of exchange.stocks) {
          let changePct = this._getChange(stock);
          if (this._isBuyMatch(changePct)) {

            console.debug("TrailingAction: matched stock " + stock.symbol +
              " [ " + this.action + " - " + changePct + "/" + this.percentChange + " - " +
              this.trailingSeconds + " ]")

            actionCB({
              action: 'buy',
              shares: 1,
              stock: stock
            })
          }
        }
      }

      else if (this.action === 'sell') {
        for (let position of portfolio.positions) {
          let changePct = this._getChange(position.stock);
          if (this._isSellMatch(changePct)) {
            console.debug("TrailingAction: matched stock " + position.stock.symbol +
              " [ " + this.action + " - " + changePct + "/" + this.percentChange + " - " +
              this.trailingSeconds + " ]")
            actionCB({
              action: 'sell',
              shares: 1,
              stock: position.stock
            })
          }
        }
      }

    }
  }
}