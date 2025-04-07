import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useStock } from "../context/StockContext";
import useUserSession from "../hooks/useAuth";
import { addWatchlist, getChartCoinData, getCoinData } from "../services/apis";
import DetailsHeader from "../components/DetailsHeader";
import DetailsMarketStatus from "../components/DetailsMarketStatus";
import DetailsChart from "../components/DetailsChart";
import { useSnackbar } from "../context/SnackbarProvider";
import LoadingScreen from "../components/LoadingScreen";

const getDaysForRange = (range) => {
  switch (range) {
    case "1D":
      return 1; // Last 24 hours
    case "1W":
      return 7; // Last 7 days
    case "1M":
      return 30; // Last 30 days
    case "3M":
      return 90; // Last 3 months
    case "6M":
      return 180; // Last 6 months
    case "YTD":
      return 365; // Year to Date (same as 1 year)
    case "1Y":
      return 365; // Last 1 year
    default:
      return 1; // Default to 1 day if range is unknown
  }
};

const StockDetail = () => {
  const navigate = useNavigate(); // Get the navigate function

  const { symbol } = useParams();
  const { user } = useUserSession();
  const { showSnackbar } = useSnackbar(); // Use Snackbar Context

  const [loading, setLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState("price");
  const [selectedRange, setSelectedRange] = useState("1D");
  const [coinData, setCoinData] = useState({});
  const [chartData, setChartData] = useState({});
  const [noData, setNoData] = useState(false); // New state to track no data
  const [starIcon, setStarIcon] = useState(false);
  // Function to fetch the data
  const fetchCoinData = async () => {
    if (!symbol) return;
    try {
      // Fetch coin data
      const responseCoinData = await getCoinData(symbol);
      if (responseCoinData && Object.keys(responseCoinData).length > 0) {
        setCoinData(responseCoinData);
        setNoData(false); // Reset noData state
      } else {
        setNoData(true); // Set noData to true if no data
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching coin data:", error);
      setLoading(false);
      setNoData(true); // Set noData to true on error
    }
  };

  const fetchChartData = async (range) => {
    if (!symbol) return;
    try {
      const days = getDaysForRange(range); // Convert range to days
      const chart = await getChartCoinData(symbol, days); // Pass days instead of range
      if (chart && Object.keys(chart).length > 0) {
        setChartData(chart);
        setNoData(false); // Reset noData state
      } else {
        setNoData(true); // Set noData to true if no data
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setNoData(true); // Set noData to true on error
    }
  };

  // On initial load, fetch coin data and chart data for "1D" range
  useEffect(() => {
    fetchCoinData(); // Fetch coin data on initial load
    fetchChartData("1D"); // Fetch 1D chart data on initial load
  }, []);

  // Update chart data when range changes
  const handleRangeChange = (range) => {
    setSelectedRange(range);
    fetchChartData(range); // Call the function to fetch chart data for the selected range
  };

  // Handle adding stock to watchlist
  const handleAddToWatchlist = async () => {
    if (!user?.id) {
      navigate("/signin"); // Redirect user to sign-in page
      return;
    }

    try {
      await addWatchlist(
        user.id,
        coinData?.symbol,
        coinData?.name,
        coinData?.id
      );
      setStarIcon(true);
      showSnackbar("Successfully Added to Watchlist!", "success"); // Show Snackbar
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ maxWidth: "1400px", margin: "auto", mt: 5 }}>
      {loading ? (
        <Typography variant="h5">Loading...</Typography>
      ) : noData ? ( // Check if noData is true
        <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
          We are not having data for this coin.
        </Typography>
      ) : (
        <>
          <DetailsHeader
            symbol={symbol}
            coinData={coinData}
            handleAddToWatchlist={handleAddToWatchlist}
            starIcon={starIcon}
          />

          {/* Metric & Time Range Selection */}
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
            <Box>
              {["Price", "Market Cap", "Trading View"].map((metric) => (
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
            <Box sx={{ ml: 6 }}>
              {["1D", "1W", "1M", "3M", "6M", "YTD", "1Y"].map((range) => (
                <Button
                  key={range}
                  variant={selectedRange === range ? "contained" : "outlined"}
                  onClick={() => handleRangeChange(range)} // Use the new function for range change
                  sx={{ ml: 1 }}
                >
                  {range}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Chart & Metrics */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  height: 400,
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  p: 2,
                }}
              >
                <DetailsChart
                  chartData={chartData}
                  selectedRange={selectedRange}
                  selectedMetric={selectedMetric}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailsMarketStatus coinData={coinData} />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default StockDetail;
