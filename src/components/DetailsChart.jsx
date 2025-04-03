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
  console.log("selectedMetric", selectedMetric);

  useEffect(() => {
    const chartInstance = createChart(
      document.getElementById("chartContainer"),
      {
        width: 750,
        height: 400,
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
        const interval = 10 * 60000; // 1-minute interval (in milliseconds)
        const groupedData = {};

        // Group data by intervals and calculate OHLC values
        chartData.prices.forEach(([timestamp, price]) => {
          const timeKey = Math.floor(timestamp / interval) * (interval / 1000); // Group by 1-minute interval

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
        console.log("groupedData", groupedData);

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
        lineSeries.setData(marketCapLineData);
        areaSeries.setData(marketCapLineData); // Set the same data for the area series

        candlestickSeries.setData([]); // Clear candlestick series
      }
    }
  }, [chartData, selectedMetric, chart, lineSeries, candlestickSeries]);

  return <div id="chartContainer" style={{ width: "100%", height: "400px" }} />;
};

export default DetailsChart;

// import { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// // Helper function to adjust date formatting for different ranges
// const formatDateForRange = (timestamp, range) => {
//   const date = new Date(timestamp);
//   if (range === "1D") {
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Hourly granularity for 1 day
//   } else if (range === "1W") {
//     return date.toLocaleDateString(); // Daily granularity for 1 week
//   } else if (range === "1M") {
//     return date.toLocaleDateString(); // Daily granularity for 1 month
//   } else if (range === "3M" || range === "6M" || range === "1Y") {
//     return `${date.getMonth() + 1}/${date.getDate()}`; // Monthly granularity for 3M, 6M, and 1Y
//   } else {
//     return date.toLocaleDateString(); // Default for other ranges
//   }
// };

// const DetailsChart = ({ chartData, selectedMetric, selectedRange }) => {
//   const [formattedData, setFormattedData] = useState(null);
//   console.log("selectedMetric", selectedMetric);

//   useEffect(() => {
//     if (chartData) {
//       const { prices, market_caps, total_volumes } = chartData;

//       // Format data for Chart.js
//       const labels = prices?.map((item) =>
//         formatDateForRange(item[0], selectedRange)
//       ); // Adjust the label based on selectedRange
//       const priceData = prices?.map((item) => item[1]);
//       const marketCapData = market_caps?.map((item) => item[1]);
//       const volumeData = total_volumes?.map((item) => item[1]);

//       // Select the correct dataset based on `selectedMetric`
//       let dataset = {};
//       if (selectedMetric === "price") {
//         dataset = {
//           labels,
//           datasets: [
//             {
//               label: "Price",
//               data: priceData,
//               fill: false,
//               borderColor: "rgba(75,192,192,1)",
//               tension: 0.3, // Adjust for smoothness
//               pointRadius: 0,
//             },
//           ],
//         };
//       } else if (selectedMetric === "market cap") {
//         dataset = {
//           labels,
//           datasets: [
//             {
//               label: "Market Cap",
//               data: marketCapData,
//               fill: false,
//               borderColor: "rgba(255,99,132,1)",
//               tension: 0.3, // Adjust for smoothness
//               pointRadius: 0,
//             },
//           ],
//         };
//       } else if (selectedMetric === "trading view") {
//         dataset = {
//           labels,
//           datasets: [
//             {
//               label: "Volume",
//               data: volumeData,
//               fill: false,
//               borderColor: "rgba(153,102,255,1)",
//               tension: 0.3, // Adjust for smoothness
//               pointRadius: 0,
//             },
//           ],
//         };
//       }

//       setFormattedData(dataset); // Set the dataset for the selected metric
//     }
//   }, [chartData, selectedMetric, selectedRange]); // Re-run when `chartData`, `selectedMetric`, or `selectedRange` props change

//   const options = {
//     responsive: true,
//     scales: {
//       x: {
//         ticks: {
//           autoSkip: true,
//           maxRotation: 90,
//           minRotation: 45,
//         },
//       },
//       y: {
//         ticks: {
//           callback: function (value) {
//             return value.toLocaleString(); // Format y-axis numbers
//           },
//         },
//         grid: {
//           drawBorder: false, // Remove y-axis border
//           borderDash: [4, 4], // Create dashed grid lines
//           color: "rgba(0, 0, 0, 0.1)", // Light gray grid line color
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//         align: "center",
//         labels: {
//           usePointStyle: true, // Use a square for the legend item
//         },
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//         callbacks: {
//           label: function (context) {
//             let label = context.dataset.label || "";
//             if (label) {
//               label += ": ";
//             }
//             if (context.parsed.y !== null) {
//               label += new Intl.NumberFormat("en-US", {
//                 style: "currency",
//                 currency: "USD", // Or your desired currency
//               }).format(context.parsed.y);
//             }
//             return label;
//           },
//         },
//       },
//     },
//   };
//   return (
//     <div>
//       {formattedData ? (
//         <Line
//           data={formattedData}
//           options={options}
//           style={{ width: "100%", height: "400px" }} // Set height and width with inline styles
//         />
//       ) : (
//         <div>Loading chart data...</div>
//       )}
//     </div>
//   );
// };

// export default DetailsChart;
