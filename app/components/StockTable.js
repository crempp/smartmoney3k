import React from 'react';
import StockRow from './StockRow';

const StockTableStyle = {

};

export default class StockTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleStockClick = this.handleStockClick.bind(this);
  }

  handleStockClick(stock) {
    this.props.onUpdate(stock);
  }

  render() {
    const rows = [];

    this.props.exchange.stocks.forEach((stock) => {
      rows.push(
        <StockRow onUpdate={ this.handleStockClick}
                  stock={stock}
                  key={stock.symbol}/>
      );
    });

    return (
      <div>
        <h4 className="header">EXCHANGE: {this.props.exchange.name}</h4>
        <table style={StockTableStyle}>
          <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Volume</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>)
  }
}