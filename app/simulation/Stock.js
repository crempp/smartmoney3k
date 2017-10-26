export default class Stock {
  constructor(data) {
    this.symbol = data.symbol;
    this.price = data.price;

    this.history = {};
  }

  update (time) {
    this.history[time] = {
      price: this.price
    }

    this.price += 1;
  }
};