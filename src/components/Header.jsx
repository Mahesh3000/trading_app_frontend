import React from "react";
import { Typography, Box, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeMenu from "./ThemeMenu ";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      {/* Theme Icon Button on the Top Right */}
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <ThemeMenu />
      </Box>

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
        sx={{ maxWidth: 600 }}
      >
        Track your stocks, manage your watchlist, and monitor holdings in one
        place. Get insights and stay updated with market trends effortlessly.
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          Start Trading
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/watchlist")}
        >
          View Market
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
