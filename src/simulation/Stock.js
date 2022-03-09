import {
  priceChangeMean,
  priceChangeStdDev,
  volumeChangeMean,
  volumeChangeStdDev,
  volumeDownwardResistancePoint,
  volumeDownwardResistanceFactor,
  volumeUpwarddResistancePoint,
  volumeUpwarddResistanceFactor,
  priceDownwardResistancePoint,
  priceDownwardResistanceFactor,
  priceUpwarddResistancePoint,
  priceUpwarddResistanceFactor,
  minStockValue,
  maxStockValue,
  minVolumeValue,
  maxVolumeValue,

} from './Settings';
import { gaussian } from '../utils/random';

export default class Stock {
  constructor(data) {
    this.symbol = data.symbol;
    this.price = data.price;
    this.change = 0.0;
    this.volume = 0;

    this.history = [];
  }

  randomWalkVolume (currentVol) {
    let mean = volumeChangeMean;
    let stdDev = volumeChangeStdDev

    // Apply downward/upward resistance to prevent unlimited boundries
    if (currentVol <= volumeDownwardResistancePoint) {
      mean += mean * volumeDownwardResistanceFactor;
    }
    else if (currentVol >= volumeUpwarddResistancePoint) {
      mean -= mean * volumeUpwarddResistanceFactor;
    }

    let g = gaussian(mean, stdDev);
    let gd = g();

    let value = Math.round(currentVol + gd);
    value = Math.max(value, minVolumeValue);
    value = Math.min(value, maxVolumeValue);
    return value
  }

  randomWalkPrice (currentPrice) {
    let mean = priceChangeMean;
    let stdDev = priceChangeStdDev;

    // Apply downward/upward resistance to prevent unlimited boundries
    if (currentPrice <= priceDownwardResistancePoint) {
      mean += mean * priceDownwardResistanceFactor;
    }
    else if (currentPrice >= priceUpwarddResistancePoint) {
      mean -= mean * priceUpwarddResistanceFactor;
    }

    let g = gaussian(mean, stdDev);
    let gd = g();

    let value = currentPrice + gd;
    value = Math.max(value, minStockValue);
    value = Math.min(value, maxStockValue);
    return value
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