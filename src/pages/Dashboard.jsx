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
    if (searchTerm.trim() === "") {
      setFilteredCoins([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetchCoins(searchTerm);
        setFilteredCoins(response);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // Delay API call by 500ms

    return () => clearTimeout(timer); // Clear timeout on every keystroke
  }, [searchTerm]);

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
