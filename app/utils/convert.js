export function time2str (timeStamp) {
  let date = new Date(timeStamp);
  return date.getHours().toString(10).padStart(2, "0") + ":" +
    date.getMinutes().toString(10).padStart(2, "0") + ":" +
    date.getSeconds().toString(10).padStart(2, "0");
}