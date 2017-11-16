import React from 'react';
import { moduleAttributes } from '../../simulation/Settings';

export default class TrailingAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      action: 'buy',
      percentChange: moduleAttributes.trailingAction.percentChangeDefault,
      trailingSeconds: moduleAttributes.trailingAction.trailingSecondsDefault,
      cost: moduleAttributes.trailingAction.cost,
      cpuUsage: moduleAttributes.trailingAction.cpuUsage,
      memUsage: moduleAttributes.trailingAction.memUsage,
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
      <div className='system-component'>
        <div className='flex-row-container section-header'>
          <div className='component-name'>
            Trailing action
          </div>
          <div className='component-controls'>
            <button className='button'
                    onClick={()=>this.handleComponentPurchaseClick()} >
              ${this.state.cost}
            </button>
            <button className='button'>edit</button>
            <button className='button'>on</button>
          </div>
        </div>

        <div className='component-details'>
          <select>
            <option value="buy">buy</option>
            <option value="sell">sell</option>
          </select>
          when a stock drops below
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
        </div>

        <div className='flex-row-container component-usage'>
          <div className='component-usage-title'>Usage:</div>
          <div className='component-usage-cpu'>
            CPU <span className='usage-value'>{ this.state.cpuUsage }</span>
          </div>
          <div className='component-usage-mem'>
            Mem <span className='usage-value'>{this.state.memUsage}</span>
          </div>
        </div>
      </div>
    )
  }
}