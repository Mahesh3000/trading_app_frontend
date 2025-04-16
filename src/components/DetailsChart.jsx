import React, { useEffect, useState } from "react";
import {
  createChart,
  LineSeries,
  CandlestickSeries,
  AreaSeries,
} from "lightweight-charts";

const DetailsChart = ({ chartData, selectedMetric }) => {
  const [chart, setChart] = useState(null);
  const [lineSeries, setLineSeries] = useState(null);
  const [areaSeries, setAreaSeries] = useState(null); // Add areaSeries to state

  const [candlestickSeries, setCandlestickSeries] = useState(null);

  useEffect(() => {
    const chartInstance = createChart(
      document.getElementById("chartContainer"),
      {
        width: 850,
        height: 350,
        layout: { backgroundColor: "#ffffff", textColor: "#333" },
        grid: {
          vertLines: { color: "rgba(197, 203, 206, 0.5)" },
          horzLines: { color: "rgba(197, 203, 206, 0.5)" },
        },
        crosshair: { mode: 0 },
        priceScale: { borderColor: "rgba(197, 203, 206, 0.5)" },
        scaleMargins: { top: 0.2, bottom: 0.2 },
      }
    );

    const line = chartInstance.addSeries(LineSeries);
    const area = chartInstance.addSeries(AreaSeries, {
      lineColor: "transparent", // Make the area's top line invisible if you only want the shade
      topColor: "rgba(0, 128, 128, 0.3)", // Adjust the top color and opacity for the shade
      bottomColor: "rgba(0, 128, 128, 0.05)", // Adjust the bottom color and opacity
    });
    const candle = chartInstance.addSeries(CandlestickSeries, {
      upColor: "#26a69a", // Green for up candles
      borderUpColor: "#26a69a", // Border color for up candles
      wickUpColor: "#26a69a", // Wick color for up candles
      borderDownColor: "#ef5350", // Border color for down candles
      wickDownColor: "#ef5350", // Wick color for down candles
      barWidth: 10, // Increase this value to make the candles bigger
    });
    setChart(chartInstance);
    setLineSeries(line);
    setAreaSeries(area); // Set the area series state

    setCandlestickSeries(candle);

    return () => {
      chartInstance.remove();
    };
  }, []);

  const getOptimalInterval = (rangeMs) => {
    if (rangeMs <= 24 * 60 * 60 * 1000) return 10 * 60 * 1000; // 10 min for 1D
    if (rangeMs <= 7 * 24 * 60 * 60 * 1000) return 2 * 60 * 60 * 1000; // 1 hour for 1W
    if (rangeMs <= 30 * 24 * 60 * 60 * 1000) return 4 * 60 * 60 * 1000; // 4 hours for 1M
    return 2 * 24 * 60 * 60 * 1000; // 1 day for 3M+
  };

  useEffect(() => {
    if (chart && lineSeries && candlestickSeries && chartData) {
      if (selectedMetric === "price" && chartData.prices) {
        const lineChartData = chartData.prices.map(([timestamp, price]) => ({
          time: Math.floor(timestamp / 1000), // Convert to seconds
          value: price,
        }));
        lineSeries.setData(lineChartData);
        areaSeries.setData(lineChartData); // Set the same data for the area series
        candlestickSeries.setData([]); // Clear candlestick series
      } else if (selectedMetric === "trading view" && chartData.prices) {
        const rangeMs = chartData.prices.at(-1)[0] - chartData.prices[0][0];
        const interval = getOptimalInterval(rangeMs);
        const groupedData = {};

        chartData.prices.forEach(([timestamp, price]) => {
          const timeKey = Math.floor(timestamp / interval) * (interval / 1000);
          if (!groupedData[timeKey]) {
            groupedData[timeKey] = {
              time: timeKey,
              open: price,
              high: price,
              low: price,
              close: price,
            };
          } else {
            groupedData[timeKey].high = Math.max(
              groupedData[timeKey].high,
              price
            );
            groupedData[timeKey].low = Math.min(
              groupedData[timeKey].low,
              price
            );
            groupedData[timeKey].close = price;
          }
        });

        const candlestickData = Object.values(groupedData);
        lineSeries.setData([]); // Clear line series
        areaSeries.setData([]); // Clear area series for trading view

        candlestickSeries.setData(candlestickData); // Set candlestick data
      } else if (selectedMetric === "market cap" && chartData.market_caps) {
        const marketCapLineData = chartData.market_caps.map(
          ([timestamp, marketCap]) => ({
            time: Math.floor(timestamp / 1000), // Convert to seconds
            value: marketCap,
          })
        );
        lineSeries.applyOptions({
          priceFormat: {
            type: "custom",
            formatter: (price) => {
              if (price >= 1_000_000_000_000)
                return `${(price / 1_000_000_000_000).toFixed(1)}T`;
              if (price >= 1_000_000_000)
                return `${(price / 1_000_000_000).toFixed(1)}B`;
              if (price >= 1_000_000)
                return `${(price / 1_000_000).toFixed(1)}M`;
              if (price >= 1_000) return `${(price / 1_000).toFixed(1)}K`;
              return price.toString();
            },
          },
        });
        lineSeries.setData(marketCapLineData);
        areaSeries.setData(marketCapLineData); // Set the same data for the area series

        candlestickSeries.setData([]); // Clear candlestick series
      }
    }
  }, [chartData, selectedMetric, chart, lineSeries, candlestickSeries]);

  return <div id="chartContainer" style={{ width: "100%", height: "400px" }} />;
};

export default DetailsChart;
