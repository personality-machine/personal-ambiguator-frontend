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
import InfoBox from './components/InfoBox';

import { loadModel } from './apr/model';
import { resnetPreprocessor } from './apr/preprocessors';

import './index.css';

const MODEL_JSON_PATH = 'mobilenet/model.json';
const MODEL_PREPROCESSOR = resnetPreprocessor;

const App = () => {
  const [contrast, setContrast] = React.useState(100);
  const [brightness, setBrightness] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [saliencySrc, setSaliencySrc] = React.useState(null);
  const [cssImgSrc, setCssImgSrc] = React.useState(null);
  const [capturePhoto, setCapturePhoto] = React.useState(false);
  const [evaluating, setEvaluating] = React.useState(false);
  // may work together with some callModel variable to handle updates
  const [ocean, setOcean] = React.useState([]);
  const [oriOcean, setOriOcean] = React.useState([]);
  const [datasetIndex, setDatasetIndex] = React.useState(null);
  const [index, setIndex] = React.useState(null);
  const [liveUpdateFlag, setLiveUpdateFlag] = React.useState(true);
  const [model, setModel] = React.useState(null);

  const oriListPattern = [
    {
      id: 1,
      url: ""
    },
    {
      id: 2,
      url: ""
    },
    {
      id: 3,
      url: ""
    },
    {
      id: 4,
      url: ""
    },
    {
      id: 5,
      url: ""
    }
  ]
  const afterListPattern = [
    {
      id: 6,
      url: ""
    },
    {
      id: 7,
      url: ""
    },
    {
      id: 8,
      url: ""
    },
    {
      id: 9,
      url: ""
    },
    {
      id: 10,
      url: ""
    }
  ]
  // original saliency url, [oriUrlO, oriUrlC, oriUrlE, oriUrlA, oriUrlN]
  const [oriArr, setOriArr] = React.useState(oriListPattern);
  // after saliency url, [aftUrlO, aftUrlC, aftUrlE, aftUrlA, aftUrlN]
  const [afterArr, setAfterArr] = React.useState(afterListPattern);

  const handleRecordAgain = () => {
    setCapturePhoto(false);
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
    let node = document.getElementById('image-node');
    domtoimage.toJpeg(node).then(function (cssImgSrc) {
      setCssImgSrc(cssImgSrc);
      setEvaluating(true);
      let image = new Image();
      image.src = cssImgSrc;
      model.predict(image).then((arr) => {
        arr = arr[0].slice(0, -1);
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

  const style = {
    normalButton: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontFamily: 'monospace',
    },
    typography: {
      color: '#000000',
      fontFamily: 'monospace'
    }
  }

  // initialise model
  // TODO: @Kyra reorganise this :blobreach:
  useEffect(() => {
    loadModel(MODEL_JSON_PATH, MODEL_PREPROCESSOR).then(setModel);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {
          <>
            <Grid item xs={1} />
            <Grid item xs={4}>
              {liveUpdateFlag ?
                <Recorder setImgSrc={setImgSrc} setCapturePhoto={setCapturePhoto} setOriOcean={setOriOcean} liveUpdateFlag={liveUpdateFlag} setLiveUpdateFlag={setLiveUpdateFlag} model={model} />
                : (<div><Display contrast={contrast} brightness={brightness} saturate={saturate} imgSrc={imgSrc} saliencySrc={saliencySrc} capturePhoto={capturePhoto} />
                  <Button style={style.normalButton} onClick={handleRecordAgain}>Start Again</Button>
                  <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate} evaluating={evaluating} contrast={contrast} brightness={brightness} saturate={saturate} setSaliencySrc={setSaliencySrc} setDatasetIndex={setDatasetIndex} setIndex={setIndex} />
                  <Stack spacing={2} direction="row" justifyContent="center">
                    <Button style={style.normalButton} onClick={convertToJpeg}>Evaluate</Button>
                    <Button style={style.normalButton} onClick={handleAdjustParams}>Adjust params</Button>
                  </Stack></div>
                )}
            </Grid>
            <Grid item xs={3} md='auto' />
            <Grid item xs={12} md={6}>
              {/*<Typography variant="h2" style={style.typography}>Scores</Typography>*/}
              <ScoreDisplay ocean={ocean} oriOcean={oriOcean} setSaliencySrc={setSaliencySrc} imgSrc={imgSrc} cssImgSrc={cssImgSrc} oriArr={oriArr} setOriArr={setOriArr} afterArr={afterArr} setAfterArr={setAfterArr} datasetIndex={datasetIndex} setDatasetIndex={setDatasetIndex} index={index} setIndex={setIndex} />
              <InfoBox evaluating={evaluating} />
            </Grid>
            <Grid item xs={0} md={1} />
          </>}
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

