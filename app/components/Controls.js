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

      <div className='flex-row-container running-status'>
        <span className='running-title'>
          <button
            className='button-inv'
            onClick={this.handlePauseClick}
            style={ButtonStyle}>
            { this.props.running ? 'System Running' : 'System Paused' }
          </button>
          /
        </span>
        <span>
            CPU <meter value='.8' min='0' max='1' low='.5' high='.8'></meter>
          </span>
        <span>
            Mem <meter value='.9' min='0' max='1' low='.5' high='.8'></meter>
          </span>
      </div>
    )
  }
}