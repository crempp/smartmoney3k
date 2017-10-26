import React from 'react';
import Root from './Root';
import GameState from '../simulation/GameState'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.gameState = new GameState(this.handleGameStateChange.bind(this));

    this.state = this.gameState.getStateObject();

    this.gameState.startSimulation();
  }

  handleGameStateChange(state) {
    console.log(this.state);
    this.setState(state);
    // this.forceUpdate();
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Root gamestate={this.state} />
      </div>
    );
  }
}