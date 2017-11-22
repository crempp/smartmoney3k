import React from 'react';
import classNames from 'classnames';
import { moduleAttributes } from '../../simulation/Settings';
import '../../style/components/AIModules/TrailingAction.scss'

export default class TrailingAction extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      cost: moduleAttributes.trailingAction.cost,
      cpuUsage: moduleAttributes.trailingAction.cpuUsage,
      memUsage: moduleAttributes.trailingAction.memUsage,
      edit: !this.props.instance,
    };

    if (this.props.instance) {
      this.state['enabled'] = this.props.instance.enabled;
      this.state['action'] = this.props.instance.action;
      this.state['direction'] = this.props.instance.direction;
      this.state['percentChange'] = this.props.instance.percentChange * 100;
      this.state['trailingSeconds'] = this.props.instance.trailingSeconds;
    }
    else {
      this.state['enabled'] = null;
      this.state['action'] = 'buy';
      this.state['direction'] = 'drops';
      this.state['percentChange'] = moduleAttributes.trailingAction.percentChangeDefault;
      this.state['trailingSeconds'] = moduleAttributes.trailingAction.trailingSecondsDefault;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleComponentPurchaseClick = this.handleComponentPurchaseClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handlePowerClick = this.handlePowerClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  handleComponentPurchaseClick() {
    let data = this.state;
    data['module'] = 'trailingAction';
    this.props.onUpdate(data);
  }

  handleEditClick() {
    this.setState({
      edit: !this.state.edit
    })
  }
  handleSaveClick() {
    let data = this.state;
    data['id'] = this.props.instance.id;
    this.props.onUpdate(data);
    this.setState({
      edit: false
    })
  }

  handlePowerClick() {
    let newPowerState = !this.state.enabled;
    let data = this.state;
    data['id'] = this.props.instance.id;
    data['enabled'] = newPowerState;
    this.props.onUpdate(data);
    this.setState({enabled: newPowerState})
  }

  render() {

    let usage = null;
    let header = null;
    let moduleConsole = null;

    if (this.props.instance) {
      let cpuClasses = classNames({
        'usage-value': true,
        'running': this.state.enabled && this.props.instance.cpuUsed === this.props.instance.cpuUsage,
        'not-running': !this.state.enabled,
        'overload': this.props.instance.cpuUsed > this.props.instance.cpuUsage
      });
      let memClasses = classNames({
        'usage-value': true,
        'running': this.state.enabled && this.props.instance.memUsed === this.props.instance.memUsage,
        'not-running': !this.state.enabled,
        'overload': this.props.instance.memUsed > this.props.instance.memUsage
      });
      let powerClasses = classNames({
        'component-usage-running': true,
        'running': this.state.enabled && this.props.instance.memUsed === this.props.instance.memUsage,
        'not-running': !this.state.enabled,
        'overload': this.props.instance.memUsed > this.props.instance.memUsage
      })

      let editButton = null
      if (this.state.edit) {
        editButton = <button className='button'
                             onClick={()=>this.handleSaveClick()}>
          save
        </button>
      }
      else {
        editButton = <button className='button'
                             onClick={()=>this.handleEditClick()}>
          edit
        </button>
      }

      header = <div className='flex-row-container section-header'>
        <div className='component-name'>
          Trailing action
        </div>
        <div className='component-controls'>
          {editButton}
        </div>
      </div>

      usage = <div className='flex-row-container component-usage'>
        <div className='component-usage-title'>Usage:</div>
        <div className='component-usage-cpu'>
          CPU <span className={cpuClasses}>{ this.state.cpuUsage }</span>
        </div>
        <div className='component-usage-mem'>
          Mem <span className={memClasses}>{this.state.memUsage}</span>
        </div>
        <div className={powerClasses}
             onClick={()=>this.handlePowerClick()}>
          ◉
        </div>
      </div>;

      moduleConsole = <div></div>;
    }
    else {
      header = <div className='flex-row-container section-header'>
        <div className='component-name'>
          Trailing action
        </div>
        <div className='component-controls'>
          <button className='button'
                  onClick={()=>this.handleComponentPurchaseClick()} >
            ${this.state.cost}
          </button>
        </div>
      </div>

      usage = <div className='flex-row-container component-usage'>
        <div className='component-usage-title'>Uses:</div>
        <div className='component-usage-cpu'>
          CPU <span className='usage-value'>{ this.state.cpuUsage }</span>
        </div>
        <div className='component-usage-mem'>
          Mem <span className='usage-value'>{this.state.memUsage}</span>
        </div>
      </div>;

      moduleConsole = <div></div>;
    }

    return (
      <div className='system-component'>
        {header}

        <div className='component-details'>
          <select name='action'
                  value={this.state.action}
                  onChange={ this.handleChange }
                  disabled={ !this.state.edit } >
            <option value="buy">buy</option>
            <option value="sell">sell</option>
          </select>&nbsp;
          when a stock&nbsp;
          <select name='direction'
                  value={this.state.direction}
                  onChange={ this.handleChange }
                  disabled={ !this.state.edit } >
            <option value="drops">drops below</option>
            <option value="rises">rises above</option>
          </select>
          &nbsp;
          <input
            type='text'
            name='percentChange'
            maxLength='4'
            size='4'
            value={ this.state.percentChange }
            onChange={ this.handleChange }
            disabled={ !this.state.edit }
          />
          % of it's value&nbsp;
          <input
            type='text'
            name='trailingSeconds'
            maxLength='4'
            size='4'
            value={ this.state.trailingSeconds }
            onChange={ this.handleChange }
            disabled={ !this.state.edit }
          />&nbsp;
          seconds ago
        </div>
        {usage}
        {moduleConsole}
      </div>
    )
  }
}