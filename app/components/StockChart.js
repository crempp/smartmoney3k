import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import {
  BarSeries,
  CandlestickSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  CrossHairCursor,
  EdgeIndicator,
  CurrentCoordinate,
  MouseCoordinateX,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import { time2utc } from '../utils/convert';

import '../style/components/Chart.scss';

/**
 * http://rrag.github.io/react-stockcharts/documentation.html
 */
class WrappableChart extends React.Component {
  render() {
    const red = "#801b15";
    const green = "#10631b";
    const volChartHeight = 100;

    const width = this.props.width;
    const height = this.props.height;
    const ratio = width / height;
    const initialData = this.props.data

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date);

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData);

    if (data.length > 1) {
      const xStart = xAccessor(last(data));
      const xEnd = xAccessor(data[Math.max(0, data.length - 150)]);
      const xExtents = [xStart, xEnd];

      return (
        <div className="chart-container">
          <ChartCanvas
            height={height}

            ratio={ratio}
            width={width}
            margin={{
              left: 50,
              right: 50,
              top: 10,
              bottom: 20
            }}
            type="hybrid"
            // type="svg"
            seriesName="derp"
            data={data}
            xScale={xScale}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
            // NOTE: When I add xExtents the chart resets (won't stay zoomed)
            // on every update.
            // xExtents={xExtents}
            zoomMultiplier={1.05}
            pointsPerPxThreshold={0.5}
            minPointsPerPxThreshold={0.07}
          >
            {/*
              * Candlestick Chart
              *
              * */}
            <Chart
              id={1}
              yExtents={[d => [d.high, d.low]]}
              padding={{top: 40, bottom: 20}}
              height={Math.floor(height*0.6)}
            >
              <YAxis
                axisAt="right"
                orient="right"
                ticks={5}
                tickStroke="#FFFFFF"
                fontSize={10} />
              <MouseCoordinateX
                rectWidth={60}
                at="bottom"
                orient="bottom"
                displayFormat={timeFormat("%H:%M:%S")} />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")} />
              <CandlestickSeries
                wickStroke="#bcbcbc" />
              <EdgeIndicator
                itemType="last"
                orient="right"
                edgeAt="right"
                yAccessor={d => d.close}
                fill={d => d.close > d.open ? green : red} />
              <OHLCTooltip
                origin={[-40, 0]}
                xDisplayFormat={timeFormat("%H:%M:%S")}
                accessor={d => ({
                  date: time2utc(d.date),
                  open: d.open,
                  high: d.high,
                  low: d.low,
                  close: d.close,
                  volume: d.volume
                })} />
            </Chart>

            {/*
              * Volume Chart
              *
              * Clipping bug:
              *   https://github.com/rrag/react-stockcharts/issues/394
              * */}
            <Chart
              id={2}
              yExtents={d => d.volume}
              height={volChartHeight}
              origin={(w, h) => [0, h - volChartHeight]}
            >
              <XAxis
                axisAt="bottom"
                orient="bottom"
                tickStroke="#FFFFFF"
                fontSize={10} />
              <YAxis
                axisAt="left"
                orient="left"
                ticks={5}
                tickFormat={format(".3s")}
                tickStroke="#FFFFFF"
                fontSize={10} />
              <MouseCoordinateY
                at="left"
                orient="left"
                displayFormat={format(".4s")} />
              <BarSeries
                yAccessor={d => d.volume}
                fill={d => d.close > d.open ? green : red} />
              <CurrentCoordinate
                yAccessor={d => d.volume} fill="#9B0A47" />
              <EdgeIndicator
                itemType="first"
                orient="left"
                edgeAt="left"
                yAccessor={d => d.volume}
                displayFormat={format(".4s")}
                fill="#4c4c4c" />
              <EdgeIndicator
                itemType="last"
                orient="right"
                edgeAt="right"
                yAccessor={d => d.volume}
                displayFormat={format(".4s")}
                fill="#4c4c4c" />
            </Chart>

            <CrossHairCursor
              stroke="#bcbcbc" />

          </ChartCanvas>
        </div>
      );
    }
    else {
      return (
        <div>Not enough data</div>
      )
    }
  }
}

WrappableChart = fitWidth(WrappableChart);

function updatingDataWrapper(ChartComponent) {
  const LENGTH = 100;

  class UpdatingComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        length: LENGTH,
        data: this.props.chart.data.slice(0, LENGTH),
        width: 400,
        height: 400,
      };
    }

    componentDidMount() {
      // this.setState({
      //   width: this.divElement.clientWidth,
      //   height: this.divElement.clientHeight
      // });
    }

    componentWillUnmount() {
      // if (this.interval) clearInterval(this.interval);
    }

    componentWillReceiveProps(nextProps) {
      console.log("here")
      if (this.state.data.length < nextProps.chart.data.length) {
        this.setState({
          length: this.state.length + 1,
          data: nextProps.chart.data.slice(0, this.state.length + 1),
        });
      }
    }

    render() {
      const { data } = this.state;

      return <ChartComponent ref={ (divElement) => this.divElement = divElement}
                             data={data}
                             width={this.state.width}
                             height={this.state.height}
      />;
    }
  }

  return UpdatingComponent;
}

const StockChart = updatingDataWrapper(WrappableChart);

export default StockChart;