import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    login();
    console.log("Signing up with:", formData);
    // Implement sign-up logic here
    navigate("/dashboard"); // Redirect after signup
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            type="text"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            variant="outlined"
            value={formData.confirmPassword}
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
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2">
            Already have an account?{" "}
            <Button
              onClick={() => navigate("/signin")}
              sx={{ textTransform: "none" }}
            >
              Sign In
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
