import React from 'react';

const Display = ({contrast,brightness,saturate,imgSrc,videoSrc}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    return (
        <div>
          {imgSrc &&
          (<img src={imgSrc} alt="" style={filters} width="100%"/>)}
          {videoSrc &&
          (<video controls width="100%" mirrored style={filters}>
            <source src={videoSrc} type="video/webm"></source>
          </video>)
          }
        </div>
    );
}
export default Display
