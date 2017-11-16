import React, { PropTypes } from 'react';
import GameState from '../simulation/GameState'
import StockTable from '../components/StockTable'
import PortfolioTable from '../components/PortfolioTable'
import Clock from '../components/Clock'
import Chart from '../components/Chart'
import PortfolioValue from '../components/PortfolioValue';
import CashDisplay from '../components/CashDisplay';
import Controls from '../components/Controls';
import SystemConfigurator from '../components/SystemConfigurator'
import AIConfigurator from '../components/AIConfigurator';
import RunningModules from '../components/RunningModules';

import '../style/components/root.scss';

export default class Root extends React.Component {

  constructor(props) {
    super(props);

    this.gameState = new GameState(this.triggerGameStateChange.bind(this));

    this.state = this.gameState.getStateObject();

    this.triggerGameStateChange = this.triggerGameStateChange.bind(this);
    this.onSystemUpdate = this.onSystemUpdate.bind(this);
    this.onAIModuleUpdate = this.onAIModuleUpdate.bind(this);
    this.onSimulationUpdate = this.onSimulationUpdate.bind(this);
    this.handleStockClick = this.handleStockClick.bind(this);
    this.onRunningModuleUpdate = this.onRunningModuleUpdate.bind(this);
    // this.gameState.startSimulation();
  }

  triggerGameStateChange(gamestate) {
    if (gamestate === 'undefined') gamestate = this.state;
    this.setState(gamestate);
  }

  onSystemUpdate(data) {
    // console.debug('onSystemUpdate');
    if (data.component == 'cpu') {
      this.gameState.purchaseCPU(data.count, data.cost);
    } else if (data.component == 'mem') {
      this.gameState.purchaseMem(data.count, data.cost);
    } else {
      console.warn('Unknown component [' + data.component + ']')
    }
  }

  onAIModuleUpdate(data) {
    this.gameState.purchaseComponent(data);
  }

  onSimulationUpdate(data) {
    // console.debug('onSimulationUpdate');
    // Handle play/pause
    if (data.hasOwnProperty('isPaused')) {
      if (data.isPaused) this.gameState.startSimulation();
      else this.gameState.stopSimulation();
    }
  }

  onRunningModuleUpdate(data) {

  }

  handleStockClick(stock) {
    this.gameState.chart.setStock(stock);
  }

  render() {
    return (
      <div className='flex-col-container app-container'>
        <header className='app-header'>Smart Money 3000</header>

        <div className='flex-col-container game-container'>

          <div className='flex-row-container top-container'>
            <div className='flex-col-container stock-container'>
              <div className='status-container'>
                <Clock time={ this.state.time }/>
                <PortfolioValue portfolio={ this.state.portfolio } />
                <CashDisplay cash={ this.state.cash } />
              </div>
              <PortfolioTable onUpdate={ this.handleStockClick }
                              portfolio={ this.state.portfolio } />
              <StockTable onUpdate={ this.handleStockClick }
                          exchange={ this.state.exchanges[0] } />
            </div>

            <Chart chart={ this.state.chart }
                   width={740}
                   height={400}/>
          </div>
          <div className='flex-row-container bottom-container'>
            <div className='flex-col-container system-container'>

              <SystemConfigurator gamestate={ this.state }
                                  onUpdate={ this.onSystemUpdate } />
              <AIConfigurator gamestate={ this.state }
                              onUpdate={ this.onAIModuleUpdate } />
            </div>

            <div className='running-container'>
              <Controls running={ this.state.running }
                        onUpdate={ this.onSimulationUpdate } />
              <div className='flex-row-container component-column-container'>
                <RunningModules gamestate={ this.state }
                                modules = { this.state.system.modules }
                                onUpdate={ this.onRunningModuleUpdate } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
