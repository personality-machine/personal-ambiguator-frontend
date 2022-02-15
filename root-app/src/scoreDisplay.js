import React from 'react';
import { useRef } from 'react';
import { Bar, getElementAtEvent }  from 'react-chartjs-2';
import { alpha, styled } from '@mui/material/styles';
import faker from 'faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

const ScoreDisplay = ({ocean}) => {
  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getElementAtEvent(chartRef.current, event));
  }

  const labels = ['Open', 'Contientious', 'Extroverted', 'Agreeable', 'Neurotic'];

  const data = {
    labels,
    data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
  }
  
  return(
    <Bar
      ref={chartRef}
      data={data}
      onClick={onClick}
    />
  );

};

export default ScoreDisplay;
