import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.font.size = 20;
const ScoreDisplay = () => {
  const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Big 5 charts',
      },
    },
  };

  const labels = ['Open', 'Contientious', 'Extroverted', 'Agreeable', 'Neurotic'];

  const data = {
    labels,
    datasets: [
      {
        label: 'original',
        data: [1,1,2,3,4],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'after params',
        data: [3,4,7,9,9],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };
  
  return(
    <Bar options={options} data={data} />
  );

};

export default ScoreDisplay;
