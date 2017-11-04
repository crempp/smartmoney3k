import React from 'react';
import { moduleAttributes } from '../../simulation/Settings';

const TrailingActionStyle = {
  margin: '3px',
  border: '1px grey solid',
  fontSize: '10px',
  textAlign: 'left',
};

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
      <div style={TrailingActionStyle}>
        <div>
          <span style={{fontWeight: 'bold', float: 'left'}}>
            Trailing action
          </span>
          <button style={{float: 'right'}}
                  onClick={()=>this.handleComponentPurchaseClick()} >
            ${this.state.cost}
          </button>
          <button style={{float: 'right'}}>
            edit
          </button>
          <button style={{float: 'right'}}>
            on
          </button>
        </div>
        <hr style={{marginTop: '1px', marginBottom: '1px', clear: 'both'}} />
        <div>
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
        </div>
        <hr style={{marginTop: '1px', marginBottom: '1px'}} />
        <div>
          <span>
            CPU Usage
            <span title='CPU Usage' style={{backgroundColor: 'green', color: 'white'}}>
              { this.state.cpuUsage }/{ this.state.cpuUsage }
            </span>
             : Mem Usage
            <span title='Mem Usage'>
            0/{this.state.memUsage}]
            </span>
          </span>
        </div>
      </div>
    )
  }
}