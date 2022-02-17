import React from 'react';

const Display = ({contrast,brightness,saturate,imgSrc,videoSrc, recordVideo, capturePhoto}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    return (
        <div>
          {imgSrc && capturePhoto &&
          ([<div id="image-node">
            <img src={imgSrc} alt="" style={filters} width="100%"/>
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
