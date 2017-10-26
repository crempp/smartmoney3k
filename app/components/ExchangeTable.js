import React from 'react';
import ExchangeRow from './ExchangeRow';

const ExchangeTableStyle = {
  border: "1px solid"
};

export default class ExchangeTable extends React.Component {
  render() {
    const rows = [];

    this.props.exchanges.forEach((exchange) => {
      rows.push(
        <ExchangeRow exchange={exchange}
                     key={exchange.name}/>
      );
    });

    return (
      <table style={ExchangeTableStyle}>
        <thead>
        <tr>
          <th>Exchange</th>
          <th>Num of Stocks</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>)
  }
}