import React, {useRef, useEffect} from 'react';
import ModelEvaluate from './modelEvaluate';
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
ChartJS.defaults.font.family = 'monospace';
const ScoreDisplay = ({ocean, oriOcean, setSaliencySrc, imgSrc, cssImgSrc, oriArr, setOriArr, afterArr, setAfterArr, datasetIndex, setDatasetIndex, index, setIndex}) => {
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
        label: 'after params',
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
    const element = getElementAtEvent(chart, event);
    if(element.length > 0) {
      const { datasetIndex, index } = element[0];
      setDatasetIndex(datasetIndex);
      setIndex(index);
      // let saliencyPath = new String('saliency/');
      // saliencyPath = saliencyPath.concat(data.labels[index]).concat(".png");
      // setSaliencySrc(saliencyPath.toLowerCase());
      // console.log(data.labels[index], data.datasets[datasetIndex].label, data.datasets[datasetIndex].data[index]);
    }
  }

  useEffect(() => {
    if (datasetIndex !== null && index !== null){
      switch(data.datasets[datasetIndex].label) {
        case 'original':
          if (oriArr[index].url === ""){
            ModelEvaluate(imgSrc, 'original', oriArr, {setOriArr}, afterArr, {setAfterArr});
          }
          setSaliencySrc(oriArr[index].url);
          break;
        case 'after params':
          if (afterArr[index].url === ""){
            ModelEvaluate(cssImgSrc, 'after params', oriArr, {setOriArr}, afterArr, {setAfterArr});
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
    <Line ref={chartRef} options={options} data={data} onClick={onClickChart}/>
  );

};

export default ScoreDisplay;
