import React from 'react';

export default class Clock extends React.Component {
  render() {
    let date = new Date(this.props.time);
    let time = date.getHours().toString(10).padStart(2, "0") + ":" +
               date.getMinutes().toString(10).padStart(2, "0") + ":" +
               date.getSeconds().toString(10).padStart(2, "0");

    return (
      <span>TIME: {time}</span>
    )
  }
}