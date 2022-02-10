import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Webcam from 'react-webcam';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './recorder.css';
import { style } from '@mui/system';

const Recorder = ({setImgSrc,setVideoSrc}) => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const style = {
      recordButton: {
        width: '20%', height: '20%',
        //padding: 0,
      },
      recordIcon: {
        width: 86, height: 86,
        color: '#0059b3'
      },
    }

    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );

    const handleShowVideo = React.useCallback(() => {
      if (recordedChunks.length && mediaRecorderRef.current.state === "inactive"){
        const blob = new Blob(recordedChunks, {type: "video/webm"});
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks])

    const handleStartCaptureClick = React.useCallback(() => {
      setCapturing(true);
      setVideoSrc(null);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable,
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable, handleShowVideo]);

    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const capture = React.useCallback(() => { 
        const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc);
    }, [webcamRef, setImgSrc]);

    return (
    <Box sx={{ flexGrow:1 }}>
      <Grid className="webcam-container" container spacing={2} alignItems="centre">
        <Grid item xs={12}>
          <Webcam
            width='100%'
            mirrored
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </Grid>
        <Grid className="overlay-container" item xs={12}>
        {capturing ? 
          (<IconButton
            style={style.recordButton}
            alignItem="center"
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
            <PlayCircleFilledIcon style={style.recordIcon}/>
        </IconButton>)}
        </Grid>
      </Grid>
      <Button onClick={capture}>Capture photo</Button>
      <Button onClick={handleShowVideo}>Show video</Button>
    </Box>
    );
};

export default Recorder
