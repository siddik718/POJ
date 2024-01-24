import React from "react";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Pie } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.weight = "bold";
defaults.plugins.title.color = "#1a1918";
defaults.plugins.title.font.size = 18;



export const BarChart = ({ data, labels }) => {
  const Chart = {
    labels: labels,
    datasets: [
      {
        label: 'Submission Bar',
        data: data,
        backgroundColor: [
          'rgba(13, 148, 19,0.7)',
          'rgba(184, 28, 17, 0.7)',
          'rgba(214, 177, 11, 0.7)',
          'rgba(156, 154, 146, 0.7)',
        ],
        borderColor: [
          'rgba(13, 148, 19,0.7)',
          'rgba(184, 28, 17, 0.7)',
          'rgba(214, 177, 11, 0.7)',
          'rgba(156, 154, 146, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        text: "Submission Stats",
      },
    },
  }


  return <Bar data={Chart} options={options}/>;
}
export const DoughnutChart = ({ data, labels }) => {
  const Chart = {
    labels: labels,
    datasets: [
      {
        label: 'Submission Bar',
        data: data,
        backgroundColor: [
          'rgba(46, 201, 52, 0.6)',
          'rgba(13, 148, 19,0.8)',
          'rgba(46, 133, 184, 0.5)',
          'rgba(9, 45, 66, 0.7)',
          'rgba(173, 93, 23, 0.9)',
        ],
        borderColor: [
          'rgba(46, 201, 52, 0.6)',
          'rgba(13, 148, 19,0.6)',
          'rgba(46, 133, 184, 0.5)',
          'rgba(9, 45, 66, 0.7)',
          'rgba(173, 93, 23, 0.9)',
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        text: "Difficulty Stats",
      },
    },
  }


  return <Doughnut data={Chart} options={options} />;
}
export const PieChart = ({ data, labels }) => {
  const Chart = {
    labels: labels,
    datasets: [
      {
        label: 'Submission Bar',
        data: data,
        backgroundColor: [
          'rgba(0, 47, 108, 0.9)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(248, 152, 32, 0.9)',
        ],
        borderColor: [
          'rgba(5, 150, 19, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    plugins: {
      title: {
        text: "Language Stats",
      },
    },
  }

  return <Pie data={Chart} options={options}/>;
}