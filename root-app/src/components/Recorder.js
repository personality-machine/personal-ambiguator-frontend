import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import Webcam from 'react-webcam';

import {loadImage} from '../apr/utils';

import './Recorder.css';

import NormalDistribution from 'normal-distribution';

const SUCCESS_DELAY_MS = 50;
const FAILURE_DELAY_MS = 500;

const Recorder = ({ setImgSrc, setOriOcean, liveUpdateFlag, model }) => {

  const webcamRef = React.useRef(null);
  const [time, setTime] = React.useState(null);

  const videoConstraints = {
    aspectRatio: { exact: 1 },
  }
  const normDist = new NormalDistribution(0, 1);

  const update = async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    if (imgSrc === null) return false; 
    setImgSrc(imgSrc);
    
    if (model !== null) {
      // TODO: move this null check to a loading loop
      let image = await loadImage(imgSrc);
      let arr = await model.predict(image);
      arr = arr[0];
      // 1. mean and std based on the arr
      // let mean = arr.reduce((a, b) => a + b, 0) / arr.length;
      // let std = Math.sqrt(arr.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / arr.length);
      // 2. mean = 0.572, std = 0.141, calc from datasets
      // let mean = 0.572;
      // let std = 0.141;
      // 3. mean = 0.5, std = 0.141
      let mean = 0.5;
      let std = 0.141;
      for (var i = 0; i < arr.length; i++) {
        arr[i] = ((arr[i] - mean) / std);
        arr[i] = normDist.cdf(arr[i]) * 100;
      }
      setOriOcean(arr);
      return true;
    } else {
      return false;
    }
  };

  // TODO: make sure we don't setTime after component destroyed
  useEffect(() => {
    if (!liveUpdateFlag) return;
    update().then((success) => {
      setTimeout(() => {
        setTime(Date.now());
      }, success ? SUCCESS_DELAY_MS : FAILURE_DELAY_MS);
    }).catch((error) => {
      console.error(error);
    });
  }, [liveUpdateFlag, time, model]);

  return (
      <Grid className="webcam-container" container>
        <Grid item xs={12} justifyContent="center">
          <Webcam
            mirrored
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            imageSmoothing='true'
            width="100%"
            videoConstraints={videoConstraints}
          />
          <img src="./face_outline_large.png" className="overlay-container" />
        </Grid>
      </Grid>
  );
};

export default Recorder
