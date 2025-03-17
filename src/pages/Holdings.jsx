import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { useNavigate } from "react-router-dom";

const Holdings = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Total Investment */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total Investment</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              ₹0
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e0e0e0",
                marginTop: "10px",
              }}
            />
          </Paper>
        </Grid>

        {/* Current Value */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Current Value</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              ₹0
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e0e0e0",
                marginTop: "10px",
              }}
            />
            {/* <ShowChartIcon
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#9e9e9e",
              }}
            /> */}
          </Paper>
        </Grid>

        {/* Total P/L */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total P/L</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px", color: "green" }}>
              + ₹0
            </Typography>
            <Typography variant="body2" sx={{ color: "green" }}>
              +0.00%
            </Typography>
            {/* <TrendingUpIcon
              sx={{
                // position: "absolute",
                top: "10px",
                right: "10px",
                color: "green",
              }}
            /> */}
          </Paper>
        </Grid>

        {/* Holdings */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">Holdings</Typography>
              <IconButton size="small">
                <RefreshIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              0
            </Typography>
            <Typography variant="body2">Active Positions</Typography>
          </Paper>
        </Grid>

        {/* Your Holdings */}
        <Grid item xs={12}>
          <Paper sx={{ padding: "20px", textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ShowChartIcon sx={{ fontSize: 60, color: "#9e9e9e" }} />
              <Typography variant="h6" sx={{ marginTop: "10px" }}>
                No Holdings Yet
              </Typography>
              <Typography variant="body2" sx={{ marginTop: "5px" }}>
                Start trading to build your portfolio
              </Typography>
              <Button
                variant="contained"
                sx={{ marginTop: "20px" }}
                onClick={() => navigate("/")}
              >
                Explore Stocks
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Holdings;
