import React from 'react';
import Grid from '@mui/material/Grid';

import './display.css';

const Display = ({contrast,brightness,saturate,imgSrc,videoSrc, recordVideo, capturePhoto, evaluating}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    const saliency_filters = {
      filter: `opacity(70%)`
    };

    const saliencySRC = '/fake-saliency.png';

    return (
      <Grid container >
        {imgSrc && capturePhoto &&
        ([<div id="image-node">
          <img id="ori-image" src={imgSrc} alt="" style={filters} width="100%"/>
          {evaluating && <img
            id="saliency-map"
            src={saliencySRC}
            alt=""
            style={saliency_filters}
            width="100%"
            height="100%"/>}
          </div>,])}
        
        {videoSrc && recordVideo &&
        ([<div id="video-node">
          <video controls width="100%" style={filters}>
          <source src={videoSrc} type="video/webm"></source></video>
          </div>]
          )
        }
      </Grid>
    );
}

export default Display
