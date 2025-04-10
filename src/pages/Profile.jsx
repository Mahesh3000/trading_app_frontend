import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddFundsModal from "../components/AddFundsModal";
import { addFunds, getHoldings, getProfile } from "../services/apis";
import useUserSession from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import { useSnackbar } from "../context/SnackbarProvider";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserSession(); // Get user from session
  const { showSnackbar } = useSnackbar(); // Use Snackbar Context

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]); // State for trades data
  const [plState, setPlState] = useState({
    totalProfit: 0,
    totalLoss: 0,
    netPL: 0,
    profitLossPercent: 0,
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddFunds = async (amount) => {
    if (!user?.id) {
      console.error("User ID is undefined");
      return;
    }

    try {
      const response = await addFunds(user.id, amount);
      setProfile(response?.user);
      showSnackbar(
        `"Successfully added ${amount} $ to your account!`,
        "success"
      );
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTrades(); // Fetch trade data
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        const userId = user?.id;
        const response = await getProfile(userId);
        setProfile(response);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    setLoading(false);
  };

  const fetchTrades = async () => {
    try {
      if (user?.id) {
        const response = await getHoldings(user.id); // Call the getTrades API
        setTrades(response);
        calculateProfitLoss(response); // Calculate P/L when trades are fetched
      }
    } catch (error) {
      console.error("Error fetching trades:", error);
    }
  };

  const calculateProfitLoss = (trades) => {
    let totalInvestment = 0;
    let totalQuantity = 0;
    let totalCost = 0;
    let totalCurrentValue = 0; // To hold the total current value of the holdings

    // Reduce the trades to process them
    const processedHoldings = trades.reduce((acc, trade) => {
      if (trade.trade_type === "buy") {
        const quantity = parseFloat(trade.quantity);
        const priceUsd = parseFloat(trade.price_usd);
        const totalValueUsd = parseFloat(trade.total_value_usd);
        const currentPrice = parseFloat(trade.current_price); // Use the current price of the coin

        // Update the total investment and quantity
        totalInvestment += totalValueUsd;
        totalQuantity += quantity;

        // Calculate the current value of this holding based on the current price
        totalCurrentValue += currentPrice * quantity;

        if (!acc[trade.coin_id]) {
          acc[trade.coin_id] = {
            coin_id: trade.coin_id,
            quantity: 0,
            invested_amount: 0,
            avg_buy_price: 0,
            current_price: currentPrice, // Storing current price as part of the holding
          };
        }
        acc[trade.coin_id].quantity += quantity;
        acc[trade.coin_id].invested_amount += totalValueUsd;
        acc[trade.coin_id].avg_buy_price =
          acc[trade.coin_id].invested_amount / acc[trade.coin_id].quantity;
      }
      return acc;
    }, {});

    // Calculate the profit or loss from the current value
    const profitLoss = totalCurrentValue - totalInvestment;
    const profitLossPercent = totalInvestment
      ? ((profitLoss / totalInvestment) * 100).toFixed(2)
      : 0;

    // Set the profit/loss state for your page
    setPlState({
      totalProfit: profitLoss > 0 ? profitLoss : 0, // Only show profit if positive
      totalLoss: profitLoss < 0 ? Math.abs(profitLoss) : 0, // Only show loss if negative
      netPL: profitLoss,
      profitLossPercent,
    });
  };

  if (loading) {
    // Display loader while the data is being fetched
    return <LoadingScreen />;
  }
  return (
    <Box sx={{ padding: "20px", width: "100%", height: "100vh" }}>
      <Grid container spacing={2} sx={{ height: "100%" }}>
        {/* Available Balance, Total Profit, Total Loss (First Row) */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">Available Balance</Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ marginLeft: "10px" }}
                onClick={handleOpenModal}
              >
                + Add Funds
              </Button>
              <AddFundsModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onAddFunds={handleAddFunds}
              />
            </Box>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              ${profile?.available_balance}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total Profit</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px", color: "green" }}>
              <ArrowDropUpIcon
                sx={{ verticalAlign: "middle", color: "green" }}
              />{" "}
              ${Math.abs(plState.totalProfit).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total Loss</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px", color: "red" }}>
              <ArrowDropDownIcon
                sx={{ verticalAlign: "middle", color: "red" }}
              />{" "}
              ${plState.totalLoss.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        {/* Profile Details and Transaction History (Second Row) */}
        <Grid item xs={12} md={12}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            {/* Profile Details */}
            <Grid item xs={12} md={3}>
              <Paper sx={{ padding: "20px", height: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontSize: "1.2rem" }}>
                    Profile Details
                  </Typography>
                  <IconButton size="small">
                    <RefreshIcon />
                  </IconButton>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.1rem", marginBottom: "8px" }}
                >
                  Name: {profile?.username}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.1rem", marginBottom: "8px" }}
                >
                  Email: {profile?.email}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "1.1rem" }}>
                  Net P/L: ${Math.abs(plState.netPL).toLocaleString()}
                </Typography>
              </Paper>
            </Grid>

            {/* Transaction History */}
            <Grid item xs={12} md={9}>
              <Paper sx={{ padding: "20px", height: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <Typography variant="subtitle1">
                    Transaction History
                  </Typography>
                  <IconButton size="small">
                    <RefreshIcon />
                  </IconButton>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Stock</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Current Price</TableCell>
                        <TableCell>24h Change %</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {trades.length > 0 ? (
                        trades.map((trade, index) => (
                          <TableRow key={index}>
                            <TableCell>{trade.coin_id}</TableCell>
                            <TableCell>{trade.trade_type}</TableCell>
                            <TableCell>
                              {parseFloat(trade.quantity).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              ${parseFloat(trade.price_usd).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              ${parseFloat(trade.current_price).toFixed(2)}
                            </TableCell>
                            <TableCell
                              sx={{
                                color:
                                  trade.change_percent >= 0 ? "green" : "red",
                              }}
                            >
                              {/* {trade.change_percent >= 0 ? "+" : ""}{" "} */}
                              {trade.change_percent.toFixed(2)}%
                            </TableCell>
                            <TableCell>
                              {new Date(trade.trade_time).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No transactions yet. Your closed trades will appear
                            here.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
