import React from 'react';
import {render} from 'react-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Recorder from './recorder';
import Sliders from  './sliders';
import Display from './display';
import './index.css';

const App = () => {
  const [contrast, setContrast] = React.useState(100);
  const [brightness, setBrightness] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [videoSrc, setVideoSrc] = React.useState(null);

  return (
  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Recorder setImgSrc={setImgSrc} setVideoSrc={setVideoSrc}/>
        </Grid>
        <Grid item xs={6}>
        <Display contrast={contrast} brightness={brightness} saturate={saturate} imgSrc={imgSrc} videoSrc={videoSrc}/>
        </Grid>
        <Grid item xs={12}>
        <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate}/>
        </Grid>
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

