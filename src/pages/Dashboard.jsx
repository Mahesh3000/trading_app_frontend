import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Autocomplete,
  CircularProgress,
} from "@mui/material";

const API_KEY = ""; // Replace with your API key

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch company symbols from Alpha Vantage
  const fetchCompanies = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
      );
      const data = await response.json();
      if (data.bestMatches) {
        const formattedData = data.bestMatches.map((item) => ({
          symbol: item["1. symbol"],
          name: item["2. name"],
        }));
        setCompanyList(formattedData);
      } else {
        setCompanyList([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  console.log("companyList", companyList);

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      {/* Heading */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Master Stock Trading Without Risk
      </Typography>

      {/* Explanation */}
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        textAlign="left"
      >
        Track your stocks, manage your watchlist, and monitor holdings in one
        place. Get insights and stay updated with market trends effortlessly.
      </Typography>

      {/* Search Bar with Dropdown */}
      <Box sx={{ mb: 4 }}>
        <Autocomplete
          freeSolo
          options={companyList}
          getOptionLabel={(option) => `${option.name} (${option.symbol})`}
          onInputChange={(event, newValue) => {
            setSearchTerm(newValue);
            fetchCompanies(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for stocks..."
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      </Box>
    </Container>
  );
};

export default Dashboard;
