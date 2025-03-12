import { useState } from "react";
import { TextField, CircularProgress, Autocomplete, Box } from "@mui/material";

const SearchBar = ({ fetchCompanies, companyList, loading, setSearchTerm }) => {
  return (
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
            label="Enter company name or symbol"
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
  );
};

export default SearchBar;
