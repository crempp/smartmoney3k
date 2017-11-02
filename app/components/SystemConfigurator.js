import React from 'react';

const SystemConfiguratorStyle = {
  margin: '3px',
};

export default class SystemConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.handleCPUPurchaseClick = this.handleCPUPurchaseClick.bind(this);
    this.handleMemPurchaseClick = this.handleMemPurchaseClick.bind(this);
  }

  handleCPUPurchaseClick() {
    let message = {
      component: 'cpu',
      count: 1,
      cost: this.props.gamestate.system.nextCPUCost,
    }
    this.props.onUpdate(message);
  }

  handleMemPurchaseClick() {
    let message = {
      component: 'mem',
      count: 1,
      cost: this.props.gamestate.system.nextMemCost,
    }
    this.props.onUpdate(message);
  }

  render() {
    return (
      <div style={ SystemConfiguratorStyle }>
        <div>CPUs: { this.props.gamestate.system.cpuCount }</div>
        <div>Mem: { this.props.gamestate.system.memCount }</div>
        <div>
          Purchase CPU
          <button onClick={ this.handleCPUPurchaseClick }
                  disabled={ this.props.gamestate.cash < this.props.gamestate.system.nextCPUCost }>
            ${ this.props.gamestate.system.nextCPUCost }
          </button>
          Purchase Mem
          <button onClick={ this.handleMemPurchaseClick }
                  disabled={ this.props.gamestate.cash < this.props.gamestate.system.nextMemCost }>
            ${ this.props.gamestate.system.nextMemCost }
            </button>
        </div>
      </div>
    )
  }
}
