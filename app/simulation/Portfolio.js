export default class Stock {
  constructor(data) {
    if (data) {
      this.positions = data
    } else {
      this.positions = []
    }

    this.history = {};
    this.value = 0.0;
    this.change = 0.0;
  }

  addPosition(stock, shares, time) {
    this.positions.push({
      stock: stock,
      shares: shares,
      time: time,
      value: 0.0,
    });
    this.updateValue();
  }

  updateValue(time) {
    let oldValue = this.value;
    this.history[time] = {
      value: this.value
    }
    this.value = 0.0;
    for (let position of this.positions) {
      position.value = position.stock.price * position.shares;
      this.value += position.value;
    }
    this.change = this.value - oldValue;
  }
}