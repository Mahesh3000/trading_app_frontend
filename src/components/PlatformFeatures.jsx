import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import {
  AccessTime,
  DataUsage,
  TrendingUp,
  School,
  WatchLater,
  Shield,
} from "@mui/icons-material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp"; // Assuming this icon is suitable for Watchlist
import AssessmentIcon from "@mui/icons-material/Assessment"; // Assuming this icon is suitable for Portfolio Overview
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const features = [
  {
    label: "Virtual Portfolio",
    description: "Start with ₹10,00,000 virtual money to practice trading",
    icon: <AccessTime />,
  },
  {
    label: "Real-Time Data",
    description: "Access live market data and real-time stock prices",
    icon: <DataUsage />,
  },
  {
    label: "Performance Analytics",
    description: "Track your trading performance with detailed analytics",
    icon: <TrendingUp />,
  },
  {
    label: "Learning Resources",
    description: "Access educational content to improve your trading skills",
    icon: <School />,
  },
  {
    label: "Watchlist",
    description: "Monitor your favorite stocks in one place",
    icon: <WatchLater />,
  },
  {
    label: "Risk-Free Practice",
    description: "Learn and experiment without financial risk",
    icon: <Shield />,
  },
];

const PlatformFeatures = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Platform Features
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  border: "1px solid #e0e0e0", // Add a thin border
                  boxShadow: "none", // Remove shadow
                  borderRadius: "8px", // Add rounded corners
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "32px", // Increase padding for better spacing
                  }}
                >
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      marginBottom: 2,
                      backgroundColor: "transparent", // Set background to transparent
                      borderRadius: "50%", // Ensure it's circular
                      color: "primary.main", // Add primary color to the icon
                    }}
                  >
                    {feature.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {feature.label}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Get Started
        </Typography>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ maxWidth: "800px" }}
        >
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%", // Ensure cards stretch to same height
                padding: "20px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "100px", // Set a fixed height for uniformity
              }}
              onClick={() => navigate("/watchlist")}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUpIcon
                  sx={{ marginRight: "10px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    View Watchlist
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Track your favorite stocks and monitor market movements
                  </Typography>
                </Box>
              </Box>
              {/* <ArrowForwardIosIcon sx={{ color: "text.secondary" }} /> */}
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%", // Ensure cards stretch to same height
                padding: "20px",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                height: "100px", // Set a fixed height for uniformity
              }}
              onClick={() => navigate("/holdings")}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AssessmentIcon
                  sx={{ marginRight: "10px", color: "primary.main" }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Portfolio Overview
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Check your holdings and trading performance
                  </Typography>
                </Box>
              </Box>
              {/* <ArrowForwardIosIcon sx={{ color: "text.secondary" }} /> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PlatformFeatures;
