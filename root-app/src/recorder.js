import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Webcam from 'react-webcam';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import Predict from './tensorflow_test';
import './recorder.css';
import ModelEvaluate from './modelEvaluate.js';

const Recorder = ({setImgSrc,setVideoSrc, setRecordVideo, setCapturePhoto, oriOcean, setOriOcean, oriArr, setOriArr, afterArr, setAfterArr}) => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const videoConstraints = {
      // width: 224,
      // height: 224,
      aspectRatio: {exact: 1},
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

    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      setVideoSrc(null);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable, setVideoSrc]);

    const handleStopCaptureClick = React.useCallback(() => {
      setCapturing(false);
      mediaRecorderRef.current.stop();
    }, [mediaRecorderRef, setCapturing]);

    const capture = React.useCallback(() => { 
      const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc);
        console.log("original");
        console.log(imgSrc.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0));
        setCapturePhoto(true);
        if (oriOcean.length === 0) {
          ModelEvaluate(imgSrc, 'original', oriArr, {setOriArr}, afterArr, {setAfterArr});
          Predict(imgSrc).then((arr) => {
            arr = arr[0].slice(0,-1);
            for (var i = 0; i < arr.length; i++){
              arr[i] *= 10;
            }
            setOriOcean(arr);
          });
        }
    }, [webcamRef, setImgSrc, setCapturePhoto, oriOcean, setOriOcean]);

    React.useEffect(() => {
      if (recordedChunks.length){
        const blob = new Blob(recordedChunks, {type: "video/webm"});
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        setRecordedChunks([]);
        setRecordVideo(true);
      }
    }, [recordedChunks, setVideoSrc, setRecordVideo])

    return (
    <Box sx={{ flexGrow:1 }}>
      <Grid className="webcam-container" container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} justifyContent="center">
          <Webcam
            mirrored
            audio={false}
            ref={webcamRef}
            width="80%"
            screenshotFormat="image/jpeg"
            imageSmoothing='true'
            width="100%"
            videoConstraints={videoConstraints}
          />
        </Grid>
        <Grid item className="overlay-container" xs={12} justifyContent="center">
        {capturing ? 
          (<IconButton
            style={style.recordButton}
            variant='contained'
            aria-label="stop-video"
            onClick={handleStopCaptureClick}>
            <StopCircleIcon style={style.recordIcon}/>
          </IconButton>)
        : (<IconButton
            style={style.recordButton}
            align="center"
            variant="outlined"
            aria-label="start-video"
            onClick={handleStartCaptureClick}>
            <RadioButtonCheckedIcon style={style.recordIcon}/>
        </IconButton>)}
        </Grid>
      </Grid>
      <Button onClick={capture} style={style.normalButton}>Capture photo</Button>
    </Box>
    );
};

export default Recorder
