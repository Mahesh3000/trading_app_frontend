import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { getHoldings } from "../services/apis";
import useUserSession from "../hooks/useAuth";

const Holdings = () => {
  const navigate = useNavigate();
  const { user } = useUserSession();

  const [holdings, setHoldings] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [profitLossPercent, setProfitLossPercent] = useState(0);

  useEffect(() => {
    if (user?.id) {
      fetchHoldings();
    }
  }, [user]);

  const fetchHoldings = async () => {
    try {
      const response = await getHoldings(user?.id);
      if (!response || response.length === 0) return;

      let totalInvestment = 0;
      let totalQuantity = 0;
      let totalCost = 0;
      let currentMarketPrice = 90000; // Fetch this dynamically in real implementation

      const processedHoldings = response.reduce((acc, trade) => {
        if (trade.trade_type === "buy") {
          const quantity = parseFloat(trade.quantity);
          const priceUsd = parseFloat(trade.price_usd);
          const totalValueUsd = parseFloat(trade.total_value_usd);

          totalInvestment += totalValueUsd;
          totalQuantity += quantity;
          totalCost += priceUsd * quantity;

          if (!acc[trade.coin_id]) {
            acc[trade.coin_id] = {
              coin_id: trade.coin_id,
              quantity: 0,
              invested_amount: 0,
              avg_buy_price: 0,
              current_price: currentMarketPrice,
            };
          }
          acc[trade.coin_id].quantity += quantity;
          acc[trade.coin_id].invested_amount += totalValueUsd;
          acc[trade.coin_id].avg_buy_price =
            acc[trade.coin_id].invested_amount / acc[trade.coin_id].quantity;
        }
        return acc;
      }, {});

      const currentValue = totalQuantity * currentMarketPrice;
      const profitLoss = currentValue - totalInvestment;
      const profitLossPercent = totalInvestment
        ? ((profitLoss / totalInvestment) * 100).toFixed(2)
        : 0;

      setHoldings(Object.values(processedHoldings));
      setTotalInvestment(totalInvestment);
      setCurrentValue(currentValue);
      setProfitLoss(profitLoss);
      setProfitLossPercent(profitLossPercent);
    } catch (error) {
      console.error("Failed to fetch holdings", error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Grid container spacing={2}>
        {/* Total Investment */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total Investment</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              ${totalInvestment.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* Current Value */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Current Value</Typography>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              ${currentValue.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        {/* Total P/L */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ padding: "20px", textAlign: "center", height: "100%" }}>
            <Typography variant="subtitle1">Total P/L</Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: "10px",
                color: profitLoss >= 0 ? "green" : "red",
              }}
            >
              {profitLoss >= 0 ? "+" : "-"} $
              {Math.abs(profitLoss).toLocaleString()}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: profitLoss >= 0 ? "green" : "red" }}
            >
              {profitLossPercent}%
            </Typography>
            {profitLoss >= 0 ? (
              <TrendingUpIcon color="success" />
            ) : (
              <TrendingDownIcon color="error" />
            )}
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
              <IconButton size="small" onClick={fetchHoldings}>
                <RefreshIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              {holdings.length}
            </Typography>
            <Typography variant="body2">Unique Cryptos</Typography>
          </Paper>
        </Grid>

        {/* Your Holdings Table */}
        <Grid item xs={12}>
          <Paper sx={{ padding: "20px" }}>
            {holdings.length > 0 ? (
              <Grid container spacing={2}>
                {holdings.map((holding, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper sx={{ padding: "15px", textAlign: "center" }}>
                      <Typography variant="h6">
                        {holding.coin_id.toUpperCase()}
                      </Typography>
                      <Typography variant="body1">
                        Quantity: {holding.quantity.toFixed(1)}
                      </Typography>
                      <Typography variant="body1">
                        Avg Buy Price: ${holding.avg_buy_price.toLocaleString()}
                      </Typography>
                      <Typography variant="body1">
                        Current Price: ${holding.current_price.toLocaleString()}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color:
                            holding.current_price >= holding.avg_buy_price
                              ? "green"
                              : "red",
                        }}
                      >
                        P/L:{" "}
                        {holding.current_price >= holding.avg_buy_price
                          ? "+"
                          : "-"}
                        $
                        {Math.abs(
                          holding.current_price * holding.quantity -
                            holding.invested_amount
                        ).toLocaleString()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: "center", padding: "20px" }}>
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
                  Explore Cryptos
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Holdings;
