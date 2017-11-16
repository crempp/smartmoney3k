import React from 'react';
import TrailingAction from './AIModules/TrailingAction';

const RunningModulesStyle = {
  margin: '3px',
  textAlign: 'left',
};

export default class RunningModules extends React.Component {

  constructor(props) {
    super(props);

    // this.handleComponentPurchaseClick = this.handleComponentPurchaseClick.bind(this);
  }

  // handleComponentPurchaseClick(data) {
  //   this.props.onUpdate(data);
  // }

  render() {

    const columns = [];
    this.props.modules.forEach((module) => {
      let moduleElement = null

      if (module.name === 'TrailingAction') {
        moduleElement = <TrailingAction key={module.id}
                                        instance={module} />;
      }

      columns.push(
        <div key='column1'
             className='component-column'>
          { moduleElement }
        </div>
      )
    });
    return (
      <div className='flex-row-container component-column-container'>
        { columns }
      </div>

    )
  }
}