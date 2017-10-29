import React, { PropTypes } from 'react';
import StockTable from '../components/StockTable'
import PortfolioTable from '../components/PortfolioTable'
import Clock from '../components/Clock'
import Chart from '../components/Chart'
import PortfolioValue from '../components/PortfolioValue';
import CashDisplay from '../components/CashDisplay';

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
                <CashDisplay cash={this.props.gamestate.cash} />
              </div>

              <div style={ScrollableStockData}>
                <PortfolioTable portfolio={this.props.gamestate.portfolio} />
              </div>

              <div style={ScrollableStockData}>
                <StockTable exchange={this.props.gamestate.exchanges[0]} />
              </div>

            </div>

            <div style={RightTopContainer}>
              <Chart stockSymbol={this.props.gamestate.chart.stock.symbol}
                     data={this.props.gamestate.chart.data}
                     width={740}
                     height={400}/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
