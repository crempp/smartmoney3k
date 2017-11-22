import React from 'react';
import TrailingAction from './AIModules/TrailingAction';
import '../style/components/RunningModules.scss';

export default class RunningModules extends React.Component {

  constructor(props) {
    super(props);

    this.handleRunningModuleUpdate = this.handleRunningModuleUpdate.bind(this);
  }

  handleRunningModuleUpdate(data) {
    this.props.onUpdate(data);
  }

  render() {

    let columns = [];
    let modules = [];
    let numColumns = 3;
    let perColumn = 4;

    this.props.modules.forEach((module) => {

      if (module.name === 'TrailingAction') {
        modules.push(<TrailingAction key={module.id}
                                     instance={module}
                                     onUpdate={this.handleRunningModuleUpdate} />
        );
      }
    });

    for (let i = 0; i < numColumns; i++) {
      let columnKey = 'column' + i;
      let thisColModules = modules.slice(i * perColumn, (i * perColumn) + perColumn);
      columns.push(
        <div key={columnKey}
             className='component-column'>
          { thisColModules }
        </div>
      )
    }

    return (
      <div className='flex-row-container component-column-container'>
        { columns }
      </div>
    )
  }
}