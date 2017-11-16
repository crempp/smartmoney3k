import React from 'react';
import { time2str } from '../utils/convert'
import '../style/components/clock.scss';

export default class Clock extends React.Component {
  render() {
    return (
      <div className='status-item'>
        <div className='header'>TIME:</div>
        <div className='value'>{time2str(this.props.time)}</div>
      </div>
    )
  }
}