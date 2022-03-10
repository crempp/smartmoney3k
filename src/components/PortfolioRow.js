import React from 'react';
import '../styles/components/PortfolioRow.module.scss';

export default class PortfolioRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleStockClick = this.handleStockClick.bind(this);
  }

  handleStockClick() {
    this.props.onUpdate(this.props.position.stock);
  }

  render() {
    const position = this.props.position;

    let classname = '';

    if (position.stock.change > 0) {
      classname = 'increase';
    }
    else if (position.stock.change < 0) {
      classname = 'decrease';
    }

    return (
      <tr ref={(ref) => this.row = ref}
          className={classname}
          onClick={this.handleStockClick} >
        <td>{position.stock.symbol}</td>
        <td>${position.stock.price.toFixed(2)}</td>
        <td>${position.stock.change.toFixed(2)}</td>
        <td>{position.stock.volume}</td>
        <td>{position.shares}</td>
        <td>${position.value.toFixed(2)}</td>
      </tr>)
  }
}