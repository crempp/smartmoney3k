import React from 'react';
import StockRow from './StockRow';
import '../styles/components/StockTable.module.scss';

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
      <div className='flex-col-container exchange-container'>
        <div className='section-header'>
          EXCHANGE: {this.props.exchange.name}
        </div>
        <table className='flex-col-container stock-table'>
          <thead>
          <tr>
            <th>Symb</th>
            <th>Price</th>
            <th>Change</th>
            <th>Vol</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </table>
      </div>)
  }
}