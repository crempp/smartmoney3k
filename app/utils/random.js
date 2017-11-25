export function uuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Returns a gaussian random function with the given mean and stdev.
 *
 * https://stackoverflow.com/a/35599181/1436323
 *
 * NOTE: I think I saw a bug when mean=100, stdev=100 where occasionally
 * but repeatedly all values land below the mean of 100.
 *
 * @param mean
 * @param stdev
 * @returns {Function}
 */
export function gaussian(mean, stdev, forcePos) {
  forcePos = forcePos || false;

  let y2;
  let use_last = false;
  return function() {
    let y1;
    if(use_last) {
      y1 = y2;
      use_last = false;
    }
    else {
      let x1, x2, w;
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w  = x1 * x1 + x2 * x2;
      } while( w >= 1.0);
      w = Math.sqrt((-2.0 * Math.log(w))/w);
      y1 = x1 * w;
      y2 = x2 * w;
      use_last = true;
    }

    let retval = mean + stdev * y1;

    if(retval > 0 || !forcePos)
      return retval;
    return -retval;
  }
}