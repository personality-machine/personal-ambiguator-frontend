import React from 'react';
import Webcam from 'react-webcam';

const Recorder = ({setImgSrc,setVideoSrc}) => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

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
      <button onClick={handleShowVideo}>Show video</button>
    </div>
    );
};

export default Recorder