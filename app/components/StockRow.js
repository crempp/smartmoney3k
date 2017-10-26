import React from 'react';

const StockRowStyle = {

};
const StockDataStyle = {
  border: "1px solid grey",
  // "vertical-align": "top"
};

export default class StockRow extends React.Component {
  render() {
    const stock = this.props.stock;

    return (
      <tr style={StockRowStyle}>
        <td style={StockDataStyle}>{stock.symbol}</td>
        <td style={StockDataStyle}>{stock.price}</td>
        <td>+</td>
      </tr>)
  }
}