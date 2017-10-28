import React, { Component } from 'react'
import * as d3 from "d3";
import '../style/chart.css';

export default class Graph extends Component {
  constructor(props){
    super(props)

    this.layout = {
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      }
    }
    this.layout.width = this.props.width - this.layout.margin.left - this.layout.margin.right
    this.layout.height = this.props.height - this.layout.margin.top - this.layout.margin.bottom

    this.parseDate = d3.timeParse("%d-%b-%y");

    this.x = techan.scale.financetime()
      .range([0, this.layout.width]);

    this.y = d3.scaleLinear()
      .range([this.layout.height, 0]);

    this.candlestick = techan.plot.candlestick()
      .xScale(this.x)
      .yScale(this.y);

    this.xAxis = d3.axisBottom()
      .scale(this.x);

    this.yAxis = d3.axisLeft()
      .scale(this.y);

    this.createChart = this.createChart.bind(this)
  }

  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.createChart()
  }

  createChart() {
    d3.select(this.node)
      .attr("width", this.layout.width + this.layout.margin.left + this.layout.margin.right)
      .attr("height", this.layout.height + this.layout.margin.top + this.layout.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.layout.margin.left + "," + this.layout.margin.top + ")");

    // Add data
    let accessor = this.candlestick.accessor();

    let data = this.props.data.slice(0, 200).map((d) => {
      return {
        date: this.parseDate(d.Date),
        open: +d.Open,
        high: +d.High,
        low: +d.Low,
        close: +d.Close,
        volume: +d.Volume
      };
    }).sort((a, b) => { return d3.ascending(accessor.d(a), accessor.d(b)); });

    d3.select(this.node).append("g")
      .attr("class", "candlestick");

    d3.select(this.node).append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.layout.height + ")");

    d3.select(this.node).append("g")
      .attr("class", "y axis")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

    // Data to display initially
    this.draw(data.slice(0, data.length-20));
    // Only want this button to be active if the data has loaded
    // d3.d3.select("button").on("click", () => { draw(data); }).style("display", "inline");
  }

  draw(data) {
    this.x.domain(data.map(this.candlestick.accessor().d));
    this.y.domain(techan.scale.plot.ohlc(data, this.candlestick.accessor()).domain());

    d3.select(this.node).selectAll("g.candlestick").datum(data).call(this.candlestick);
    d3.select(this.node).selectAll("g.x.axis").call(this.xAxis);
    d3.select(this.node).selectAll("g.y.axis").call(this.yAxis);
  }
  render() {
    return <svg ref={node => this.node = node}
                width={this.props.width} height={this.props.height}>
    </svg>
  }
}