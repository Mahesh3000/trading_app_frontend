import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent, Box, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useParams } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDetail = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("price");
  const [selectedRange, setSelectedRange] = useState("1D");

  // Helper function to fetch stock data based on time range
  const fetchStockData = async (range) => {
    let apiUrl = "";
    switch (range) {
      case "1D":
        apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo`;
        break;
      case "1W":
        apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo`;
        break;
      case "1M":
        apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo`;
        break;
      default:
        break;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setStockData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  useEffect(() => {
    fetchStockData(selectedRange);
  }, [symbol, selectedRange]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Extract the appropriate time series data based on the selected range
  let timeSeries = {};
  if (selectedRange === "1D" && stockData["Time Series (Daily)"]) {
    timeSeries = stockData["Time Series (Daily)"];
  } else if (selectedRange === "1W" && stockData["Weekly Time Series"]) {
    timeSeries = stockData["Weekly Time Series"];
  } else if (selectedRange === "1M" && stockData["Monthly Time Series"]) {
    timeSeries = stockData["Monthly Time Series"];
  }

  // If no valid time series data, return an error message
  if (Object.keys(timeSeries).length === 0) {
    return <div>Loading</div>;
  }

  // Format date to "DD MMM" (e.g., "10 Mar")
  const formatDate = (timestamp) => {
    const dateObj = new Date(timestamp);
    return `${dateObj.getDate()} ${dateObj.toLocaleString("en-US", {
      month: "short",
    })}`;
  };

  const labels = Object.keys(timeSeries)
    .map((time) => formatDate(time))
    .reverse();

  const closePrices = Object.keys(timeSeries)
    .map((time) => timeSeries[time]["4. close"] || timeSeries[time]["close"])
    .reverse();

  const volumeData = Object.keys(timeSeries)
    .map((time) => timeSeries[time]["5. volume"] || 0)
    .reverse();

  const chartData = {
    labels,
    datasets: [
      {
        label:
          selectedMetric === "price"
            ? `${symbol} Close Price`
            : selectedMetric === "volume"
            ? `${symbol} Volume`
            : "Price & Volume",
        data: selectedMetric === "price" ? closePrices : volumeData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor:
          selectedMetric === "price"
            ? "rgba(75, 192, 192, 0.2)"
            : "transparent",
        fill: selectedMetric === "price", // Only fill for price
      },
    ],
  };

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {symbol.toUpperCase()}
      </Typography>

      {/* Time Range and Metric Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {/* Metric Selection */}
        <Box>
          {["Price", "Volume", "Combined"].map((metric) => (
            <Button
              key={metric}
              variant={
                selectedMetric === metric.toLowerCase()
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setSelectedMetric(metric.toLowerCase())}
              sx={{ mr: 1 }}
            >
              {metric}
            </Button>
          ))}
        </Box>

        {/* Time Range Selection */}
        <Box>
          {["1D", "1W", "1M"].map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? "contained" : "outlined"}
              onClick={() => {
                setSelectedRange(range);
                fetchStockData(range);
              }}
              sx={{ ml: 1 }}
            >
              {range}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Enlarged Graph with Shaded Area */}
      <Box sx={{ height: 500, mt: 3 }}>
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                ticks: {
                  maxTicksLimit: 6, // Limit the number of x-axis labels
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default StockDetail;
