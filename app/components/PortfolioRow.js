import React from 'react';

export default class PortfolioRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleStockClick = this.handleStockClick.bind(this);
  }

  handleStockClick() {
    this.props.onUpdate(this.props.position.stock);
  }

  render() {
    let PortfolioRowStyle = {
      cursor: "pointer",
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
      <tr onClick={this.handleStockClick} style={PortfolioRowStyle}>
        <td>{position.stock.symbol}</td>
        <td>${position.stock.price.toFixed(2)}</td>
        <td>${position.stock.change.toFixed(2)}</td>
        <td>{position.stock.volume}</td>
        <td>{position.shares}</td>
        <td>${position.value.toFixed(2)}</td>
      </tr>)
  }
}