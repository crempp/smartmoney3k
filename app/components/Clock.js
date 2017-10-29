import React from 'react';
import { time2str } from '../utils/convert'

const ClockStyle = {
  fontWeight: "bold",
  paddingRight: "5px",
};

export default class Clock extends React.Component {
  render() {
    return (
      <span style={ClockStyle}>{time2str(this.props.time)}</span>
    )
  }
}