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

// Helper function to adjust date formatting for different ranges
const formatDateForRange = (timestamp, range) => {
  const date = new Date(timestamp);
  if (range === "1D") {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // Hourly granularity for 1 day
  } else if (range === "1W") {
    return date.toLocaleDateString(); // Daily granularity for 1 week
  } else if (range === "1M") {
    return date.toLocaleDateString(); // Daily granularity for 1 month
  } else if (range === "3M" || range === "6M" || range === "1Y") {
    return `${date.getMonth() + 1}/${date.getDate()}`; // Monthly granularity for 3M, 6M, and 1Y
  } else {
    return date.toLocaleDateString(); // Default for other ranges
  }
};

const DetailsChart = ({ chartData, selectedMetric, selectedRange }) => {
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    if (chartData) {
      const { prices, market_caps, total_volumes } = chartData;

      // Format data for Chart.js
      const labels = prices?.map((item) =>
        formatDateForRange(item[0], selectedRange)
      ); // Adjust the label based on selectedRange
      const priceData = prices?.map((item) => item[1]);
      const marketCapData = market_caps?.map((item) => item[1]);
      const volumeData = total_volumes?.map((item) => item[1]);

      // Select the correct dataset based on `selectedMetric`
      let dataset = {};
      if (selectedMetric === "price") {
        dataset = {
          labels,
          datasets: [
            {
              label: "Price",
              data: priceData,
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              tension: 0.3, // Adjust for smoothness
              pointRadius: 0,
            },
          ],
        };
      } else if (selectedMetric === "market cap") {
        dataset = {
          labels,
          datasets: [
            {
              label: "Market Cap",
              data: marketCapData,
              fill: false,
              borderColor: "rgba(255,99,132,1)",
              tension: 0.3, // Adjust for smoothness
              pointRadius: 0,
            },
          ],
        };
      } else if (selectedMetric === "volume") {
        dataset = {
          labels,
          datasets: [
            {
              label: "Volume",
              data: volumeData,
              fill: false,
              borderColor: "rgba(153,102,255,1)",
              tension: 0.3, // Adjust for smoothness
              pointRadius: 0,
            },
          ],
        };
      }

      setFormattedData(dataset); // Set the dataset for the selected metric
    }
  }, [chartData, selectedMetric, selectedRange]); // Re-run when `chartData`, `selectedMetric`, or `selectedRange` props change

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Format y-axis numbers
          },
        },
        grid: {
          drawBorder: false, // Remove y-axis border
          borderDash: [4, 4], // Create dashed grid lines
          color: "rgba(0, 0, 0, 0.1)", // Light gray grid line color
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true, // Use a square for the legend item
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD", // Or your desired currency
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };
  return (
    <div>
      {formattedData ? (
        <Line
          data={formattedData}
          options={options}
          style={{ width: "100%", height: "400px" }} // Set height and width with inline styles
        />
      ) : (
        <div>Loading chart data...</div>
      )}
    </div>
  );
};

export default DetailsChart;
