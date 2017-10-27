import Stock from './Stock'
import Exchange from './Exchange'

export function generateExchanges() {
  let exchanges = [];
  exchanges.push(new Exchange("FastFunds"));
  exchanges.push(new Exchange("CorpXchg"));
  return exchanges;
}

export function generateStocks(count = 1) {

  function genSymb () {
    return chance.string({
      length: 3,
      pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    })
  }

  let stocks = [];
  let usedSymbols = [];

  for (let i = 0; i < count; i++) {
    let symbol = null;

    // Ensure unique symbols
    while (symbol === null || usedSymbols.includes(symbol)) {
      symbol = genSymb();
    }

    usedSymbols.push(symbol);

    let data = {
      "symbol": symbol,
      "price": chance.floating({min: 0, max: 1000, fixed: 2})
    };

    stocks.push(new Stock(data))
  }

  return stocks
}