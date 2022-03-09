import React from 'react';
import '../styles/components/CashDisplay.module.scss'

export default class CashDisplay extends React.Component {
  render() {
    return (
      <div className='status-item'>
        <div className='header'>CASH:</div>
        <div className='value'>${this.props.cash.toFixed(2)}</div>
      </div>
    )
  }
}