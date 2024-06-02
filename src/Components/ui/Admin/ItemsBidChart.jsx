"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const VerticalBarChart = ({ chartData }) => {
  const bidsByCategory = chartData.reduce((acc, bid) => {
    const productCategoryName = bid.productCategoryName;
    if (!acc[productCategoryName]) {
      acc[productCategoryName] = 0;
    }
    acc[productCategoryName] += 1;
    return acc;
  }, {});

  const labels = Object.keys(bidsByCategory);
  const datavalues = Object.values(bidsByCategory);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      datalabels: {
        color: "white",
        font: {
          weight: "bold",
          size: 14,
          family: "poppins",
        },
      },
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Bids By Category",
        data: datavalues,
        backgroundColor: "rgb(168, 85, 247, 0.5)",
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
    ],
  };

  return (
    <div className="mt-5 grid place-items-center overflow-auto rounded-lg max-h-128 bg-white p-3">
      <Bar data={data} options={options} className="flex-1" />
    </div>
  );
};
