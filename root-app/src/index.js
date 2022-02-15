import React from 'react';
import {render} from 'react-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Recorder from './recorder';
import Sliders from  './sliders';
import Display from './display';
import Predict from './tensorflow_test';
import ScoreDisplay from './scoreDisplay';
import './index.css';

const App = () => {
  const [contrast, setContrast] = React.useState(100);
  const [brightness, setBrightness] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [videoSrc, setVideoSrc] = React.useState(null);
  const [recordVideo, setRecordVideo] = React.useState(false);
  const [capturePhoto, setCapturePhoto] = React.useState(false);
  // may work together with some callModel variable to handle updates
  const [ocean, setOcean] = React.useState(null); 

  const handleRecordAgain = () => {
    setRecordVideo(false);
    setCapturePhoto(false);
    setContrast(100);
    setBrightness(100);
    setSaturate(100);
  }

  const style = {
    normalButton: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontFamily: 'courier new',
    },
    typography: {
      color: '#000000',
      fontFamily: 'courier new'
    }
  }
   if (imgSrc != null){
    Predict(imgSrc).then(console.log);
   }

  return (
  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {recordVideo || capturePhoto ? 
            <>
              <Grid item xs={1}/>
              <Grid item xs={4}>
                <Display contrast={contrast} brightness={brightness} saturate={saturate} imgSrc={imgSrc} videoSrc={videoSrc} recordVideo={recordVideo} capturePhoto={capturePhoto}/> 
                <Button style={style.normalButton} onClick={handleRecordAgain}>Record Again</Button> 
                <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate}/>
              </Grid>
              <Grid item xs={6}>
                {/*<Typography variant="h2" style={style.typography}>Scores</Typography>*/}
                <ScoreDisplay/>
              </Grid>
              <Grid item xs={1}/>
            </> :
            <>
              <Grid item xs={3}/>
              <Grid item xs={6}>
                <Recorder setImgSrc={setImgSrc} setVideoSrc={setVideoSrc} setRecordVideo={setRecordVideo} setCapturePhoto={setCapturePhoto}/>
              </Grid>
              {/*size 3 containers used for centering can be filled*/}
              <Grid item xs={3}/>
            </>}
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

