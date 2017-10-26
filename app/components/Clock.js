import React from 'react';

export default class Clock extends React.Component {
  render() {
    let date = new Date(this.props.time);
    let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return (
      <div>{time}</div>
    )
  }
}