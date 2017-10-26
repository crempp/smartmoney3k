import Stock from './Stock'

export function generateExchange() {
  
}

export function generateStock() {
  let data = {
    "symbol": chance.string({
      length: 3,
      pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }),
    "price": chance.floating({min: 0, max: 1000, fixed: 2})
  };

  return new Stock(data);
}