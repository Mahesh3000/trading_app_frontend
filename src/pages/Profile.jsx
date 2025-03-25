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

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserSession(); // Get user from session

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState([]); // State for trades data
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);

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
    let totalBuyValue = 0;
    let totalQuantity = 0;
    let totalSellValue = 0;

    // Selling price (assuming 90,000 USD as an example)
    const sellingPrice = 90000;

    // Loop through the trades and calculate P/L
    trades.forEach((trade) => {
      if (trade.trade_type === "buy") {
        totalBuyValue += trade.total_value_usd;
        totalQuantity += trade.quantity;
      }
    });

    // Assuming we are selling all of the quantity bought at the selling price
    totalSellValue = totalQuantity * sellingPrice;

    // Calculate Profit or Loss
    const profitLossAmount = totalSellValue - totalBuyValue;
    const profitLossPercentage = (profitLossAmount / totalBuyValue) * 100;

    if (profitLossAmount >= 0) {
      setTotalProfit(profitLossAmount);
      setTotalLoss(0);
    } else {
      setTotalProfit(0);
      setTotalLoss(Math.abs(profitLossAmount));
    }

    return profitLossPercentage;
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
              ${totalProfit.toFixed(2)}
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
              ${totalLoss.toFixed(2)}
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
                  Net P/L: ${totalLoss.toFixed(2)}
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
                        <TableCell>Date</TableCell>
                        <TableCell>P/L %</TableCell>
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
                              {new Date(trade.trade_time).toLocaleDateString()}
                            </TableCell>
                            <TableCell
                              sx={{
                                color:
                                  trade.pl_percentage >= 0 ? "green" : "red",
                              }}
                            >
                              {trade.pl_percentage >= 0 ? "+" : "-"}{" "}
                              {Math.abs(trade.pl_percentage)}%
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
