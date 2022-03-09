export function time2str (timeStamp) {
  let date = new Date(timeStamp);
  date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );

  return date.getHours().toString(10).padStart(2, "0") + ":" +
    date.getMinutes().toString(10).padStart(2, "0") + ":" +
    date.getSeconds().toString(10).padStart(2, "0");
}

export function time2utc (timeStamp) {
  let date = new Date(timeStamp);
  date.setTime( date.getTime() + date.getTimezoneOffset()*60*1000 );
  return date.getTime();
}