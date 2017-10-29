export default class Stock {
  constructor(data) {
    this.symbol = data.symbol;
    this.price = data.price;
    this.change = 0.0;
    this.volume = 0;

    this.history = [];
  }

  update (time) {
    this.history.push({
      time: time,
      price: this.price,
      volume: this.volume
    });

    this.volume = chance.integer({min: 0, max: 5000});

    this.change = chance.floating({min: -50, max: 50, fixed: 2});
    let newPrice = Math.max(0, this.price + this.change);
    this.price = newPrice;
  }
};