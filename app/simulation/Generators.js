import Stock from './Stock'
import Exchange from './Exchange'
import { initialMinStockValue, initialMaxStockValue } from './Settings';
import { stockSymbol, float } from '../utils/random';

export function generateExchanges() {
  let exchanges = [];
  exchanges.push(new Exchange("FastFunds"));
  //exchanges.push(new Exchange("CorpXchg"));
  return exchanges;
}

export function generateStocks(count = 1) {
  let stocks = [];
  let usedSymbols = [];

  for (let i = 0; i < count; i++) {
    let symbol = null;

    // Ensure unique symbols
    while (symbol === null || usedSymbols.includes(symbol)) {
      symbol = stockSymbol();
    }

    usedSymbols.push(symbol);

    let data = {
      "symbol": symbol,
      "price": float(initialMinStockValue, initialMaxStockValue, 2)
    };

    stocks.push(new Stock(data));
  }

  return stocks
}