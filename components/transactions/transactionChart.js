import React from "react";
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
  scales: {
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
        color:'rgb(255,255,255,1)'
      },
     
    },
    x: {
        ticks: {
          display: true,
        },
        grid: {
          display: true,
          color:'rgb(100,100,100)'
        },
       
      },
  },
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 120, max: 180 })),
      borderColor: "rgb(216 180 254)",
      backgroundColor: "black",
    },
  ],
};

export default function TransactionChart() {
  return (
    <div className=" my-8">
      <Line options={options} data={data} />
    </div>
  );
}
