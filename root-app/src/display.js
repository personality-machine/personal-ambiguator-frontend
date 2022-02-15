import React from 'react';

const Display = ({contrast,brightness,saturate,imgSrc,videoSrc, recordVideo, capturePhoto}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    return (
        <div>
          {imgSrc && capturePhoto &&
          (<img src={imgSrc} alt="" style={filters} width="100%"/>)}
          {videoSrc && recordVideo &&
          (<video controls width="100%" style={filters}>
            <source src={videoSrc} type="video/webm"></source>
          </video>)
          }
        </div>
    );
}

export default Display
