// DetailsHeader.jsx
import React from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TradeModal from "../components/TradeModal"; // Import the TradeModal component

const DetailsHeader = ({
  stockDatas,
  symbol,
  coinData,
  handleAddToWatchlist,
}) => {
  console.log("coinData", coinData?.market_data?.current_price?.usd);

  const last_price = coinData?.market_data?.current_price?.usd;
  const change_price = coinData?.market_data?.ath_change_percentage?.usd;
  const low_price = coinData?.market_data?.low_24h?.usd;
  const hign_price = coinData?.market_data?.high_24h?.usd;

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {coinData?.name.toUpperCase()}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {coinData?.symbol.toUpperCase()}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <TradeModal /> {/* Render the TradeModal component here */}
        <Button
          variant="outlined"
          startIcon={<StarBorderIcon />}
          sx={{ ml: 2 }}
          onClick={handleAddToWatchlist}
        >
          Add to Watchlist
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Last Price
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {/* ₹{stockDatas?.lastPrice} */}
                {/* {coinData?.market_data?.current_price?.usd} */}
                {last_price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Change
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                color={change_price > 0 ? "success.main" : "error.main"}
              >
                {change_price > 0 ? "↑" : "↓"} {change_price}%
                {/* {change_price} */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Low
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {/* ₹{stockDatas?.open} */}
                {low_price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                High
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {/* ₹{stockDatas?.previousClose} */}
                {hign_price}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailsHeader;
