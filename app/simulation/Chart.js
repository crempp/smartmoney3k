import { chunk } from '../utils/utils';
import { chartTimeSliceSeconds } from './Settings';

export default class Chart {
  constructor(state) {
    this.state = state;
    this.data = [];
    this.stock = null;
  }

  setStock (stock) {
    this.stock = stock;
    this.updateData();
  }

  updateData () {
    // TODO: Performance enhancement - we don't have to reprocess every chunk each iteration
    if (this.stock) {
      let data = [];
      let chunks = chunk(this.stock.history, chartTimeSliceSeconds);

      chunks.forEach((c) => {
        let high = null;
        let low = null;
        let volume = 0.0;
        for (let s of c) {
          if (high === null || s.price > high) high = s.price;
          if (low === null || s.price < low) low = s.price;
          volume += s.volume
        }

        data.push({
          "date": c.slice(-1)[0].time,
          "open": c[0].price.toFixed(2).toString(),
          "high": high.toFixed(2).toString(),
          "low": low.toFixed(2).toString(),
          "close": c.slice(-1)[0].price.toFixed(2).toString(),
          "volume": volume.toString()
        })
      })

      this.data = data;
    }
  }
}