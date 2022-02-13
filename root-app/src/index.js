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
  const [recorded, setRecorded] = React.useState(false);

  return (
  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          {recorded ? <Display contrast={contrast} brightness={brightness} saturate={saturate} imgSrc={imgSrc} videoSrc={videoSrc}/> :
          <Recorder setImgSrc={setImgSrc} setVideoSrc={setVideoSrc} setRecorded={setRecorded} />}
        </Grid>
        {/*size 3 containers used for centering can be filled*/}
        <Grid item xs={3}/>
        <Grid item xs={6}>
          <h1>Hello</h1>
        </Grid>
        <Grid item xs={6}>
        <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate}/>
        </Grid>
        <Grid item xs={12}>
          <h1>Hello</h1>
        </Grid>
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

