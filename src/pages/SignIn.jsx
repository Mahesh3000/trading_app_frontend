import { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "../context/SnackbarProvider";
import { loginUser } from "../services/apis";
import useUserSession from "../hooks/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showSnackbar } = useSnackbar(); // Use Snackbar Context
  const { saveAuthData } = useUserSession(); // Use the custom hook

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data (username/email and password)
    if (!formData.email || !formData.password) {
      console.log("Please fill in both fields.");
      return;
    }

    try {
      const response = await loginUser(formData);

      if (response?.token) {
        const { token, user } = response;

        login();
        saveAuthData(user, token);

        showSnackbar("Successfully signed in!", "success");

        navigate("/");
      } else {
        console.log("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      showSnackbar("Login failed. Please try again.", "error"); // Show error message
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensures centering on full screen
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, width: "100%", maxWidth: 400, textAlign: "center" }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Don't have an account?{" "}
            <Button
              onClick={() => navigate("/signup")}
              sx={{ textTransform: "none" }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
