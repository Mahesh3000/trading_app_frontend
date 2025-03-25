// MarketStats.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const DetailsMarketStatus = ({ marketStats }) => {
  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Market Stats
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Day's Range</Typography>
            <Typography variant="body1">{marketStats.dayRange}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Volume</Typography>
            <Typography variant="body1">{marketStats.volume}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Face Value</Typography>
            <Typography variant="body1">{marketStats.faceValue}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsMarketStatus;
