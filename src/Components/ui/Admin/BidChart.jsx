import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "MONTH",
      },
    },
    y: {
      title: {
        display: true,
        text: "TOTAL BID AMOUNT (₦)",
      },
    },
  },
};

export function BidChart({ chartData }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const bidsByMonth = chartData.reduce((acc, bid) => {
    const month = formatDate(bid.timestamp);
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += bid.bidAmount;
    return acc;
  }, {});

  const sortedMonths = Object.keys(bidsByMonth)
    .map((month) => new Date(month + " 1"))
    .sort((a, b) => a - b);

  const labels = sortedMonths.map((date) =>
    date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
  );
  const dataPoints = sortedMonths.map(
    (date) =>
      bidsByMonth[
        date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      ],
  );

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Bidding Data Over time",
        data: dataPoints,
        borderColor: "rgb(168 85 247)",
        backgroundColor: "rgb(235, 205, 255, 0.5)",
      },
    ],
  };

  return (
    <div className="col-span-8 bg-white p-3 rounded-lg">
      <Line options={options} data={data} />
    </div>
  );
}
