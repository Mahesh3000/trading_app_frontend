import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
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

  // Fetch coin data on initial load and whenever search term changes
  useEffect(() => {
    const getCoinData = async () => {
      if (searchTerm.trim() === "") {
        return; // Prevent API call if search term is empty
      }
      setLoading(true); // Set loading to true during the fetch
      try {
        const response = await fetchCoins(searchTerm); // Fetching data from the API
        setCoinData(response); // Store the fetched coin data
        setFilteredCoins(response); // Set the initial filtered coins as the full list
      } catch (error) {
        console.error("Error fetching coin data:", error); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false once the API call is complete
      }
    };

    // Call the API when the component mounts or when search term changes
    if (searchTerm === "") {
      setFilteredCoins(coinData); // Show all coins if search term is empty
    } else {
      // Filter coins based on the search term
      const filtered = coinData.filter(
        (coin) =>
          coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCoins(filtered); // Update filtered coins
    }

    getCoinData(); // Call the API whenever search term changes
  }, [searchTerm]); // This will run whenever the search term changes

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Header />
      <Box>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          loading={loading}
          suggestions={filteredCoins} // Pass the filtered coins data to the SearchBar component
        />
      </Box>
      <PlatformFeatures />
      <Footer />
    </Container>
  );
};

export default Dashboard;
