export default class Stock {
  constructor(state) {
    this.state = state;
    this.positions = [];
    this.history = {};
    this.value = 0.0;
    this.change = 0.0;
  }

  buyPosition(stock, shares, time) {
    let cost = (shares * stock.price);
    if (cost <= this.state.cash) {
      if (this.hasPosition(stock)) {
        for (let i = 0; i < this.positions.length; i++) {
          if (this.positions[i].stock.symbol === stock.symbol) {
            this.positions[i].shares += shares;
            break;
          }
        }
        this.update();
        return cost;
      } else {
        this.positions.push({
          stock: stock,
          shares: shares,
          time: time,
          value: 0.0,
        });
        this.update();
        return cost;
      }
    } else {
      return null;
    }
  }

  sellPosition(stock, shares, time) {
    for (let i = 0; i < this.positions.length; i++) {
      let position = this.positions[i];
      if (position.stock.symbol === stock.symbol) {
        let remainingShares = position.shares - shares;
        if (remainingShares < 0) {
          // Not enough shares to sell, sell what we have
          this.positions.splice(i, 1);
          return position.shares;
        } else if (remainingShares === 0) {
          // Sold all our shares, remove from portfolio
          this.positions.splice(i, 1);
          return remainingShares;
        } else {
          // Selling only a portion of our shares
          this.positions[i].shares = remainingShares;
          return remainingShares;
        }
      }
    }
  }

  hasPosition(stock) {
    for (let position of this.positions) {
      if (position.stock.symbol === stock.symbol) {
        return true;
      }
    }
    return false;
  }

  update(time) {
    // Update the dollar value of the portfolio
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