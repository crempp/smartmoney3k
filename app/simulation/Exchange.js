import _ from 'lodash';

import {generateStocks} from './Generators';

const MIN_STOCK_COUNT = 20;
const MAX_STOCK_COUNT = 200;

export default class Exchange {
  constructor(name) {
    this.name = name;
    this.numStocks = chance.integer({
      min: MIN_STOCK_COUNT, max: MAX_STOCK_COUNT
    });
    this.stocks = generateStocks(this.numStocks);

    // TODO: Generate stocks

  }
}