import React from 'react';

const ExchangeRowStyle = {

};
const ExchangeDataStyle = {
  border: "1px solid grey"
};

export default class ExchangeRow extends React.Component {
  render() {
    const exchange = this.props.exchange;

    return (
      <tr style={ExchangeRowStyle}>
        <td style={ExchangeDataStyle}>{exchange.name}</td>
        <td style={ExchangeDataStyle}>{exchange.numStocks}</td>
        <td>+</td>
      </tr>)
  }
}