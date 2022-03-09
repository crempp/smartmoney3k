import React from 'react';
import PortfolioValue from './PortfolioValue';
import CashDisplay from './CashDisplay';

import styles from '../styles/containers/StatusContainer.module.scss';

export default class StatusContainer extends React.Component {
  render () {
    return (
      <div className={styles.statusContainer}>
        <PortfolioValue portfolio={ this.props.portfolio } />
        <CashDisplay cash={ this.props.cash } />
      </div>
    )
  }
}