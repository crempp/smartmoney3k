import React from 'react';
import { time2str } from '../utils/convert'
import styles from '../styles/components/Clock.module.scss';

export default class Clock extends React.Component {
  render() {
    return (
      <div className={styles.clock}>{(time2str(this.props.time))}</div>
    )
  }
}