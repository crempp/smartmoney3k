import React, { Component } from 'react'
import { timeParse, scaleTime, scaleLinear, select, timeFormat } from 'd3';
import { scaleDiscontinuous, discontinuitySkipWeekends,
  chartSvgCartesian, extentDate, extentLinear } from 'd3fc';
import { seriesSvgCandlestick, autoBandwidth } from 'd3fc-series';
import '../style/chart.css';

const ChartStyle = {
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
};

export default class Graph extends Component {
  constructor(props){
    super(props)

    // let margin = {
    //   top: 20,
    //   right: 20,
    //   bottom: 50,
    //   left: 70
    // };
    // let width = this.props.width - margin.left - margin.right;
    // let height = this.props.height - margin.top - margin.bottom;
    // this.parseDate = timeParse("%I:%M:%S");
    // this.dateFormat = timeFormat("%I:%M:%S");

    let xScale = scaleTime();//.tickFormat(timeFormat("%I:%M:%S"));
    let yScale = scaleLinear();

    this.candlestickSeries = seriesSvgCandlestick()
      .bandwidth(2);
    this.chart = chartSvgCartesian(xScale, yScale)
      .yOrient('left')
      .plotArea(this.candlestickSeries)
      .xLabel('Time')
      .yLabel('Price');

    this.xExtent = extentDate()
      .accessors([d => d.date]);
    this.yExtent = extentLinear()
      .accessors([d => d.high, d => d.low]);

    this.createChart = this.createChart.bind(this)
  }

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.createChart()
  }

  createChart() {
    if (this.props.chart.stock) {
      let size = Math.max(this.props.chart.data.length - 200, this.props.chart.data.length);
      let data = this.props.chart.data.slice(-size).map((d) => {
        return {
          date: new Date(d.date),
          open: +d.open,
          high: +d.high,
          low: +d.low,
          close: +d.close,
          volume: +d.volume
        };
      });

      this.chart
        .xDomain(this.xExtent(data))
        .yDomain(this.yExtent(data))
        .chartLabel('Stock: ' + this.props.chart.stock.symbol);

      select(this.node)
        .datum(data)
        .call(this.chart);
    }
  }


  render() {
    return <div style={ChartStyle} ref={node => this.node = node}></div>
  }
}