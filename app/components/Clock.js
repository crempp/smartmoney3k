import React from 'react';
import { time2str } from '../utils/convert'
import '../style/components/Clock.scss';

export default class Clock extends React.Component {
  render() {
    return (
      <div className='clock'>{time2str(this.props.time)}</div>
    )
  }
}