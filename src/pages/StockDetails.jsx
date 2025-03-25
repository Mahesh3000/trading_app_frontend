import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
} from "@mui/material";

import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useParams } from "react-router-dom";
import { useStock } from "../context/StockContext";
import TradeModal from "../components/TradeModal"; // Import the TradeModal component
import useUserSession from "../hooks/useAuth";
import { addWatchlist, getChartCoinData, getCoinData } from "../services/apis";
import DetailsHeader from "../components/DetailsHeader";
import DetailsMarketStatus from "../components/DetailsMarketStatus";
import DetailsChart from "../components/DetailsChart";

const StockDetail = () => {
  const { symbol } = useParams();
  const { stockDatas } = useStock(); // Access the stock data from context
  console.log("stockDatas", stockDatas);
  const { user } = useUserSession(); // Get user from session

  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("price");
  const [selectedRange, setSelectedRange] = useState("1D");
  const [coinData, setCoinData] = useState({});
  const [chartData, setChartData] = useState({});
  console.log("symbol", symbol);

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;

      try {
        // Check if coin data is already fetched
        if (coinData?.id === symbol) {
          return; // Avoid fetching data if already fetched
        }

        const responseCoinData = await getCoinData(symbol);
        console.log("CoinData:", responseCoinData);
        setCoinData(responseCoinData);

        const chart = await getChartCoinData(symbol, 30);
        // console.log("ChartData:", chart);
        setChartData(chart);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchData();
  }, [symbol]); // Only rerun when `symbol` changes

  const marketStats = {
    dayRange: "₹399.80 - ₹386.15",
    volume: "3,72,355",
    faceValue: "₹2",
  };

  const handleAddToWatchlist = async () => {
    console.log("watch list added");
    if (!user?.id) {
      console.error("User ID is undefined");
      return;
    }
    try {
      console.log(user?.id);

      const response = await addWatchlist(
        user.id,
        stockDatas?.symbol,
        stockDatas?.name
      );
      console.log("response", response);
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", mt: 5 }}>
      {loading ? (
        <div>
          <h1>loading</h1>
        </div>
      ) : (
        <>
          <DetailsHeader
            // stockDatas={stockDatas}
            symbol={symbol}
            coinData={coinData}
            handleAddToWatchlist={handleAddToWatchlist}
          />
          <DetailsChart chartData={chartData} />
          <DetailsMarketStatus marketStats={marketStats} />
        </>
      )}

      {/* Time Range and Metric Buttons */}
    </Box>
  );
};

export default StockDetail;

// useEffect(() => {
//   fetchStockData(selectedRange);
// }, [symbol, selectedRange]);

// if (loading) {
//   return <div>Loading...</div>;
// }

// Extract the appropriate time series data based on the selected range
// let timeSeries = {};
// if (selectedRange === "1D" && stockData["Time Series (Daily)"]) {
//   timeSeries = stockData["Time Series (Daily)"];
// } else if (selectedRange === "1W" && stockData["Weekly Time Series"]) {
//   timeSeries = stockData["Weekly Time Series"];
// } else if (selectedRange === "1M" && stockData["Monthly Time Series"]) {
//   timeSeries = stockData["Monthly Time Series"];
// }

// // If no valid time series data, return an error message
// if (Object.keys(timeSeries).length === 0) {
//   return <div>Loading</div>;
// }

// Format date to "DD MMM" (e.g., "10 Mar")
// const formatDate = (timestamp) => {
//   const dateObj = new Date(timestamp);
//   return `${dateObj.getDate()} ${dateObj.toLocaleString("en-US", {
//     month: "short",
//   })}`;
// };

// const labels = Object.keys(timeSeries)
//   .map((time) => formatDate(time))
//   .reverse();

// const closePrices = Object.keys(timeSeries)
//   .map((time) => timeSeries[time]["4. close"] || timeSeries[time]["close"])
//   .reverse();

// const volumeData = Object.keys(timeSeries)
//   .map((time) => timeSeries[time]["5. volume"] || 0)
//   .reverse();

// const chartData = {
//   labels,
//   datasets: [
//     {
//       label:
//         selectedMetric === "price"
//           ? `${symbol} Close Price`
//           : selectedMetric === "volume"
//           ? `${symbol} Volume`
//           : "Price & Volume",
//       data: selectedMetric === "price" ? closePrices : volumeData,
//       borderColor: "rgba(75, 192, 192, 1)",
//       backgroundColor:
//         selectedMetric === "price"
//           ? "rgba(75, 192, 192, 0.2)"
//           : "transparent",
//       fill: selectedMetric === "price", // Only fill for price
//     },
//   ],
// };

// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: false, // Hide legend
//     },
//     title: {
//       display: false, // Hide title
//     },
//     filler: {
//       propagate: false,
//     },
//   },
//   scales: {
//     x: {
//       grid: {
//         display: false, // Hide x-axis grid lines
//       },
//     },
//     y: {
//       grid: {
//         display: true, // Show y-axis grid lines
//       },
//     },
//   },
//   elements: {
//     line: {
//       fill: true, // Fill the area under the line
//       backgroundColor: "rgba(136, 132, 216, 0.3)", // Shaded area color
//       borderColor: "#8884d8", // Line color
//       tension: 0.4, // Adjust line curve
//     },
//   },
// };
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

// const fetchStockData = async (range) => {
// let apiUrl = "";
// switch (range) {
//   case "1D":
//     apiUrl = `  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
//     break;
//   case "1W":
//     apiUrl = `  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
//     break;
//   case "1M":
//     apiUrl = `  https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
//     break;
//   default:
//     break;
// }
// try {
//   const response = await fetch(apiUrl);
//   const data = await response.json();
//   setStockData(data);
//   setLoading(false);
// } catch (error) {
//   console.error("Error fetching stock data:", error);
// }
// };
