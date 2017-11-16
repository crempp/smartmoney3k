import React from 'react';

export default class PortfolioValue extends React.Component {
  render() {
    let PortfolioValueStyle = {
      backgroundColor: "#ffffff",
      color: "#000000",
      paddingLeft: "5px",
      paddingRight: "5px",
    };

    let value = this.props.portfolio.value;
    let change = this.props.portfolio.change;

    if (change > 0) {
      PortfolioValueStyle.backgroundColor = "#499a50";
      PortfolioValueStyle.color = "#ffffff";
    }
    else if (change < 0) {
      PortfolioValueStyle.backgroundColor = "#ED4337";
      PortfolioValueStyle.color = "#ffffff";
    }

    return (
      <div className='status-item'>
        <div className='header'>VALUE:</div>
      <div className='value'>${value.toFixed(2)}</div>
    </div>
    )
  }
}