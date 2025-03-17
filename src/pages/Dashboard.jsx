import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component
import PlatformFeatures from "../components/PlatformFeatures";
import Footer from "../components/Footer";
import { fetchScrips } from "../services/apis"; // Import the fetchScrips function from api.js
import Header from "../components/Header";
import StockCard from "../components/StockCard";

// Sample static stock data
const searchItems = [
  {
    symbol: "A",
    name: "Agilent Technologies Inc",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "1999-11-18",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AA",
    name: "Alcoa Corp",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2016-10-18",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAA",
    name: "ALTERNATIVE ACCESS FIRST PRIORITY CLO BOND ETF ",
    exchange: "NYSE ARCA",
    assetType: "ETF",
    ipoDate: "2020-09-09",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAAU",
    name: "Goldman Sachs Physical Gold ETF",
    exchange: "BATS",
    assetType: "ETF",
    ipoDate: "2018-08-15",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AACBU",
    name: "Artius II Acquisition Inc - Units (1 Ord Shs & 1 Rts)",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "2025-02-13",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AACG",
    name: "ATA Creativity Global",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "2008-01-29",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AACT",
    name: "Ares Acquisition Corporation II - Class A",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2023-06-12",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AACT-U",
    name: "Ares Acquisition Corporation II - Units (1 Ord Class A & 1/2 War)",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2023-04-21",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AACT-WS",
    name: "Ares Acquisition Corporation II - Warrants (01/01/9999)",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2023-06-12",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AADI",
    name: "Aadi Bioscience Inc",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "2017-08-08",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AADR",
    name: "ADVISORSHARES DORSEY WRIGHT ADR ETF ",
    exchange: "NASDAQ",
    assetType: "ETF",
    ipoDate: "2010-07-21",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAL",
    name: "American Airlines Group Inc",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "2005-09-27",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAM",
    name: "AA Mission Acquisition Corp - Class A",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2024-09-16",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAM-U",
    name: "AA Mission Acquisition Corp - Units (1 Ord Share Class A & 1/2 War)",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2024-08-01",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAM-WS",
    name: "AA Mission Acquisition Corp Warrants each whole warrant entitles the holder to purchase one Class A ordinary share at a price of 11.50 per share",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2024-09-16",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAME",
    name: "Atlantic American Corp",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "1984-09-07",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAMI",
    name: "BrightSphere Investment Group Inc",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2018-03-26",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAOI",
    name: "Applied Optoelectronics Inc",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "2013-09-26",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAON",
    name: "AAON Inc",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "1992-12-16",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAP",
    name: "Advance Auto Parts Inc",
    exchange: "NYSE",
    assetType: "Stock",
    ipoDate: "2001-11-29",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAPB",
    name: "GRANITESHARES 1.75X LONG AAPL DAILY ETF ",
    exchange: "NASDAQ",
    assetType: "ETF",
    ipoDate: "2022-08-09",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAPD",
    name: "DIREXION DAILY AAPL BEAR 1X SHARES ",
    exchange: "NASDAQ",
    assetType: "ETF",
    ipoDate: "2022-08-09",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAPG",
    name: "Ascentage Pharma Group International",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "2025-01-24",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAPGV",
    name: "Ascentage Pharma Group International American Depository Shares",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "2025-01-24",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc",
    exchange: "NASDAQ",
    assetType: "Stock",
    ipoDate: "1980-12-12",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAPR",
    name: "Innovator Equity Defined Protection ETF - 2 Yr to April 2026",
    exchange: "BATS",
    assetType: "ETF",
    ipoDate: "2024-04-01",
    delistingDate: "null",
    status: "Active",
  },
  {
    symbol: "AAPU",
    name: "DIREXION DAILY AAPL BULL 1.5X SHARES ",
    exchange: "NASDAQ",
    assetType: "ETF",
    ipoDate: "2022-08-09",
    delistingDate: "null",
    status: "Active",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [filteredStocks, setFilteredStocks] = useState(searchItems);

  useEffect(() => {
    const getStockData = async () => {
      setLoading(true);
      try {
        const response = searchItems;
        // await fetchScrips(searchTerm);
        setStockData(response); // Assuming response contains the list of stocks
        setFilteredStocks(response); // Display all stocks initially
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    getStockData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleSearch = (e) => {
    // Dynamically filter the list of stocks based on the search term
    const filtered = searchItems.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStocks(filtered);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredStocks(searchItems); // If search term is empty, show all
    } else {
      handleSearch(); // Trigger search on searchTerm change
    }
  }, [searchTerm]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Header />
      <Box>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          loading={loading}
          suggestions={filteredStocks} // Pass filtered stocks to SearchBar
        />
      </Box>

      <PlatformFeatures />
      <Footer />
    </Container>
  );
};

export default Dashboard;

// {stockData ? (
//   <>
//     <Typography variant="h6" fontWeight="bold" gutterBottom>
//       Stock Data for {searchTerm}
//     </Typography>
//     <Box>
//       {Object.keys(stockData).map((time, index) => (
//         <Box key={index} sx={{ mb: 2 }}>
//           <Typography variant="body1">
//             <strong>{time}:</strong> {stockData[time]["1. open"]} USD
//           </Typography>
//         </Box>
//       ))}
//     </Box>

{
  /* Option to go to stock detail page */
}
{
  /* <Button
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
)} */
}
