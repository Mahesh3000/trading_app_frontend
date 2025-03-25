import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import PlatformFeatures from "../components/PlatformFeatures";
import Footer from "../components/Footer";
import { fetchCoins } from "../services/apis"; // Import the fetchCoins function from api.js
import Header from "../components/Header";
const topCoins = [
  { name: "Bitcoin", symbol: "BTC", marketCap: "1 Trillion", price: "$45,000" },
  {
    name: "Ethereum",
    symbol: "ETH",
    marketCap: "500 Billion",
    price: "$3,200",
  },
  {
    name: "Binance Coin",
    symbol: "BNB",
    marketCap: "80 Billion",
    price: "$350",
  },
  { name: "Cardano", symbol: "ADA", marketCap: "70 Billion", price: "$2.50" },
  { name: "Solana", symbol: "SOL", marketCap: "60 Billion", price: "$150" },
  { name: "Ripple", symbol: "XRP", marketCap: "40 Billion", price: "$0.85" },
  { name: "Polkadot", symbol: "DOT", marketCap: "35 Billion", price: "$40" },
  { name: "Dogecoin", symbol: "DOGE", marketCap: "30 Billion", price: "$0.30" },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    marketCap: "25 Billion",
    price: "$0.00007",
  },
  { name: "Avalanche", symbol: "AVAX", marketCap: "20 Billion", price: "$80" },
];
const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // For capturing search input
  const [loading, setLoading] = useState(false); // For tracking loading state
  const [coinData, setCoinData] = useState([]); // Storing fetched coin data
  const [filteredCoins, setFilteredCoins] = useState([]); // Storing filtered coins

  useEffect(() => {
    // If the search term is empty, clear the filteredCoins state
    if (searchTerm.trim() === "") {
      setFilteredCoins([]); // Clear filtered coins if no search term
      return;
    }

    // Filter coins based on the search term
    const filtered = topCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCoins(filtered); // Update the filteredCoins state with the filtered data
  }, [searchTerm]); // This effect will run whenever the search term changes

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Header />
      <Box>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          suggestions={filteredCoins}
        />
      </Box>
      <PlatformFeatures />
      <Footer />
    </Container>
  );
};

export default Dashboard;

// Fetch coin data on initial load and whenever search term changes
// useEffect(() => {
//   const getCoinData = async () => {
//     if (searchTerm.trim() === "") {
//       return; // Prevent API call if search term is empty
//     }
//     setLoading(true); // Set loading to true during the fetch
//     try {
//       console.log("searchTerm", searchTerm);

//       const response = await fetchCoins(searchTerm); // Fetching data from the API
//       setCoinData(response); // Store the fetched coin data
//       setFilteredCoins(response); // Set the initial filtered coins as the full list
//     } catch (error) {
//       console.error("Error fetching coin data:", error); // Handle any errors
//     } finally {
//       setLoading(false); // Set loading to false once the API call is complete
//     }
//   };

//   // Call the API when the component mounts or when search term changes
//   if (searchTerm === "") {
//     setFilteredCoins(coinData); // Show all coins if search term is empty
//   } else {
//     // Filter coins based on the search term
//     const filtered = coinData.filter(
//       (coin) =>
//         coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         coin.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCoins(filtered); // Update filtered coins
//   }

//   getCoinData(); // Call the API whenever search term changes
// }, [searchTerm]); // This will run whenever the search term changes

// console.log("searchTerm", searchTerm);
// useEffect(() => {
//   // Only run the search API if there's a valid search term
//   if (searchTerm.trim() === "") {
//     setFilteredCoins([]); // Clear results if search term is empty
//     return;
//   }

//   const fetchData = async () => {
//     setLoading(true); // Set loading to true while fetching
//     try {
//       const response = await fetchCoins(searchTerm); // API call to fetch data
//       setFilteredCoins(response); // Set the response data to filteredCoins
//     } catch (error) {
//       console.error("Error fetching coin data:", error); // Handle any errors
//     } finally {
//       setLoading(false); // Set loading to false once the API call is complete
//     }
//   };

//   fetchData(); // Call the API whenever searchTerm changes
// }, [searchTerm]); // This will trigger whenever the search term changes
