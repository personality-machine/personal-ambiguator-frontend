import React, {useRef, useEffect} from 'react';
import ModelEvaluate from '../apr/modelEvaluate';
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

ChartJS.defaults.font.size = 14;
ChartJS.defaults.font.family = 'monospace';
ChartJS.defaults.font.weight = 'bold';

const ScoreDisplay = ({ocean, oriOcean, setSaliencySrc, imgSrc, cssImgSrc, oriArr, setOriArr, afterArr, setAfterArr, datasetIndex, setDatasetIndex, index, setIndex, model, liveUpdateFlag}) => {
  const plugins = [{
    beforeDraw: function(chart) {
      const ctx = chart.ctx;
      const canvas = chart.canvas;
      const chartArea = chart.chartArea;
  
      // Chart background
      var gradientBack = canvas.getContext("2d").createLinearGradient(255, 255, 255, 1);
      gradientBack.addColorStop(0, "rgba(255,255,255,1)");
  
      ctx.fillStyle = gradientBack;
      ctx.fillRect(chartArea.left, chartArea.bottom,
      chartArea.right - chartArea.left, chartArea.top - chartArea.bottom);
    }
  }];
  const options = {
    responsive: true,
    color: '#000000',
    aspectRatio: 1.5,
    scales:{
      y: {
        max: 100.0,
        min: 0,
        ticks:{
          stepSize: 1,
          color: 'black',
        }
      },
      x: {
        ticks: {
          color: 'black',
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Hiring Based on the "Big 5" 5-factor model of personality',
        color: '#000000',
        font: {
          size: 16,
        }
      },
    },
  };

  const labels = ['Openness', 'Conscientiousness', 'Extroversion',
                  'Agreeableness', 'Neuroticism'];

  const data = {
    labels,
    datasets: [
      {
        type:'line',
        label: 'original',
        data: oriOcean,
        borderColor: 'rgb(25, 79, 156)',
        backgroundColor: 'rgba(25, 79, 156, 0.5)',
        pointHitRadius: 20,
        pointHoverRadius: 12,
        pointHoverBorderWidth: 5,
        tension: 0.2,
        width: 5,
      },
      {
        type:'line',
        label: 'after image edits',
        data: ocean,
        borderColor: 'rgb(79, 132, 103)',
        backgroundColor: 'rgba(79, 132, 103, 0.5)',
        pointHitRadius: 20,
        pointHoverRadius: 12,
        pointHoverBorderWidth: 5,
        tension: 0.2,
      }
    ],
  };
  const chartRef = useRef(null);
  const onClickChart = (event) => {
    const {current : chart} = chartRef;
    if (!chart){
      console.error("!chart");
      return;
    }
    if (liveUpdateFlag) {
      return;
    }
    const element = getElementAtEvent(chart, event);
    if(element.length > 0) {
      const { datasetIndex, index } = element[0];
      setDatasetIndex(datasetIndex);
      setIndex(index);
      }
  }

  useEffect(() => {
    if (datasetIndex !== null && index !== null && liveUpdateFlag === false) {
      switch(data.datasets[datasetIndex].label) {
        case 'original':
          if (oriArr[index].url === ""){
            ModelEvaluate(imgSrc, 'original', oriArr, {setOriArr}, afterArr, {setAfterArr}, model);
          }
          setSaliencySrc(oriArr[index].url);
          break;
        case 'after image edits':
          if (afterArr[index].url === ""){
            ModelEvaluate(cssImgSrc, 'after params', oriArr, {setOriArr}, afterArr, {setAfterArr}, model);
          }
          setSaliencySrc(afterArr[index].url);
          break;
        default:
          console.log('unindentified label');
          break;
      }
    }
  })
  
  return(
    <Line ref={chartRef} options={options} plugins={plugins} data={data} onClick={onClickChart}/>
  );

};

export default ScoreDisplay;
