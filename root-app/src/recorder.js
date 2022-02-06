import React from 'react';
import Webcam from 'react-webcam';

const Recorder = ({contrast,brightness,saturate}) => {
    const webcamRef = React.useRef(null); // persistent reference cause no rerendering
    const [imgSrc, setImgSrc] = React.useState(null);

    const filters = {
        filter: ('contrast(' + contrast + '%)', 'brightness(' + brightness + '%)', 'saturate(' + saturate + '%)')
    };

    const capture = React.useCallback(() => { 
        const imgSrc = webcamRef.current.getScreenshot();
        setImgSrc(imgSrc);
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