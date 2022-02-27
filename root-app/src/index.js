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
import InfoBox from './infoBox';
import './index.css';


const App = () => {
  const [contrast, setContrast] = React.useState(100);
  const [brightness, setBrightness] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [saliencySrc, setSaliencySrc] = React.useState(null);
  const [cssImgSrc, setCssImgSrc] = React.useState(null);
  const [videoSrc, setVideoSrc] = React.useState(null);
  const [recordVideo, setRecordVideo] = React.useState(false);
  const [capturePhoto, setCapturePhoto] = React.useState(false);
  const [evaluating, setEvaluating] = React.useState(false);
  // may work together with some callModel variable to handle updates
  const [ocean, setOcean] = React.useState([]);
  const [oriOcean, setOriOcean] = React.useState([]);
  const [datasetIndex, setDatasetIndex] = React.useState(null);
  const [index, setIndex] = React.useState(null);

  const oriListPattern = [
    {
      id : 1,
      url: ""
    },
    {
      id : 2,
      url: ""
    },
    {
      id : 3,
      url: ""
    },
    {
      id : 4,
      url: ""
    },
    {
      id : 5,
      url: ""
    }
  ]
  const afterListPattern = [
    {
      id : 6,
      url: ""
    },
    {
      id : 7,
      url: ""
    },
    {
      id : 8,
      url: ""
    },
    {
      id : 9,
      url: ""
    },
    {
      id : 10,
      url: ""
    }
  ]
  // original saliency url, [oriUrlO, oriUrlC, oriUrlE, oriUrlA, oriUrlN]
  const [oriArr, setOriArr] = React.useState(oriListPattern);
  // after saliency url, [aftUrlO, aftUrlC, aftUrlE, aftUrlA, aftUrlN]
  const [afterArr, setAfterArr] = React.useState(afterListPattern);

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
    setOcean([]);
    setOriOcean([]);
    setSaliencySrc(null);
    setDatasetIndex(null);
    setIndex(null);
    setOriArr(oriListPattern);
    setAfterArr(afterListPattern);
  }

  const convertToJpeg = () => {
    let node = document.getElementById('image-node');
    domtoimage.toJpeg(node).then(function (cssImgSrc){
      console.log('after');
      console.log(cssImgSrc.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0));
      setCssImgSrc(cssImgSrc);
      setEvaluating(true);
      Predict(cssImgSrc).then((arr) => {
        arr = arr[0].slice(0,-1);
        for (var i = 0; i < arr.length; i++){
          arr[i] *= 10;
        }
        setOcean(arr);
      });
    }).catch (function (error) {
      console.error(error);
    })
  }

  const handleAdjustParams = () => {
    setCssImgSrc(null);
    setEvaluating(false);
    setOcean([]);
    setSaliencySrc(null);
    setDatasetIndex(null);
    setIndex(null);
    setAfterArr(afterListPattern);
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

  return (
  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} rows>
        {recordVideo || capturePhoto ? 
            <>
              <Grid item xs={3} md={1}/>
              <Grid item xs={6} md={4}>
                <Display contrast={contrast} brightness={brightness} saturate={saturate} imgSrc={imgSrc} saliencySrc={saliencySrc} videoSrc={videoSrc} recordVideo={recordVideo} capturePhoto={capturePhoto} evaluating={evaluating}/> 
                <Button style={style.normalButton} onClick={handleRecordAgain}>Record Again</Button> 
                <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate} evaluating={evaluating} contrast={contrast} brightness={brightness} saturate={saturate} setSaliencySrc={setSaliencySrc} setDatasetIndex={setDatasetIndex} setIndex={setIndex}/>
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Button style={style.normalButton} onClick={convertToJpeg}>Evaluate</Button>
                  <Button style={style.normalButton} onClick={handleAdjustParams}>Adjust params</Button>
                </Stack>
              </Grid>
              <Grid item xs={3} md='auto'/>
              <Grid item xs={12} md={6}>
                {/*<Typography variant="h2" style={style.typography}>Scores</Typography>*/}
                <ScoreDisplay ocean={ocean} oriOcean={oriOcean} setSaliencySrc={setSaliencySrc} imgSrc={imgSrc} cssImgSrc={cssImgSrc} oriArr={oriArr} setOriArr={setOriArr} afterArr={afterArr} setAfterArr={setAfterArr} datasetIndex={datasetIndex} setDatasetIndex={setDatasetIndex} index={index} setIndex={setIndex}/>
                <InfoBox/>
              </Grid>
              <Grid item xs={0} md={1}/>
            </> :
            <>
              <Grid item xs={3}/>
              <Grid item xs={6}>
                <Recorder setImgSrc={setImgSrc} setVideoSrc={setVideoSrc} setRecordVideo={setRecordVideo} setCapturePhoto={setCapturePhoto} oriOcean={oriOcean} setOriOcean={setOriOcean}/>
              </Grid>
              {/*size 3 containers used for centering can be filled*/}
              <Grid item xs={3}/>
            </>}
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

