import React from 'react';
import Clock from '../components/Clock';
import '../style/components/Controls.scss';

export default class Controls extends React.Component {

  constructor(props) {
    super(props);

    this.spinnerChars = [
      '|',
      '/',
      '-',
      '\\',
    ];

    this.handlePauseClick = this.handlePauseClick.bind(this);
    this.handleCPUPurchaseClick = this.handleCPUPurchaseClick.bind(this);
    this.handleMemPurchaseClick = this.handleMemPurchaseClick.bind(this);
  }

  handlePauseClick() {
    let message = {
      isPaused: !this.props.gameState.running
    }
    this.props.onSimulationUpdate(message);
  }

  handleCPUPurchaseClick() {
    let message = {
      component: 'cpu',
      count: 1,
      cost: this.props.gameState.system.nextCPUCost,
    }
    this.props.onSystemUpdate(message);
  }

  handleMemPurchaseClick() {
    let message = {
      component: 'mem',
      count: 1,
      cost: this.props.gameState.system.nextMemCost,
    }
    this.props.onSystemUpdate(message);
  }

  render() {
    let spinnerChar = this.spinnerChars[this.props.gameState.tick % 4];

    let cpuMeterPos = this.props.gameState.system.usedCPU / this.props.gameState.system.cpuCount;
    let memMeterPos = this.props.gameState.system.usedMem / this.props.gameState.system.memCount;

    return (
      <div className='flex-row-container running-status'>
        <div className='status-item'>
          <div className='header'>System:</div>
          <div className='value'>
            <button className='button-inv'
                    onClick={this.handlePauseClick} >
              { this.props.gameState.running ? 'Running' : 'Paused' }
            </button>
          </div>
        </div>

        <div className='status-item'>
          <div className='header'>Time:</div>
          <div className='value'>
            <Clock time={ this.props.gameState.time }/>
          </div>
        </div>

        <div className='status-item'>
          <div className='header'>Tick:</div>
          <div className='value'>
            {this.props.gameState.tick} {spinnerChar}
          </div>
        </div>

        <div className='status-item'>
          <div className='header'>Usage:</div>
          <div className='value'>
            <div>
              CPU { this.props.gameState.system.cpuCount }
              <meter value={cpuMeterPos} min='0' max='1' high='.75' />&nbsp;
              <button className='button-inv'
                      onClick={ this.handleCPUPurchaseClick }
                      disabled={ this.props.gameState.cash < this.props.gameState.system.nextCPUCost }>
                ${ this.props.gameState.system.nextCPUCost }
              </button>
            </div>

            <div>
              Mem { this.props.gameState.system.memCount }
              <meter value={memMeterPos} min='0' max='1' high='.75' />&nbsp;
              <button className='button-inv'
                      onClick={ this.handleMemPurchaseClick }
                      disabled={ this.props.gameState.cash < this.props.gameState.system.nextMemCost }>
                ${ this.props.gameState.system.nextMemCost }
              </button>
            </div>

          </div>
        </div>
      </div>


      //   <span className='running-title'>
      //
      //   </span>
      //
      //   <span className='tick-counter'>
      //     tick:
      //   </span>
      //   <span>
      //     <div>

      //     </div>
      //     <div>

      //     </div>
      //   </span>
      // </div>
    )
  }
}