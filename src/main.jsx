import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// <Box>
// <Box
//   sx={{
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     mb: 2,
//   }}
// >
//   <Box sx={{ display: "flex", alignItems: "center", mb: 2, mr: 1 }}>
//     {/* Metric Selection */}
//     <Box>
//       {["Price", "Volume", "Combined"].map((metric) => (
//         <Button
//           key={metric}
//           variant={
//             selectedMetric === metric.toLowerCase()
//               ? "contained"
//               : "outlined"
//           }
//           onClick={() => setSelectedMetric(metric.toLowerCase())}
//           sx={{ mr: 1 }} // Remove right margin
//         >
//           {metric}
//         </Button>
//       ))}
//     </Box>

//     {/* Time Range Selection */}
//     <Box>
//       {["1D", "1W", "1M", "3M", "6M", "YTD", "1Y"].map((range) => (
//         <Button
//           key={range}
//           variant={selectedRange === range ? "contained" : "outlined"}
//           onClick={() => {
//             setSelectedRange(range);
//             fetchStockData(range);
//           }}
//           sx={{ ml: 1 }} // Remove left margin
//         >
//           {range}
//         </Button>
//       ))}
//     </Box>
//   </Box>
// </Box>

// <Grid container spacing={3}>
//   <Grid item xs={12} md={8}>
//     <Box
//       sx={{
//         height: 300,
//         border: "1px solid #e0e0e0",
//         borderRadius: "8px",
//         padding: "16px",
//       }}
//     >
//       <Line data={chartData} options={chartOptions} />
//       <Typography variant="caption" align="left">
//         Last updated: Mar 16, 2025 22:30
//       </Typography>
//     </Box>
//   </Grid>

//   <Grid item xs={12} md={4}>
//     <Box sx={{ padding: "16px" }}>
//       <Typography variant="h6" gutterBottom>
//         Market Stats
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Box
//             sx={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <Typography variant="subtitle2">Day's Range</Typography>
//             <Typography variant="body1">
//               {marketStats.dayRange}
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Box
//             sx={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <Typography variant="subtitle2">Volume</Typography>
//             <Typography variant="body1">
//               {marketStats.volume}
//             </Typography>
//           </Box>
//         </Grid>
//         <Grid item xs={12}>
//           <Box
//             sx={{ display: "flex", justifyContent: "space-between" }}
//           >
//             <Typography variant="subtitle2">Face Value</Typography>
//             <Typography variant="body1">
//               {marketStats.faceValue}
//             </Typography>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   </Grid>
// </Grid>
// </Box>
