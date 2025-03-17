import React from "react";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

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

  const handleDelete = () => {
    console.log("stock");
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

      {watchlistData.map((stock, index) => (
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
              <Typography variant="body2">{stock.name}</Typography>
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
                <span style={{ verticalAlign: "middle", marginRight: "2px" }}>
                  {stock.changeType === "increase" ? "▲" : "▼"}
                </span>
                {stock.change}
              </Typography>
              <Button variant="text" size="small" sx={{ marginRight: "10px" }}>
                View Details
              </Button>
              <IconButton size="small" onClick={handleDelete}>
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
