import { minStockCount, maxStockCount } from './Settings'
import { generateStocks } from './Generators';
import { integer } from '../utils/random';


export default class Exchange {
  constructor(name) {
    this.name = name;
    this.numStocks = integer(minStockCount, maxStockCount);
    this.stocks = generateStocks(this.numStocks);
  }
}