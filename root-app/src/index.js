import React, { useEffect } from 'react';
import { render } from 'react-dom';
import domtoimage from 'dom-to-image';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import Recorder from './components/Recorder';
import Sliders from './components/Sliders';
import Display from './components/Display';
import ScoreDisplay from './components/ScoreDisplay';
import Navigation from './components/Navigation';
import Steps from './components/Steps';

import {loadImage} from './apr/utils';

import { loadModel } from './apr/model';
import { resnetPreprocessor } from './apr/preprocessors';


import './index.css';


const MODEL_JSON_PATH = 'intermediate/model.json';

const MODEL_PREPROCESSOR = resnetPreprocessor;

const App = () => {
  const [contrast, setContrast] = React.useState(100);
  const [brightness, setBrightness] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [saliencySrc, setSaliencySrc] = React.useState(null);
  const [cssImgSrc, setCssImgSrc] = React.useState(null);
  const [evaluating, setEvaluating] = React.useState(false);
  // may work together with some callModel variable to handle updates
  const [ocean, setOcean] = React.useState([]);
  const [oriOcean, setOriOcean] = React.useState([]);
  const [datasetIndex, setDatasetIndex] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [liveUpdateFlag, setLiveUpdateFlag] = React.useState(true);
  const [model, setModel] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const oriListPattern = [...Array(6).keys()].map(x => {return {id: x+1, url: ""}});
  const afterListPattern = [...Array(6).keys()].map(x => {return {id: x+7, url: ""}});

  // original saliency url, [oriUrlO, oriUrlC, oriUrlE, oriUrlA, oriUrlN]
  const [oriArr, setOriArr] = React.useState(oriListPattern);
  // after saliency url, [aftUrlO, aftUrlC, aftUrlE, aftUrlA, aftUrlN]
  const [afterArr, setAfterArr] = React.useState(afterListPattern);

  const handleRecordAgain = () => {
    setContrast(100);
    setBrightness(100);
    setSaturate(100);
    setImgSrc(null);
    setCssImgSrc(null);
    setEvaluating(false);
    setOcean([]);
    setOriOcean([]);
    setSaliencySrc(null);
    setDatasetIndex(null);
    setIndex(null);
    setOriArr(oriListPattern);
    setAfterArr(afterListPattern);
    setLiveUpdateFlag(true);
  }


  const convertToJpeg = () => {
    setEvaluating(true);
    setSaliencySrc(null);
    let node = document.getElementById('ori-image');
    domtoimage.toJpeg(node).then(async function (cssImgSrc) {
      setCssImgSrc(cssImgSrc);
      let image = await loadImage(cssImgSrc);
      model.predict(image).then((arr) => {
        arr = arr[0];
        for (var i = 0; i < arr.length; i++) {
          arr[i] *= 10;
        }
        setOcean(arr);
      });
    }).catch(function (error) {
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


  const handleComplete = (step) => {
    const newCompleted = completed;
    newCompleted[step] = true;
    setCompleted(newCompleted);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({}); 
  };

  const style = {
    topButton: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontFamily: 'monospace',
      marginTop: 30,
      marginBottom: 10
    },
    normalButton: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontFamily: 'monospace',
      marginTop: 5,
      marginBottom: 10
    },
    typography: {
      color: '#000000',
      fontFamily: 'monospace'
    },
    grid: {
      marginTop: 30,
    }
  }

  // initialise model
  useEffect(() => {
		  loadModel(MODEL_JSON_PATH, MODEL_PREPROCESSOR).then(setModel);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navigation/>
      <Grid container spacing={1} style={style.grid}>
        {/* recorder and chart*/}
        <Grid item xs={1}/>
        <Grid item xs={4}>
        {liveUpdateFlag ?
          <Recorder setImgSrc={setImgSrc} setOriOcean={setOriOcean} liveUpdateFlag={liveUpdateFlag} model={model} />
          : <Display contrast={contrast} brightness={brightness} saturate={saturate} imgSrc={imgSrc} saliencySrc={saliencySrc} />}
        </Grid>
        <Grid item xs='auto'/>
        <Grid item xs={6} >
          <ScoreDisplay ocean={ocean} oriOcean={oriOcean} setSaliencySrc={setSaliencySrc} imgSrc={imgSrc} cssImgSrc={cssImgSrc} oriArr={oriArr} setOriArr={setOriArr} afterArr={afterArr} setAfterArr={setAfterArr} datasetIndex={datasetIndex} setDatasetIndex={setDatasetIndex} index={index} setIndex={setIndex} model={model} liveUpdateFlag={liveUpdateFlag}/>
        </Grid>
        {/* sliders and instructions*/}
        <Grid item xs={1} />
        <Grid item xs={4} >
        {liveUpdateFlag ?
          <Button onClick={() => { setLiveUpdateFlag(false); setActiveStep(1); handleComplete(0)}} style={style.topButton}>Edit Image</Button>
          : (<div><Button style={style.topButton} onClick={() => {handleRecordAgain(); handleReset()}}>Live Mode</Button>
            <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate} evaluating={evaluating} contrast={contrast} brightness={brightness} saturate={saturate} setSaliencySrc={setSaliencySrc} setDatasetIndex={setDatasetIndex} setIndex={setIndex} />
            <Stack spacing={2} direction="row" justifyContent="center">
              {!evaluating
                ? <Button style={style.normalButton} onClick={() => {convertToJpeg(); setActiveStep(2); handleComplete(1)}}>Evaluate</Button>
                : <Button style={style.normalButton} onClick={handleAdjustParams}>Edit Image</Button>
              }
            </Stack></div>)}
        </Grid>
        <Grid item xs='auto' />
        <Grid item xs={6} >
        <Steps activeStep={activeStep} setActiveStep={setActiveStep} completed={completed} setCompleted={setCompleted}/>
        </Grid>
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

