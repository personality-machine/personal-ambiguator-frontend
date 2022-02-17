import {React, useRef} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, getElementAtEvent } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.font.size = 20;
ChartJS.defaults.font.family = 'Courier New';
const ScoreDisplay = ({ocean}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
        type:'line',
        label: 'original',
        data: [3,2,7,3,9],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        type:'line',
        label: 'after params',
        data: ocean,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };
  const chartRef = useRef(null);
  const onClickChart = (event) => {
    const {current : chart} = chartRef;
    if (!chart){
      console.log("!chart");
      return;
    }
    const element = getElementAtEvent(chart, event);
    const { datasetIndex, index } = element[0];
    console.log(data.labels[index], data.datasets[datasetIndex].label, data.datasets[datasetIndex].data[index]);
  }
  
  return(
    <Line ref={chartRef} options={options} data={data} onClick={onClickChart}/>
  );

};

export default ScoreDisplay;
