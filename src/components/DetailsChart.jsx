import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DetailsChart = ({ chartData }) => {
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    if (chartData) {
      const { prices, market_caps, total_volumes } = chartData;

      // Format data for Chart.js
      const labels = prices.map((item) =>
        new Date(item[0]).toLocaleTimeString()
      ); // Convert timestamps to time
      const priceData = prices.map((item) => item[1]);
      const marketCapData = market_caps.map((item) => item[1]);
      const volumeData = total_volumes.map((item) => item[1]);

      setFormattedData({
        labels, // Time labels (formatted as time)
        datasets: [
          {
            label: "Price",
            data: priceData,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.1,
          },
          {
            label: "Market Cap",
            data: marketCapData,
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            tension: 0.1,
          },
          {
            label: "Volume",
            data: volumeData,
            fill: false,
            borderColor: "rgba(153,102,255,1)",
            tension: 0.1,
          },
        ],
      });
    }
  }, [chartData]); // Re-run when `chartData` props change

  return (
    <div>
      {formattedData ? (
        <Line data={formattedData} options={{ responsive: true }} />
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  );
};

export default DetailsChart;

// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Box, Typography } from "@mui/material";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const DetailsChart = ({ chartData, loading }) => {
//   if (loading) {
//     return <Typography variant="h6">Loading chart data...</Typography>;
//   }

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => {
//             return `${context.dataset.label}: ${context.raw}`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         height: 300,
//         border: "1px solid #e0e0e0",
//         borderRadius: "8px",
//         padding: "16px",
//       }}
//     >
//       <Line data={chartData} options={chartOptions} />
//       <Typography variant="caption" align="left" sx={{ mt: 2 }}>
//         Last updated: Mar 16, 2025 22:30
//       </Typography>
//     </Box>
//   );
// };

// export default DetailsChart;
