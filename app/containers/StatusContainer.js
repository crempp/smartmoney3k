import React from 'react';
import PortfolioValue from '../components/PortfolioValue';
import CashDisplay from '../components/CashDisplay';

import '../style/containers/StatusContainer.scss';

export default class StatusContainer extends React.Component {
  render () {
    return (
      <div className='status-container'>
        <PortfolioValue portfolio={ this.props.portfolio } />
        <CashDisplay cash={ this.props.cash } />
      </div>
    )
  }
}