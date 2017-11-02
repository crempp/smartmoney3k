import React from 'react';
import { moduleAttributes } from '../../simulation/Settings';

const TrailingActionStyle = {
  margin: '3px',
};

export default class TrailingAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      action: 'buy',
      percentChange: moduleAttributes.trailingAction.percentChangeDefault,
      trailingSeconds: moduleAttributes.trailingAction.trailingSecondsDefault,
      cost: moduleAttributes.trailingAction.cost,
    };

    this.handleComponentPurchaseClick = this.handleComponentPurchaseClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleComponentPurchaseClick() {
    let data = this.state;
    data['module'] = 'trailingAction';
    this.props.onUpdate(data);
  }

  render() {
    return (
      <div style={TrailingActionStyle}>
        <span>
          Trailing action:
          <select>
            <option value='buy'>buy</option>
            <option value='sell'>sell</option>
          </select>
          when a stock
          drops below {/*rises above*/}
          <input
            type='text'
            name='percentChange'
            maxLength='4'
            size='4'
            value={ this.state.percentChange }
            onChange={ this.handleChange }
          />
          % of it's value
          <input
            type='text'
            name='trailingSeconds'
            maxLength='4'
            size='4'
            value={ this.state.trailingSeconds }
            onChange={ this.handleChange }
          />
          seconds ago
        </span> [0.8 CPU : 0.8 Mem]
        <button onClick={()=>this.handleComponentPurchaseClick()} >
          ${this.state.cost}
        </button>
      </div>
    )
  }
}