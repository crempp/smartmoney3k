export function chunk (array, size) {
  // if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
  //   size = 1;
  // } else {
  //   size = nativeMax(toInteger(size), 0);
  // }
  let length = array === null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  let index = 0,
    resIndex = 0,
    result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }
  return result;
}