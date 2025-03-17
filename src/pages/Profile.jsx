import React from "react";
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

const Profile = () => {
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
              >
                + Add Funds
              </Button>
            </Box>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              $100000.00
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
            <Typography variant="body2">Name: kjdnhkj</Typography>
            <Typography variant="body2">Email: qqqqqqq@qqq.qqq</Typography>
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
