import React from 'react';
import './display.css';

const Display = ({contrast,brightness,saturate,imgSrc,videoSrc, recordVideo, capturePhoto, evaluating}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    const saliencySRC = '/fake-saliency.png';

    return (
        <div>
          {imgSrc && capturePhoto &&
          ([<div id="image-node">
            <img id="ori-image" src={imgSrc} alt="" style={filters} width="100%"/>
            {evaluating && <img id="saliency-map" src={saliencySRC} alt="" width="100%"/>}
            </div>,])}
          
          {videoSrc && recordVideo &&
          ([<div id="video-node">
            <video controls width="100%" style={filters}>
            <source src={videoSrc} type="video/webm"></source></video>
            </div>]
            )
          }
        </div>
    );
}

export default Display
