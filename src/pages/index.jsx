import React from "react";
import PortfolioTable from '../components/PortfolioTable';
import GameState from '../simulation/GameState';
import StockTable from '../components/StockTable';
import StockChart from '../components/StockChart';
import StatusContainer from '../components/StatusContainer';
import Controls from '../components/Controls';
import AvailableModules from '../components/AvailableModules';
import RunningModules from '../components/RunningModules';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.gameState = new GameState(this.triggerGameStateChange.bind(this));

    this.state = this.gameState.getStateObject();

    this.triggerGameStateChange = this.triggerGameStateChange.bind(this);
    this.onSystemUpdate = this.onSystemUpdate.bind(this);
    this.onAIModuleUpdate = this.onAIModuleUpdate.bind(this);
    this.onSimulationUpdate = this.onSimulationUpdate.bind(this);
    this.handleStockClick = this.handleStockClick.bind(this);
    this.handleRunningModuleUpdate = this.handleRunningModuleUpdate.bind(this);
    // this.gameState.startSimulation();
  }

  componentDidMount() {
    // Hang gameState on window so I can access it for debugging
    window.gameState = this.gameState;
  }

  triggerGameStateChange(gamestate) {
    if (gamestate === undefined) gamestate = this.state;
    this.setState(gamestate);
  }

  onSystemUpdate(data) {
    // console.debug('onSystemUpdate');
    if (data.component === 'cpu') {
      this.gameState.purchaseCPU(data.count, data.cost);
    } else if (data.component === 'mem') {
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
    if (data.hasOwnProperty('isPaused')) {
      if (data.isPaused) this.gameState.startSimulation();
      else this.gameState.stopSimulation();
    }
  }

  handleRunningModuleUpdate(data) {
    this.gameState.updateRunningModule(data.id, data);
  }

  handleStockClick(stock) {
    this.gameState.setStock(this.gameState.getStock(stock.symbol));
  }

  render() {
    return (
      <div className='flex-col-container app-container'>
        <header className='app-header'>Smart Money 3000</header>

        <div className='flex-col-container game-container'>
          <div className='flex-row-container top-container'>
            <div className='flex-col-container top-left-container'>
              <PortfolioTable onUpdate={ this.handleStockClick }
                              portfolio={ this.state.portfolio } />
              <StockTable onUpdate={ this.handleStockClick }
                          exchange={ this.state.exchanges[0] } />
            </div>
            <div className='flex-col-container top-right-container dark'>
              <StockChart chart={ this.gameState.chart }
                          width={740}
                          height={400}/>
            </div>
          </div>
          <div className='flex-row-container middle-container'>
            <div className='flex-col-container middle-left-container'>
              <StatusContainer portfolio={this.state.portfolio}
                               cash={this.state.cash} />
            </div>
            <div className='flex-col-container middle-right-container'>
              <Controls gameState={ this.gameState }
                        onSimulationUpdate={ this.onSimulationUpdate }
                        onSystemUpdate={ this.onSystemUpdate } />
            </div>
          </div>
          <div className='flex-row-container bottom-container'>
            <div className='flex-col-container bottom-left-container'>
              <AvailableModules gamestate={ this.state }
                                onUpdate={ this.onAIModuleUpdate } />
            </div>

            <div className='bottom-right-container'>
              <RunningModules gamestate={ this.state }
                              modules = { this.state.system.modules }
                              onUpdate={ this.handleRunningModuleUpdate } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default Home
