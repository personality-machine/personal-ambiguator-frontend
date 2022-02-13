import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Webcam from 'react-webcam';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './recorder.css';

const Recorder = ({setImgSrc,setVideoSrc, setRecordVideo, setCapturePhoto}) => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const style = {
      recordButton: {
        width: '50%', height: '50%',
        //padding: 0,
      },
      recordIcon: {
        width: '100%', height: '100%',
        color: '#000000'
      },
      normalButton: {
        color: '#000000'
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

    const handleShowVideo = React.useEffect(() => {
      if (recordedChunks.length){
        const blob = new Blob(recordedChunks, {type: "video/webm"});
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        setRecordedChunks([]);
        setRecordVideo(true);
      }
    }, [recordedChunks, setVideoSrc])

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
        setCapturePhoto(true);
    }, [webcamRef, setImgSrc]);

    return (
    <Box sx={{ flexGrow:1 }}>
      <Grid className="webcam-container" container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} alignItems= "center" justifyContent="center">
          <Webcam
            width='100%'
            mirrored
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
        </Grid>
        <Grid className="overlay-container" container xs={4} alignItems="center" justifyContent="center">
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
            <RadioButtonCheckedIcon style={style.recordIcon}/>
        </IconButton>)}
        </Grid>
      </Grid>
      <Button onClick={capture} style={style.normalButton}>Capture photo</Button>
    </Box>
    );
};

export default Recorder
