import React, { PropTypes } from 'react';
import ExchangeTable from '../components/ExchangeTable';
import StockTable from '../components/StockTable'
import Clock from '../components/Clock'

const AppTableStyle = {
  height: "800px",
  width: "100%"
};
const AppDataStyle = {
  "verticalAlign": "top"
};
const ScrollableData = {
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
  overflow: "auto"
};

export default class Root extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Project SG</h1>
        <Clock time={this.props.gamestate.time}/>
        <table style={AppTableStyle}>
          <tbody>
            <tr>
              <td style={AppDataStyle}>
                <div style={ScrollableData}>
                 <ExchangeTable exchanges={this.props.gamestate.exchanges} />
                </div>
              </td>
              <td style={AppDataStyle}>
                <div style={ScrollableData}>
                  <StockTable exchange={this.props.gamestate.exchanges[0]} />
                </div>
              </td>
            </tr>
            <tr>
              <td style={AppDataStyle}></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}