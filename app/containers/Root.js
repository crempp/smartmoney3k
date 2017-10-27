import React, { PropTypes } from 'react';
import StockTable from '../components/StockTable'
import PortfolioTable from '../components/PortfolioTable'
import Clock from '../components/Clock'
import Graph from '../components/Graph'
import PortfolioValue from "../components/PortfolioValue";

const PageContainer = {
  width: "1000px",
  height: "100%",
  margin: "0px auto",
  backgroundColor: "white",
};
const TopContainer = {
  width: "100%",
  height: "400px",
};
const LeftTopContainer = {
  width: "260px",
  height: "100%",
  display: "inline-block",
  verticalAlign: "top",
  fontSize: "11px",
};
const RightTopContainer = {
  width: "740px",
  height: "100%",
  display: "inline-block",
  verticalAlign: "top",
};
const ScrollableStockData = {
  width: "100%",
  height: "190px",
  margin: "0",
  padding: "0",
  overflow: "auto",
};

export default class Root extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <h1 className="header">Project SG</h1>
        </div>

        <div style={PageContainer}>
          <div style={TopContainer}>

            <div style={LeftTopContainer}>

              <div>
                <Clock time={this.props.gamestate.time}/>
                <PortfolioValue portfolio={this.props.gamestate.portfolio} />
              </div>

              <div style={ScrollableStockData}>
                <PortfolioTable portfolio={this.props.gamestate.portfolio} />
              </div>

              <div style={ScrollableStockData}>
                <StockTable exchange={this.props.gamestate.exchanges[0]} />
              </div>

            </div>

            <div style={RightTopContainer}>
              <Graph/>
            </div>
          </div>

          {/*<Clock time={this.props.gamestate.time}/>*/}
          {/*<table style={AppTableStyle}>*/}
            {/*<tbody>*/}
              {/*<tr>*/}
                {/*<td style={AppDataStyle}>*/}
                  {/*<div style={ScrollableData}>*/}
                   {/*<ExchangeTable exchanges={this.props.gamestate.exchanges} />*/}
                  {/*</div>*/}
                {/*</td>*/}
                {/*<td style={AppDataStyle}>*/}

                {/*</td>*/}
              {/*</tr>*/}
              {/*<tr>*/}
                {/*<td style={AppDataStyle}></td>*/}
              {/*</tr>*/}
            {/*</tbody>*/}
          {/*</table>*/}
        </div>
      </div>
    );
  }
}