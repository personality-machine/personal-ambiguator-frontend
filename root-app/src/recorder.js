import React from 'react';
import Webcam from 'react-webcam';

const Recorder = ({contrast,brightness,saturate}) => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [videoSrc, setVideoSrc] = React.useState(null);

    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

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
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = React.useCallback(() => {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleShowVideo = React.useCallback(() => {
      if (recordedChunks.length){
        const blob = new Blob(recordedChunks, {type: "video/webm"});
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        setRecordedChunks([]);
      }
    }, [recordedChunks])

    const capture = React.useCallback(() => { 
        const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc);
    }, [webcamRef, setImgSrc]);

    return (
    <div>
      <Webcam
        width="auto"
        mirrored
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {capturing ? 
      (<button onClick={handleStopCaptureClick}>Stop capture video</button>) 
      : (<button onClick={handleStartCaptureClick}>Start capture video</button>)}
      {imgSrc && (<img src={imgSrc} alt="" style={filters}/>)}
      <button onClick={handleShowVideo}>Show video</button>
      {videoSrc && (<video controls width="auto" style={filters}> <source src={videoSrc} type="video/webm"></source></video>)}
    </div>
    );
};

export default Recorder