import { minStockCount, maxStockCount } from './Settings'
import {generateStocks} from './Generators';


export default class Exchange {
  constructor(name) {
    this.name = name;
    this.numStocks = chance.integer({
      min: minStockCount, max: maxStockCount
    });
    this.stocks = generateStocks(this.numStocks);
  }
}