import React from 'react';

export default class StockRow extends React.Component {
  render() {
    let StockRowStyle = {

    };
    let StockDataStyle = {
      backgroundColor: "#ffffff",
      color: "#000000",
    };

    const stock = this.props.stock;

    if (stock.change > 0) {
      StockDataStyle.backgroundColor = "#499a50";
      StockDataStyle.color = "#ffffff";
    }
    else if (stock.change < 0) {
      StockDataStyle.backgroundColor = "#ED4337";
      StockDataStyle.color = "#ffffff";
    }

    return (
      <tr style={StockRowStyle}>
        <td style={StockDataStyle}>{stock.symbol}</td>
        <td style={StockDataStyle}>${stock.price.toFixed(2)}</td>
        <td style={StockDataStyle}>${stock.change.toFixed(2)}</td>
        <td style={StockDataStyle}>{stock.volume}</td>
      </tr>)
  }
}