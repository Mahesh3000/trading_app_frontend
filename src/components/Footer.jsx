// Footer.jsx
import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff", // White background
        color: "#333", // Darker text color
        padding: "40px 16px", // Increased padding
        textAlign: "left", // Align text to left
        marginTop: "auto",
        borderTop: "1px solid #ddd", // Add top border
      }}
    >
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ marginBottom: "12px" }}>
            About Virtual Trading
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "24px" }}>
            A platform designed to help you learn and practice stock trading
            without financial risk. Start your trading journey today with
            virtual money.
          </Typography>
        </Grid>

        <Grid item xs={12} md={2}>
          <Typography variant="h6" sx={{ marginBottom: "12px" }}>
            Quick Links
          </Typography>
          <Typography variant="body2">
            <Link
              href="/aboutme"
              color="inherit"
              sx={{ display: "block", marginBottom: "8px" }}
            >
              About Me
            </Link>
            <Link
              href="/watchlist"
              color="inherit"
              sx={{ display: "block", marginBottom: "8px" }}
            >
              Watchlist
            </Link>
            <Link href="/holdings" color="inherit" sx={{ display: "block" }}>
              Holdings
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ marginBottom: "12px" }}>
            Connect
          </Typography>
          <Box>
            <IconButton
              aria-label="LinkedIn"
              href="https://www.linkedin.com/in/maheshsivangi/"
              color="inherit"
              sx={{ padding: "4px" }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="GitHub"
              href="https://github.com/Mahesh3000"
              color="inherit"
              sx={{ padding: "4px" }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
