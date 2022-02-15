import React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { alpha, styled } from '@mui/material/styles';

const ScoreDisplay = ({ocean}) => {
  const [isShown, setIsShown] = React.useState(false);

  const ResultSlider = styled(Slider)
  `
  width: 18px;
  color: #5bb2c5;
  thumb {
    color: #5bb2c500;
  }
  
  :hover {
    color: #8be9fd;
  }
  `;

  const style = {
    openScore: {
      // color: "#8be900",
    },
    constientiousScore: {
      color: '#7da7b0',
      '&:hover': {
        color: '#ffffff',
      },
    },
    extrovertedScore: {
      color: '#7da7b0',
      '&:hover': {
        color: '#ffffff',
      },
    },
    agreeableScore: {
      color: '#7da7b0',
      '&:hover': {
        color: '#ffffff',
      },
    },
    neuroticismScore: {
      color: '#7da7b0',
      '&:hover': {
        color: '#ffffff',
      },
    },
  }

  return(
    <Stack spacing={5} direction="row" height='100%' justifyContent="center">
    <ResultSlider
      style={style.openScore}
      orientation="vertical"
      min={0}
      max={100}
      defaultValue={50}
      aria-label="brightness"
      onMouseLeave={() => setIsShown(false)}
      onMouseEnter={() => setIsShown(true)}
      valueLabelDisplay="auto"/>
    <ResultSlider
      style={style}
      orientation="vertical"
      min={0}
      max={100}
      defaultValue={50}
      aria-label="brightness"
      valueLabelDisplay="auto"/>
    <ResultSlider
      style={style}
      disabled
      orientation="vertical"
      min={0}
      max={100}
      defaultValue={50}
      aria-label="brightness"
      valueLabelDisplay="auto"/>
    <ResultSlider
      style={style}
      disabled
      orientation="vertical"
      min={0}
      max={100}
      defaultValue={50}
      aria-label="brightness"
      valueLabelDisplay="auto"/>
    <ResultSlider
      style={style}
      disabled
      orientation="vertical"
      min={0}
      max={100}
      defaultValue={50}
      aria-label="brightness"
      valueLabelDisplay="auto"/>
      {isShown && (<div> Hello </div>)}
    </Stack>
  );

};

export default ScoreDisplay;
