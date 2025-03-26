import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Import the outlined star icon
import { getWatchlist, deleteFromWatchlist } from "../services/apis"; // Import delete API
import useUserSession from "../hooks/useAuth";
import { useLoading } from "../context/LoadingContext";
import LoadingScreen from "../components/LoadingScreen";

const Watchlist = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useUserSession(); // Get user from session
  const [watchlist, setWatchlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchWatchlist = async () => {
      setLoading(true);
      try {
        const data = await getWatchlist(user?.id);
        setWatchlist(data);
      } catch (error) {
        setError("Error fetching watchlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [user?.id]);

  const handleViewDetails = useCallback(
    (id) => {
      navigate(`/coin/${id?.toLowerCase()}`);
    },
    [navigate]
  );

  const handleDelete = async (coinID) => {
    try {
      await deleteFromWatchlist(user?.id, coinID);
      setWatchlist(
        (prevWatchlist) =>
          prevWatchlist.filter((stock) => stock.coin_id !== coinID) // Use coin_id
      );
    } catch (error) {
      console.error("Error deleting stock from watchlist", error);
      setError("Error deleting stock");
    }
  };

  if (loading) {
    // Display loader while the data is being fetched
    return <LoadingScreen />;
  }

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

      {loading ? (
        <Typography>Loading watchlist...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : watchlist.length === 0 ? (
        // Render this if the watchlist is empty
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
          }}
        >
          <StarBorderIcon sx={{ fontSize: 60, color: "action.disabled" }} />
          <Typography variant="h6" sx={{ mt: 2, color: "text.secondary" }}>
            Your watchlist is empty
          </Typography>
          <Typography
            sx={{ mt: 1, color: "text.secondary", textAlign: "center" }}
          >
            Start adding coins to track their performance
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => navigate("/")}
          >
            Explore Stocks
          </Button>
        </Box>
      ) : (
        watchlist.map((stock, index) => (
          <Paper key={index} sx={{ padding: "20px", marginBottom: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {stock.symbol}
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {stock.company_name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ marginRight: "10px" }}
                >
                  {stock.current_price}
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ marginRight: "10px", ml: 3 }}
                  color={
                    stock.change_percent > 0 ? "success.main" : "error.main"
                  }
                >
                  {stock.change_percent > 0 ? "↑" : "↓"}{" "}
                  {stock?.change_percent?.toFixed(2)}%
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  sx={{ marginRight: "10px", ml: 3 }}
                  onClick={() => handleViewDetails(stock.coin_id)}
                >
                  View Details
                </Button>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(stock.coin_id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default Watchlist;
