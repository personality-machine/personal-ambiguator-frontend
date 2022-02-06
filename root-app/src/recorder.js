import React from 'react';
import Webcam from 'react-webcam';
import './recorder.css'

const Recorder = () => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const [imgSrc, setImgSrc] = React.useState(null);
    
    const displayImage = () => {
        document.getElementsByClassName("image").style.filter = "opacity(50%)";
        document.getElementsByClassName("image").style.filter = "contrast(50%)";
    }

    const capture = React.useCallback(() => { 
        const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc);
        displayImage();
    }, [webcamRef, setImgSrc]);

    return (
        <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (
        <img
          src={imgSrc} alt="" className="image"
        />
      )}
    </div>
    );
};

export default Recorder