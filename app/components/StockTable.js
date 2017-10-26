import React from 'react';
import StockRow from './StockRow';

const StockTableStyle = {
  border: "1px solid"
};

export default class StockTable extends React.Component {
  render() {
    const rows = [];

    this.props.exchange.stocks.forEach((stock) => {
      rows.push(
        <StockRow stock={stock}
                  key={stock.symbol}/>
      );
    });

    return (
      <table style={StockTableStyle}>
        <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>)
  }
}