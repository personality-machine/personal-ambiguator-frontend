import React from 'react';
import Webcam from 'react-webcam';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import './recorder.css';

const Recorder = ({setImgSrc,setVideoSrc}) => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const style = {
      recordButton: {
        width: 86, height: 86,
        padding: 0,
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

    const handleShowVideo = React.useEffect(() => {
      console.log(recordedChunks.length);
      if (recordedChunks.length){
        const blob = new Blob(recordedChunks, {type: "video/webm"});
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        setRecordedChunks([]);
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
    }, [webcamRef, setImgSrc]);

    return (
    <div>
      <div className="webcam-container">
      <Webcam
        width="auto"
        audio={false}
        mirrored
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <div className="overlay-container">
      {capturing ? 
      (<IconButton style={style.recordButton} variant='contained' aria-label="stop-video" onClick={handleStopCaptureClick}><StopCircleIcon style={style.recordIcon}/></IconButton>)
      : (<IconButton style={style.recordButton} variant='contained' aria-label="start-video" onClick={handleStartCaptureClick}><PlayCircleFilledIcon style={style.recordIcon}/></IconButton>)}
      </div>
      </div>
      <Button onClick={capture}>Capture photo</Button>
      <Button onClick={handleShowVideo}>Show video</Button>
    </div>
    );
};

export default Recorder