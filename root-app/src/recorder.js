import React from 'react';
import Webcam from 'react-webcam';
import './recorder.css'

const Recorder = () => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const [imgSrc, setImgSrc] = React.useState(null);
    const [contrast, setContrast] = React.useState(100);
    const [brightness, setBrightness] = React.useState(100);
    const [saturate, setSaturate] = React.useState(100);

    const filters = {
        filter: ('contrast(' + contrast + '%)', 'brightness(' + brightness + '%)', 'saturate(' + saturate + '%)')
    };

    const capture = React.useCallback(() => { 
        const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc);
        setContrast(50);
        setBrightness(50);
        setSaturate(200);
    }, [webcamRef, setImgSrc]);

    return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && (<img src={imgSrc} alt="" style={filters}/>)}
    </div>
    );
};

export default Recorder