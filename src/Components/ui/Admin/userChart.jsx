import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserChart = ({ chartData }) => {
  const users = chartData.reduce((acc, user) => {
    if (!acc[user.role]) {
      acc[user.role] = 0;
    }
    acc[user.role] += 1;
    return acc;
  }, {});

  const data = {
    labels: ["BUYER", "SELLER", "ADMIN"],
    datasets: [
      {
        label: "Number of Users",
        data: [users.BUYER, users.SELLER, users.ADMIN],
        backgroundColor: [
          "rgba(168, 85, 247, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(236, 72, 153, 0.2)",
        ],
        borderColor: [
          "rgba(168, 85, 247, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(236, 72, 153, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-span-4 bg-white p-3 rounded-lg">
      <Doughnut data={data} />
    </div>
  );
};
