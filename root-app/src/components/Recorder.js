import React from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import Webcam from 'react-webcam';

import {loadImage} from '../apr/utils';


import './Recorder.css';

const Recorder = ({ setImgSrc, setCapturePhoto, oriOcean, setOriOcean, liveUpdateFlag, setLiveUpdateFlag, model }) => {
  console.log("Re-render recorder");
  console.log(model);
  const [modelLoadedFlag, setModelLoadedFlag] = React.useState(false);

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


  const update = async () => {
    try {
      const imgSrc = webcamRef.current.getScreenshot(); 
      setImgSrc(imgSrc);
      setCapturePhoto(true);
      console.log("bleh");
      console.log(model);
      if (oriOcean.length === 0 && model !== null) {
        // TODO: move this null check to a loading loop
        console.log("loading image");
        let image = await loadImage(imgSrc);
        console.log("loaded image");
        let arr = await model.predict(image);
        console.log(arr);
        arr = arr[0].slice(0, -1);
        for (var i = 0; i < arr.length; i++) {
          arr[i] *= 10;
        }
        setOriOcean(arr);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const updateLoop = () => {
    console.log("Perform update loop");
    update().then((success) => {
      console.log("Finished");
      console.log(success);
      if (success) {
        setTimeout(updateLoop, 50);
      } else {
        setTimeout(updateLoop, 500);
      }
    }).catch((error) => {
      console.error(error);
      setTimeout(updateLoop, 500);
    });
  }

  React.useEffect(() => {
    console.log("bleh");
    console.log(model);
    if (model !== null) {
      console.log("update loop");
      updateLoop();
    }
  }, [model]);

  const pause = () => {
    setLiveUpdateFlag(false);
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
