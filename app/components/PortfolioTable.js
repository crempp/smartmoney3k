import React from 'react';
import PortfolioRow from './PortfolioRow';

const PortfolioTableStyle = {

};

export default class PortfolioTable extends React.Component {
  render() {
    const rows = [];

    this.props.portfolio.positions.forEach((position) => {
      rows.push(
        <PortfolioRow position={position}
                      key={position.stock.symbol}/>
      );
    });

    return (
      <div>
        <h4 className="header">My Portfolio</h4>
        <table style={PortfolioTableStyle}>
          <thead>
          <tr>
            <th>Smb</th>
            <th>$</th>
            <th>Change</th>
            <th>Vol</th>
            <th>#</th>
            <th>Value</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>)
  }
}