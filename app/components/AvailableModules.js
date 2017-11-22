import React from 'react';
import TrailingAction from './AIModules/TrailingAction';
import '../style/components/AvailableModules.scss';

export default class AvailableModules extends React.Component {

  constructor(props) {
    super(props);

    this.handleComponentPurchaseClick = this.handleComponentPurchaseClick.bind(this);
  }

  handleComponentPurchaseClick(data) {
    this.props.onUpdate(data);
  }

  render() {
    return (
      <div className='available-components-container'>
        <TrailingAction
          onUpdate={this.handleComponentPurchaseClick} />
      </div>
    )
  }
}