import React from 'react';
import {render} from 'react-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import domtoimage from 'dom-to-image';
import Stack from '@mui/material/Stack';
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
  const [cssImgSrc, setCssImgSrc] = React.useState(null);
  const [videoSrc, setVideoSrc] = React.useState(null);
  const [recordVideo, setRecordVideo] = React.useState(false);
  const [capturePhoto, setCapturePhoto] = React.useState(false);
  const [evaluating, setEvaluating] = React.useState(false);
  // may work together with some callModel variable to handle updates
  const [ocean, setOcean] = React.useState([]); 

  const handleRecordAgain = () => {
    setRecordVideo(false);
    setCapturePhoto(false);
    setContrast(100);
    setBrightness(100);
    setSaturate(100);
    setImgSrc(null);
    setVideoSrc(null);
    setCssImgSrc(null);
    setEvaluating(false);
  }

  const convertToJpeg = () => {
    let node = document.getElementById('image-node');
    domtoimage.toJpeg(node).then(function (cssImgSrc){
      setCssImgSrc(cssImgSrc);
      setEvaluating(true);
      setOcean([1,7,5,2,4]);
    }).catch (function (error) {
      console.error(error);
    })
  }

  const handleAdjustParams = () => {
    setCssImgSrc(null);
    setEvaluating(false);
    setOcean([]);
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
   if (cssImgSrc != null){
    Predict(cssImgSrc).then(console.log);
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
                <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate} evaluating={evaluating} contrast={contrast} brightness={brightness} saturate={saturate}/>
                <Stack spacing={2} direction="row" justifyContent="center">
                <Button style={style.normalButton} onClick={convertToJpeg}>Evaluate</Button>
                <Button style={style.normalButton} onClick={handleAdjustParams}>Adjust params</Button>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                {/*<Typography variant="h2" style={style.typography}>Scores</Typography>*/}
                <ScoreDisplay ocean={ocean}/>
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

