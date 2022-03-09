import React from 'react';
import PortfolioRow from './PortfolioRow';
import '../styles/components/PortfolioTable.module.scss';

export default class PortfolioTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleStockClick = this.handleStockClick.bind(this);
  }

  handleStockClick(stock) {
    this.props.onUpdate(stock);
  }

  render() {
    const rows = [];

    this.props.portfolio.positions.forEach((position) => {
      rows.push(
        <PortfolioRow onUpdate={ this.handleStockClick}
                      position={position}
                      key={position.stock.symbol}/>
      );
    });

    return (

      <div className='flex-col-container portfolio-container'>
        <div className='section-header'>
          My Portfolio
        </div>
        <table className='flex-col-container stock-table'>
          <thead className='section-header'>
          <tr>
            <th>Symb</th>
            <th>Price</th>
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