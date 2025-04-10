import React from "react";
import { TextField, Box, CircularProgress, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ searchTerm, setSearchTerm, loading, suggestions }) => {
  const navigate = useNavigate();

  const handleSelect = (selectedCoin) => {
    if (selectedCoin) {
      navigate(`/coin/${selectedCoin.name.toLowerCase()}`); // Navigate to the coin details page
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Autocomplete
        onChange={(event, newValue) => {
          handleSelect(newValue);
          setSearchTerm(newValue ? newValue.symbol : "");
        }}
        inputValue={searchTerm}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue);
        }}
        options={suggestions}
        getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
        // Use a unique key like `id` or `symbol` for each coin in the dropdown
        renderOption={(props, option) => (
          <li {...props} key={option.id || option.symbol}>
            {option.symbol} - {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Quick Coin Search"
            variant="outlined"
            fullWidth
            placeholder="Search for coins by name or symbol"
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        noOptionsText={loading ? "Loading..." : "No results"} // Show loading when it's in progress
      />
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress size={24} />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
