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

const TradeModal = () => {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState("buy");
  const [quantity, setQuantity] = useState("");
  const currentPrice = 68.89; // Replace with actual current price
  const [totalValue, setTotalValue] = useState(0);

  const handleOpenTradeModal = () => {
    setIsTradeModalOpen(true);
  };

  const handleCloseTradeModal = () => {
    setIsTradeModalOpen(false);
  };

  const handleTradeTypeChange = (event) => {
    setTradeType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const qty = event.target.value;
    setQuantity(qty);
    setTotalValue(qty * currentPrice);
  };

  const handleBuyClick = () => {
    // Implement your trade logic here
    console.log("Trade:", tradeType, quantity, totalValue);
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
                Trade AAATECH
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
              <Typography>₹{currentPrice.toFixed(2)}</Typography>
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
              <Typography>₹{totalValue.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleBuyClick}>
                Buy AAATECH
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default TradeModal;
