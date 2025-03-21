import React from "react";
import { TextField, Box, CircularProgress, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  loading,
  suggestions,
}) => {
  const navigate = useNavigate();

  const handleSelect = (selectedCoin) => {
    if (selectedCoin) {
      navigate(`/coin/${selectedCoin?.id}`); // Navigate to coin details page
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Autocomplete
        value={
          suggestions?.find(
            (suggestion) =>
              suggestion?.symbol === searchTerm ||
              suggestion?.name === searchTerm
          ) || null
        }
        onChange={(event, newValue) => {
          handleSelect(newValue);
          setSearchTerm(newValue ? newValue.symbol : "");
          handleSearch(newValue ? newValue.symbol : ""); // Trigger search on selection
        }}
        inputValue={searchTerm}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue);
        }}
        options={suggestions}
        getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
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
      />
      {loading && (
        <CircularProgress color="inherit" size={24} sx={{ marginLeft: 2 }} />
      )}
    </Box>
  );
};

export default SearchBar;

// import React from "react";
// import { TextField, Box, CircularProgress, Autocomplete } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useStock } from "../context/StockContext";

// const SearchBar = ({
//   searchTerm,
//   setSearchTerm,
//   handleSearch,
//   loading,
//   suggestions,
// }) => {
//   const navigate = useNavigate(); // Initialize navigate
//   const { setStockDetails } = useStock(); // Access setStockDetails from context

//   const handleSelect = (selectedItem) => {
//     if (selectedItem) {
//       setStockDetails(selectedItem);
//       navigate(`/stock/${selectedItem?.symbol}`);
//     }
//   };

//   return (
//     <Box sx={{ mb: 4 }}>
//       <Autocomplete
//         value={
//           suggestions?.find(
//             (suggestion) =>
//               suggestion?.symbol === searchTerm ||
//               suggestion?.name === searchTerm
//           ) || null
//         }
//         onChange={(event, newValue) => {
//           handleSelect(newValue);
//           setSearchTerm(newValue ? newValue.symbol : "");
//           handleSearch(newValue ? newValue.symbol : ""); // If you want to trigger a search on selection
//         }}
//         inputValue={searchTerm}
//         onInputChange={(event, newInputValue) => {
//           // Update searchTerm with the input value
//           setSearchTerm(newInputValue);
//         }}
//         options={suggestions}
//         getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Quick Stock Search"
//             variant="outlined"
//             fullWidth
//             placeholder="Search for stocks by name or symbol to start trading"
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         )}
//       />
//       {loading && (
//         <CircularProgress color="inherit" size={24} sx={{ marginLeft: 2 }} />
//       )}
//     </Box>
//   );
// };

// export default SearchBar;
