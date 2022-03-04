import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Webcam from 'react-webcam';

import {loadImage} from '../apr/utils';


import './Recorder.css';

const SUCCESS_DELAY_MS = 50;
const FAILURE_DELAY_MS = 500;

const Recorder = ({ setImgSrc, setCapturePhoto, setOriOcean, liveUpdateFlag, setLiveUpdateFlag, model }) => {

  const webcamRef = React.useRef(null); // persistent reference cause no rerendering
  const [time, setTime] = React.useState(null);

  const videoConstraints = {
    // width: 224,
    // height: 224,
    aspectRatio: { exact: 1 },
  }

  const style = {
    recordButton: {
      width: '100%', height: '100%',
      //padding: 0,
    },
    recordIcon: {
      width: '100%', height: '100%',
      color: '#000000'
    },
    normalButton: {
      color: '#ffffff',
      backgroundColor: '#000000',
      fontFamily: 'courier new',
      marginTop: 10,
      marginBottom: 10,
    }
  }


  const update = async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    if (imgSrc === null) return false; 
    setImgSrc(imgSrc);
    setCapturePhoto(true);
    if (model !== null) {
      // TODO: move this null check to a loading loop
      let image = await loadImage(imgSrc);
      let arr = await model.predict(image);
      arr = arr[0].slice(0, -1);
      for (var i = 0; i < arr.length; i++) {
        arr[i] *= 10;
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid className="webcam-container" container spacing={2} alignItems="center" justifyContent="center">
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
        </Grid>
      </Grid>
      <Button onClick={() => {setLiveUpdateFlag(false)}} style={style.normalButton}>Pause</Button>
    </Box>
  );
};

export default Recorder
