import { minStockValue } from './Settings';

export default class Stock {
  constructor(data) {
    this.symbol = data.symbol;
    this.price = data.price;
    this.change = 0.0;
    this.volume = 0;

    this.history = [];
  }

  randomWalkVolume (currentVol) {
    let min = currentVol - 100
    let max = currentVol + 100

    return Math.max(Math.round(Math.random() * (max - min) + min), 0);
  }

  randomWalkPrice (currentPrice) {
    let min = currentPrice - 10
    let max = currentPrice + 10

    return Math.max(Math.random() * (max - min) + min, minStockValue);
  }

  update (time) {
    this.volume = this.randomWalkVolume(this.volume);

    let oldPrice = this.price;
    this.price = this.randomWalkPrice(this.price);
    this.change = oldPrice - this.price;

    this.history.push({
      time: new Date(time),
      price: this.price,
      volume: this.volume
    });
  }
};