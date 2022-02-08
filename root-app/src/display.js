import React from 'react';

const Display = ({contrast,brightness,saturate,imgSrc,videoSrc}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    return (
        <div>
        {imgSrc && (<img src={imgSrc} alt="" style={filters}/>)}
        {videoSrc && (<video controls width="auto" style={filters}> <source src={videoSrc} type="video/webm"></source></video>)}
        </div>
    );
}
export default Display