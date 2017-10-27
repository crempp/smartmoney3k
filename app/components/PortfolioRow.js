import React from 'react';

export default class PortfolioRow extends React.Component {
  render() {
    let PortfolioRowStyle = {

    };
    let PortfolioDataStyle = {
      backgroundColor: "#ffffff",
      color: "#000000",
    };

    const position = this.props.position;

    if (position.stock.change > 0) {
      PortfolioDataStyle.backgroundColor = "#499a50";
      PortfolioDataStyle.color = "#ffffff";
    }
    else if (position.stock.change < 0) {
      PortfolioDataStyle.backgroundColor = "#ED4337";
      PortfolioDataStyle.color = "#ffffff";
    }

    return (
      <tr style={PortfolioRowStyle}>
        <td style={PortfolioDataStyle}>{position.stock.symbol}</td>
        <td style={PortfolioDataStyle}>${position.stock.price.toFixed(2)}</td>
        <td style={PortfolioDataStyle}>${position.stock.change.toFixed(2)}</td>
        <td style={PortfolioDataStyle}>{position.stock.volume}</td>
        <td style={PortfolioDataStyle}>{position.shares}</td>
        <td style={PortfolioDataStyle}>${position.value.toFixed(2)}</td>
      </tr>)
  }
}