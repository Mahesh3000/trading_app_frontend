// components/SearchBar.jsx
import React from "react";
import { TextField, Box, CircularProgress } from "@mui/material";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, loading }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Quick Stock Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleSearch}
        placeholder="Search for stocks by name or symbol to start trading"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {loading && (
        <CircularProgress color="inherit" size={24} sx={{ marginLeft: 2 }} />
      )}
    </Box>
  );
};

export default SearchBar;
