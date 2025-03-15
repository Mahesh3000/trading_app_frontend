// Dashboard.jsx
import React, { useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import PlatformFeatures from "../components/PlatformFeatures";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState(null);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      // Logic for fetching stock data
      console.log("Searching for", searchTerm);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Heading */}
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        textAlign="center"
      >
        Master Stock Trading Without Risk
      </Typography>
      {/* Explanation */}
      <Typography
        variant="body1"
        color="textSecondary"
        paragraph
        textAlign="center"
      >
        Track your stocks, manage your watchlist, and monitor holdings in one
        place. Get insights and stay updated with market trends effortlessly.
      </Typography>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => console.log("Start Trading")}
        >
          Start Trading
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => console.log("View Market")}
        >
          View Market
        </Button>
      </Box>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        loading={loading}
      />
      <PlatformFeatures />

      <Footer />
      {stockData ? (
        <>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Stock Data for {searchTerm}
          </Typography>
          <Box>
            {Object.keys(stockData).map((time, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>{time}:</strong> {stockData[time]["1. open"]} USD
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Option to go to stock detail page */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/stock/${searchTerm}`)}
            sx={{ mt: 3 }}
          >
            View Full Details
          </Button>
        </>
      ) : (
        !loading &&
        searchTerm && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            No data found for "{searchTerm}". Please try a different symbol.
          </Typography>
        )
      )}
    </Container>
  );
};

export default Dashboard;

// import { useState } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Box,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const API_KEY = "demo"; // Using the demo key for Alpha Vantage API

// const Dashboard = () => {
//   const [searchTerm, setSearchTerm] = useState(""); // For the search bar input
//   const [loading, setLoading] = useState(false); // Loading state
//   const [stockData, setStockData] = useState(null); // To store stock data fetched from API
//   const [companySymbol, setCompanySymbol] = useState(""); // Store selected company symbol
//   const navigate = useNavigate(); // Navigation for routing to stock details page

//   // Fetch intraday stock data from Alpha Vantage API
//   const fetchStockData = async (symbol) => {
//     console.log("symbol", symbol);

//     if (!symbol) return;
//     setLoading(true);
//     try {
//       const response = await fetch(
//         `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
//       );
//       const data = await response.json();

//       if (data["Time Series (5min)"]) {
//         setStockData(data["Time Series (5min)"]);
//         setCompanySymbol(symbol); // Store the symbol for display purposes
//       } else {
//         setStockData(null);
//       }
//     } catch (error) {
//       console.error("Error fetching stock data:", error);
//       setStockData(null);
//     }
//     setLoading(false);
//   };

//   const handleSearch = (event) => {
//     if (event.key === "Enter" && searchTerm) {
//       fetchStockData(searchTerm);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       {/* Heading */}
//       <Typography
//         variant="h3"
//         fontWeight="bold"
//         gutterBottom
//         textAlign="center"
//       >
//         Master Stock Trading Without Risk
//       </Typography>

//       {/* Explanation */}
//       <Typography
//         variant="body1"
//         color="textSecondary"
//         paragraph
//         textAlign="center"
//       >
//         Track your stocks, manage your watchlist, and monitor holdings in one
//         place. Get insights and stay updated with market trends effortlessly.
//       </Typography>

//       <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={() => navigate("/")}
//         >
//           Start Trading
//         </Button>
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={() => navigate("/watchlist")}
//         >
//           View Market
//         </Button>
//       </Box>
//       {/* Search Bar */}
//       <Box sx={{ mb: 4, mt: 3 }}>
//         <TextField
//           label="Search for stocks..."
//           variant="outlined"
//           fullWidth
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleSearch}
//         />
//         {loading && (
//           <CircularProgress color="inherit" size={24} sx={{ marginLeft: 2 }} />
//         )}
//       </Box>

//       {/* Stock Data or Error Handling */}
//       {stockData ? (
//         <>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             Stock Data for {companySymbol}
//           </Typography>
//           {/* Display a sample of stock data */}
//           <Box>
//             {Object.keys(stockData).map((time, index) => (
//               <Box key={index} sx={{ mb: 2 }}>
//                 <Typography variant="body1">
//                   <strong>{time}:</strong> {stockData[time]["1. open"]} USD
//                 </Typography>
//               </Box>
//             ))}
//           </Box>

//           {/* Option to go to stock detail page */}
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => navigate(`/stock/${companySymbol}`)}
//             sx={{ mt: 3 }}
//           >
//             View Full Details
//           </Button>
//         </>
//       ) : (
//         !loading &&
//         searchTerm && (
//           <Typography variant="body1" color="error" sx={{ mt: 2 }}>
//             No data found for "{searchTerm}". Please try a different symbol.
//           </Typography>
//         )
//       )}
//     </Container>
//   );
// };

// export default Dashboard;
