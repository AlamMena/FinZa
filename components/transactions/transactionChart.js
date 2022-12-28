import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },

  elements: {
    line: {
      borderColor: "#000000",
      borderWidth: 1,
      tension: 0.2,
    },
    point: {
      radius: 0,
    },
  },
  tooltips: {
    enabled: false,
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,

      grid: {
        display: false,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function TransactionChart({ transactions }) {
  return (
    <div className="w-40 px-4">
      <Line
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "",
              data: transactions,
              borderRadius: Number.MAX_VALUE,
              borderSkipped: true,
            },
          ],
        }}
      />
    </div>
  );
}
