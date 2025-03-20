import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
} from "@mui/material";
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
  Filler,
} from "chart.js";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { useStock } from "../context/StockContext";
import TradeModal from "../components/TradeModal"; // Import the TradeModal component

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StockDetail = () => {
  const { symbol } = useParams();
  const { stockDatas } = useStock(); // Access the stock data from context
  console.log("stockDatas", stockDatas);

  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("price");
  const [selectedRange, setSelectedRange] = useState("1D");

  const marketStats = {
    dayRange: "₹399.80 - ₹386.15",
    volume: "3,72,355",
    faceValue: "₹2",
  };
  // Helper function to fetch stock data based on time range
  // const fetchStockData = async (range) => {
  //   let apiUrl = "";
  //   switch (range) {
  //     case "1D":
  //       apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockDatas?.symbol}&apikey=261CEM7OEOAFAZ0I`;
  //       break;
  //     case "1W":
  //       apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stockDatas?.symbol}&apikey=261CEM7OEOAFAZ0I`;
  //       break;
  //     case "1M":
  //       apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stockDatas?.symbol}&apikey=261CEM7OEOAFAZ0I`;
  //       break;
  //     default:
  //       break;
  //   }

  const fetchStockData = async (range) => {
    let apiUrl = "";
    switch (range) {
      case "1D":
        apiUrl = `  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
        break;
      case "1W":
        apiUrl = `  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
        break;
      case "1M":
        apiUrl = `  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
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

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: false, // Hide title
      },
      filler: {
        propagate: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        grid: {
          display: true, // Show y-axis grid lines
        },
      },
    },
    elements: {
      line: {
        fill: true, // Fill the area under the line
        backgroundColor: "rgba(136, 132, 216, 0.3)", // Shaded area color
        borderColor: "#8884d8", // Line color
        tension: 0.4, // Adjust line curve
      },
    },
  };
  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {stockDatas?.name.toUpperCase()}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {symbol.toUpperCase()}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        {/* <Button variant="contained" color="primary" sx={{ mr: 1 }}>
          Trade
        </Button> */}
        <TradeModal /> {/* Render the TradeModal component here */}
        <Button
          variant="outlined"
          startIcon={<StarBorderIcon />}
          sx={{ ml: 2 }}
        >
          Add to Watchlist
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Last Price
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {/* ₹{stockDatas?.lastPrice} */}
                6732
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Change
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                // color={stockDatas?.change > 0 ? "success.main" : "error.main"}
              >
                {/* {stockDatas?.change > 0 ? "↑" : "↓"} {stockDatas?.change}% */}
                6732
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Open
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {/* ₹{stockDatas?.open} */}
                6732
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Previous Close
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {/* ₹{stockDatas?.previousClose} */}
                6732
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Time Range and Metric Buttons */}

      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, mr: 1 }}>
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
                  sx={{ mr: 1 }} // Remove right margin
                >
                  {metric}
                </Button>
              ))}
            </Box>

            {/* Time Range Selection */}
            <Box>
              {["1D", "1W", "1M", "3M", "6M", "YTD", "1Y"].map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? "contained" : "outlined"}
                  onClick={() => {
                    setSelectedRange(range);
                    fetchStockData(range);
                  }}
                  sx={{ ml: 1 }} // Remove left margin
                >
                  {range}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                height: 300,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <Line data={chartData} options={chartOptions} />
              <Typography variant="caption" align="left">
                Last updated: Mar 16, 2025 22:30
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ padding: "16px" }}>
              <Typography variant="h6" gutterBottom>
                Market Stats
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle2">Day's Range</Typography>
                    <Typography variant="body1">
                      {marketStats.dayRange}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle2">Volume</Typography>
                    <Typography variant="body1">
                      {marketStats.volume}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="subtitle2">Face Value</Typography>
                    <Typography variant="body1">
                      {marketStats.faceValue}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StockDetail;
