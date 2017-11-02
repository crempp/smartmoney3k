import React from 'react';
import TrailingAction from './AIModules/TrailingAction';

const AIConfiguratorStyle = {
  margin: '3px',
};

export default class AIConfigurator extends React.Component {

  constructor(props) {
    super(props);

    this.handleComponentPurchaseClick = this.handleComponentPurchaseClick.bind(this);
  }

  handleComponentPurchaseClick(data) {
    this.props.onUpdate(data);
  }

  render() {
    return (
      <div style={AIConfiguratorStyle}>
        <TrailingAction onUpdate={this.handleComponentPurchaseClick} />
      </div>
    )
  }
}