import React from 'react';

export default class CashDisplay extends React.Component {
  render() {
    let CashDisplayStyle = {
      paddingLeft: "5px",
      paddingRight: "5px",
    };

    return (
      <span style={CashDisplayStyle}>CASH: ${this.props.cash.toFixed(2)}</span>
    )
  }
}