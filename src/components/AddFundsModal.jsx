import React, { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddFundsModal = ({ open, onClose, onAddFunds }) => {
  const [amount, setAmount] = useState("");

  const handleAmountChange = (event) => {
    const input = event.target.value;
    const regex = /^[0-9]*$/;

    if (regex.test(input)) {
      setAmount(input);
    }
  };

  const handleAddFundsClick = () => {
    setAmount("");
    onAddFunds(amount); // Call the onAddFunds prop to notify parent
    onClose(); // Close the modal
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="add-funds-modal-title"
        aria-describedby="add-funds-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 350, // Adjust width as needed
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 3,
            borderRadius: 2, // Optional: Add border radius for a smoother look
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography id="add-funds-modal-title" variant="h6" component="h2">
              Add Balance
            </Typography>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Amount
          </Typography>
          <TextField
            label="Enter amount"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleAddFundsClick}>
            Add Balance
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddFundsModal;
