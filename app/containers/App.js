import React from 'react';
import Root from './Root';
import GameState from '../simulation/GameState'

const AppStyle = {
  height: "100%",
  width: "100%",
}

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
  }

  render() {
    return (
      <div style={AppStyle}>
        <Root gamestate={this.state} />
      </div>
    );
  }
}
