import React, { useEffect, useState } from "react";
import { Container, Box, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import PlatformFeatures from "../components/PlatformFeatures";
import Footer from "../components/Footer";
import { fetchCoins } from "../services/apis"; // Import the fetchCoins function from api.js
import Header from "../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // For capturing search input
  const [loading, setLoading] = useState(false); // For tracking loading state
  const [coinData, setCoinData] = useState([]); // Storing fetched coin data
  const [filteredCoins, setFilteredCoins] = useState([]); // Storing filtered coins

  const theme = useTheme();

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCoins([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      fetchCoins(searchTerm)
        .then(setFilteredCoins)
        .catch((err) => console.error("Error fetching coin data:", err))
        .finally(() => setLoading(false));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    document.body.classList.add("dashboard-body");

    return () => {
      document.body.classList.remove("dashboard-body");
    };
  }, []);

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
