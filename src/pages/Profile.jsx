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
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddFundsModal from "../components/AddFundsModal";
import { addFunds, getProfile } from "../services/apis";
import useUserSession from "../hooks/useAuth";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserSession(); // Get user from session
  // console.log("user", user);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      if (user?.id) {
        // console.log("logging");
        const userId = user?.id;
        const response = await getProfile(userId);
        setProfile(response);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Available Balance, Total Profit, Total Loss (First Row) */}
        <Grid item xs={12} md={3}>
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

        <Grid item xs={12} md={2}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total Profit</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px", color: "green" }}>
              <ArrowDropUpIcon
                sx={{ verticalAlign: "middle", color: "green" }}
              />{" "}
              $0.00
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={2}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total Loss</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px", color: "red" }}>
              <ArrowDropDownIcon
                sx={{ verticalAlign: "middle", color: "red" }}
              />{" "}
              $0.00
            </Typography>
          </Paper>
        </Grid>

        {/* Profile Details (Second Row) */}
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
              <Typography variant="subtitle1">Profile Details</Typography>
              <IconButton size="small">
                <RefreshIcon />
              </IconButton>
            </Box>
            <Typography variant="body2">Name: {profile?.username}</Typography>
            <Typography variant="body2">Email: {profile?.email}</Typography>
            <Typography variant="body2">Net P/L: ₹0.00</Typography>
          </Paper>
        </Grid>

        {/* Transaction History (Second Row) */}
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
              <Typography variant="subtitle1">Transaction History</Typography>
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
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No transactions yet. Your closed trades will appear here.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
