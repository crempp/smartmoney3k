import React from 'react';

const ControlsStyle = {
  margin: '3px',
};
const ButtonStyle = {
  lineHeight: '1.3em',
}

export default class Controls extends React.Component {

  constructor(props) {
    super(props);

    this.handlePauseClick = this.handlePauseClick.bind(this);
  }

  handlePauseClick() {
    let message = {
      isPaused: !this.props.running
    }
    this.props.onUpdate(message);
  }

  render() {
    return (
      <div style={ControlsStyle}>
        <button
          onClick={this.handlePauseClick}
          style={ButtonStyle}>
          { this.props.running ? 'pause' : 'play' }
          {/*     '10073;&#10073;' : '&#9658;'   */}
        </button>
      </div>
    )
  }
}