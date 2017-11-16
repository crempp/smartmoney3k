import React from 'react';

export default class StockRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleStockClick = this.handleStockClick.bind(this);
  }

  handleStockClick() {
    this.props.onUpdate(this.props.stock);
  }

  render() {
    let StockRowStyle = {
      cursor: "pointer",
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
      <tr onClick={this.handleStockClick} >
        <td>{stock.symbol}</td>
        <td>${stock.price.toFixed(2)}</td>
        <td>${stock.change.toFixed(2)}</td>
        <td>{stock.volume}</td>
      </tr>)
  }
}