// MarketStats.jsx
import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const DetailsMarketStatus = ({ coinData }) => {
  const marketStats = {
    dayRange: `${
      coinData?.market_data?.high_24h
        ? `$${coinData?.market_data?.low_24h?.usd} - $${coinData?.market_data.high_24h.usd}`
        : "Data not available"
    }`,
    volume: coinData?.market_data?.total_volume
      ? coinData?.market_data?.total_volume?.usd
      : "Data not available",
    circulating_supply: coinData?.market_data?.circulating_supply
      ? `$${coinData?.market_data?.circulating_supply}`
      : "Data not available",
    rank: coinData?.market_cap_rank
      ? `${coinData?.market_cap_rank}`
      : "Data not available",
  };

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Market Stats
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Day's Range</Typography>
            <Typography variant="body1">{marketStats?.dayRange}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Volume</Typography>
            <Typography variant="body1">{marketStats?.volume}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Circulating Supply:</Typography>
            <Typography variant="body1">
              {marketStats?.circulating_supply}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2">Rank</Typography>
            <Typography variant="body1">{marketStats?.rank}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsMarketStatus;
