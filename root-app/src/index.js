import React from 'react';
import {render} from 'react-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
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
  const [recordVideo, setRecordVideo] = React.useState(false);
  const [capturePhoto, setCapturePhoto] = React.useState(false);

  const handleRecordAgain = () => {
    setRecordVideo(false);
    setCapturePhoto(false);
  }

  return (
  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}/>
        <Grid item xs={6}>
          {recordVideo || capturePhoto ? 
          [<Display contrast={contrast} brightness={brightness} saturate={saturate} imgSrc={imgSrc} videoSrc={videoSrc} recordVideo={recordVideo} capturePhoto={capturePhoto}/>, 
            <Button onClick={handleRecordAgain}>Record Again</Button>, 
            <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate}/>] :
          <Recorder setImgSrc={setImgSrc} setVideoSrc={setVideoSrc} setRecordVideo={setRecordVideo} setCapturePhoto={setCapturePhoto}/>}
        </Grid>
        {/*size 3 containers used for centering can be filled*/}
        <Grid item xs={3}/>
        <Grid item xs={12}>
          <h1>Hello</h1>
        </Grid>
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

