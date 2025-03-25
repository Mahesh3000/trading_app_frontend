import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Grid,
} from "@mui/material";
import { tradeCoin } from "../services/apis";
import useUserSession from "../hooks/useAuth";
import { useSnackbar } from "../context/SnackbarProvider";
import { useNavigate } from "react-router-dom";

const TradeModal = ({ coinData }) => {
  const navigate = useNavigate();
  const { user } = useUserSession();
  const { showSnackbar } = useSnackbar(); // Use Snackbar Context

  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const currentPrice = coinData?.market_data?.current_price?.usd; // Replace with actual current price
  const [totalValue, setTotalValue] = useState(0);

  const handleOpenTradeModal = () => {
    if (!user?.id) {
      navigate("/signin"); // Redirect user to sign-in page
      return;
    }
    setIsTradeModalOpen(true);
  };

  const handleCloseTradeModal = () => {
    setIsTradeModalOpen(false);
    setQuantity("");
    setTotalValue(0);
  };

  const handleTradeTypeChange = (event) => {
    setTradeType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    setTotalValue(qty * currentPrice);
  };

  const handleTradeClick = async () => {
    // Implement your trade logic here
    if (!user?.id) {
      navigate("/signin"); // Redirect user to sign-in page
      return;
    }

    await tradeCoin(coinData?.id, user?.id, tradeType, quantity, currentPrice);

    showSnackbar(
      `Successfully ${tradeType === "buy" ? "bought" : "sold"} ${quantity} ${
        coinData?.id
      }!`,
      "success"
    ); // Show Snackbar

    handleCloseTradeModal();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpenTradeModal}>
        Trade
      </Button>

      <Modal
        open={isTradeModalOpen}
        onClose={handleCloseTradeModal}
        aria-labelledby="trade-modal-title"
        aria-describedby="trade-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography id="trade-modal-title" variant="h6" component="h2">
                Trade {coinData?.name}
              </Typography>
              <Button onClick={handleCloseTradeModal}>X</Button>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                aria-label="trade-type"
                name="trade-type"
                value={tradeType}
                onChange={handleTradeTypeChange}
                row
              >
                <FormControlLabel value="buy" control={<Radio />} label="Buy" />
                <FormControlLabel
                  value="sell"
                  control={<Radio />}
                  label="Sell"
                />
              </RadioGroup>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Current Price</Typography>
              <Typography>
                ${coinData?.market_data?.current_price?.usd}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Enter quantity"
                variant="outlined"
                fullWidth
                value={quantity}
                onChange={handleQuantityChange}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography>Total Value</Typography>
              <Typography>${totalValue.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleTradeClick}
                sx={{
                  backgroundColor: tradeType === "buy" ? "green" : "red",
                  "&:hover": {
                    backgroundColor:
                      tradeType === "buy" ? "darkgreen" : "darkred",
                  },
                }}
              >
                {tradeType === "buy"
                  ? `Buy ${coinData?.name}`
                  : `Sell ${coinData?.name}`}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default TradeModal;
