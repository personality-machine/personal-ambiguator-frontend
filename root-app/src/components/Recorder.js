import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Webcam from 'react-webcam';
import Predict from '../apr/tensorflow_test';

import './Recorder.css';

const Recorder = ({ setImgSrc, oriOcean, setOriOcean, liveUpdateFlag, setLiveUpdateFlag }) => {
  const webcamRef = React.useRef(null); // persistent reference cause no rerendering

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
    }
  }

  const liveUpdate = async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImgSrc(imgSrc);
    if (oriOcean.length === 0) {
      Predict(imgSrc).then((arr) => {
        arr = arr[0].slice(0, -1);
        for (var i = 0; i < arr.length; i++) {
          arr[i] *= 10;
        }
        setOriOcean(arr);
      });
    }
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (liveUpdateFlag) {
        liveUpdate();
      }
    }, 1000);
    return () => clearInterval(interval);
  },[])

  const pause = () => {
    setLiveUpdateFlag(false);
    liveUpdate();
  }

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
      <Button onClick={pause} style={style.normalButton}>Pause</Button>
    </Box>
  );
};

export default Recorder
