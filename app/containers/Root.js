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

const row1Size = {
  width: '100%',
  height: '400px',
}

const PageContainer = {
  width: '1000px',
  height: '100%',
  margin: '0px auto',
  backgroundColor: 'white',
};
const TopContainer = {
  width: '100%',
  height: '400px',
  overflow: 'hidden',
};
const BottomContainer = {
  width: '100%',
  height: '250px',
  overflow: 'hidden',
}
const LeftTopContainer = {
  width: '260px',
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
  fontSize: '11px',
};
const RightTopContainer = {
  width: '740px',
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
};
const LeftBottomContainer = {
  width: '260px',
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
  fontSize: '11px',
}
const RightBottomContainer = {
  width: '740px',
  height: '100%',
  display: 'inline-block',
  verticalAlign: 'top',
  backgroundColor: 'grey',
}
const ScrollableStockData = {
  width: '100%',
  height: '190px',
  margin: '0',
  padding: '0',
  overflow: 'auto',
};

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

  handleStockClick(stock) {
    this.gameState.chart.setStock(stock);
    // this.triggerGameStateChange();
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <h1 className='header'>Project SG</h1>
        </div>

        <div style={PageContainer}>
          <div style={TopContainer}>
            <div style={LeftTopContainer}>
              <div>
                <Clock time={this.state.time}/>
                <PortfolioValue portfolio={this.state.portfolio} />
                <CashDisplay cash={this.state.cash} />
              </div>
              <div style={ScrollableStockData}>
                <PortfolioTable onUpdate={ this.handleStockClick}
                                portfolio={this.state.portfolio} />
              </div>
              <div style={ScrollableStockData}>
                <StockTable onUpdate={ this.handleStockClick}
                            exchange={this.state.exchanges[0]} />
              </div>
            </div>
            <div style={RightTopContainer}>
              <Chart chart={ this.state.chart }
                     width={740}
                     height={400}/>
            </div>
          </div>

          <div style={BottomContainer}>
            <div style={LeftBottomContainer}>
              <Controls running={this.state.running}
                        onUpdate={this.onSimulationUpdate} />
              <hr/>
              <SystemConfigurator gamestate={this.state}
                                  onUpdate={this.onSystemUpdate} />
              <hr/>
              <AIConfigurator gamestate={this.state}
                              onUpdate={this.onAIModuleUpdate} />
            </div>
            <div style={RightBottomContainer}>
              Modules go here
            </div>
          </div>

        </div>
      </div>
    );
  }
}
