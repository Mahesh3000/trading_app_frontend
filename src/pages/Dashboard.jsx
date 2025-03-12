import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_KEY = "demo"; // Using the demo key for Alpha Vantage API

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState(""); // For the search bar input
  const [loading, setLoading] = useState(false); // Loading state
  const [stockData, setStockData] = useState(null); // To store stock data fetched from API
  const [companySymbol, setCompanySymbol] = useState(""); // Store selected company symbol
  const navigate = useNavigate(); // Navigation for routing to stock details page

  // Fetch intraday stock data from Alpha Vantage API
  const fetchStockData = async (symbol) => {
    console.log("symbol", symbol);

    if (!symbol) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data["Time Series (5min)"]) {
        setStockData(data["Time Series (5min)"]);
        setCompanySymbol(symbol); // Store the symbol for display purposes
      } else {
        setStockData(null);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      setStockData(null);
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm) {
      fetchStockData(searchTerm);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Master Stock Trading Without Risk
      </Typography>

      {/* Explanation */}
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        textAlign="center"
      >
        Track your stocks, manage your watchlist, and monitor holdings in one
        place. Get insights and stay updated with market trends effortlessly.
      </Typography>

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Search for stocks..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
        />
        {loading && (
          <CircularProgress color="inherit" size={24} sx={{ marginLeft: 2 }} />
        )}
      </Box>

      {/* Stock Data or Error Handling */}
      {stockData ? (
        <>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Stock Data for {companySymbol}
          </Typography>
          {/* Display a sample of stock data */}
          <Box>
            {Object.keys(stockData).map((time, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{time}:</strong> {stockData[time]["1. open"]} USD
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Option to go to stock detail page */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/stock/${companySymbol}`)}
            sx={{ mt: 3 }}
          >
            View Full Details
          </Button>
        </>
      ) : (
        !loading &&
        searchTerm && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            No data found for "{searchTerm}". Please try a different symbol.
          </Typography>
        )
      )}
    </Container>
  );
};

export default Dashboard;
