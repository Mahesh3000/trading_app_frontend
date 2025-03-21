import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getWatchlist } from "../services/apis";
import useUserSession from "../hooks/useAuth";

const watchlistData = [
  {
    symbol: "GOLDIAM",
    name: "Goldiam International Limited",
    price: "₹385.30",
    change: "11.10 (2.80%)",
    changeType: "decrease", // 'increase' or 'decrease'
  },
  // Add more stock data here
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: "₹180.50",
    change: "2.30 (1.29%)",
    changeType: "increase",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: "₹2700.00",
    change: "15.20 (0.56%)",
    changeType: "decrease",
  },
];

const Watchlist = () => {
  const navigate = useNavigate();
  const { user } = useUserSession(); // Get user from session
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      console.error("User ID is undefined");
      return;
    }
    const fetchWatchlist = async () => {
      try {
        setLoading(true);
        const data = await getWatchlist(user?.id); // Fetch data from backend
        setWatchlist(data);
      } catch (error) {
        setError("Error fetching watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user]);

  console.log("watchlist", watchlist);

  const handleViewDetails = (symbol) => {
    // navigate(`/stock-details/${symbol}`); // Redirect to stock details page

    console.log("view detals clicked", symbol);
  };

  const handleDelete = async (symbol) => {
    try {
      // Make an API call to delete the stock from watchlist
      await deleteFromWatchlist(user?.id, symbol);

      // Remove from local state (watchlist)
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((stock) => stock.symbol !== symbol)
      );
    } catch (error) {
      console.error("Error deleting stock from watchlist", error);
      setError("Error deleting stock");
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6">Your Watchlist</Typography>
        <Button variant="outlined" size="small" onClick={() => navigate("/")}>
          + Add Stocks
        </Button>
      </Box>

      {watchlist.map((stock, index) => (
        <Paper key={index} sx={{ padding: "20px", marginBottom: "10px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="subtitle1">{stock.symbol}</Typography>
              <Typography variant="body2">{stock.company_name}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" sx={{ marginRight: "10px" }}>
                {stock.price}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: stock.changeType === "increase" ? "green" : "red",
                  marginRight: "10px",
                }}
              >
                {/* <span style={{ verticalAlign: "middle", marginRight: "2px" }}>
                  {stock.changeType === "increase" ? "▲" : "▼"}
                </span> */}

                {/* {stock.change} */}
              </Typography>
              <Button
                variant="text"
                size="small"
                sx={{ marginRight: "10px" }}
                onClick={() => handleViewDetails(stock.symbol)}
              >
                View Details
              </Button>
              <IconButton
                size="small"
                onClick={() => handleDelete(stock.symbol)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Watchlist;
