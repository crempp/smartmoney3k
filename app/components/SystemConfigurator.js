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
      <div className='status-container system-parts-container'>
        <div className='status-item'>
          <div className='section-header'>CPU</div>
          <div className='value'>
            { this.props.gamestate.system.cpuCount }
            <button className='button-inv'
                    onClick={ this.handleCPUPurchaseClick }
                    disabled={ this.props.gamestate.cash < this.props.gamestate.system.nextCPUCost }>
              ${ this.props.gamestate.system.nextCPUCost }
            </button>
          </div>
        </div>
        <div className='status-item'>
          <div className='section-header'>Mem</div>
          <div className='value'>
            { this.props.gamestate.system.memCount }
            <button className='button-inv'
                    onClick={ this.handleMemPurchaseClick }
                    disabled={ this.props.gamestate.cash < this.props.gamestate.system.nextMemCost }>
              ${ this.props.gamestate.system.nextMemCost }
            </button>
          </div>
        </div>
        <div className='status-item'>
          <div className='section-header'>---</div>
          <div className='value'>---</div>
        </div>
      </div>
    )
  }
}
