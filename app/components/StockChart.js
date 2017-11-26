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
class StockChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 400,
      height: 400
    };
  }
  componentDidMount() {
    this.setState({
      width: this.divElement.clientWidth,
      height: this.divElement.clientHeight
    });
  }

  render() {
    const red = "#801b15";   // "#FF0000";
    const green = "#10631b"; // "#6BA583";
    const volChartHeight = 100;

    const chart = this.props.chart;
    const width = this.state.width;
    const height = this.state.height;
    const initialData = chart.data;
    const ratio = width / height;

    const xScaleProvider = discontinuousTimeScaleProvider
      .inputDateAccessor(d => d.date);

    const {
      data,
      xScale,
      xAccessor,
      displayXAccessor,
    } = xScaleProvider(initialData);

    if (initialData.length > 1) {
      const xStart = xAccessor(last(data));
      const xEnd = xAccessor(data[Math.max(0, data.length - 150)]);
      const xExtents = [xStart, xEnd];

      return (
        <div className="chart-container"
             ref={ (divElement) => this.divElement = divElement}>
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

StockChart = fitWidth(StockChart);

export default StockChart;