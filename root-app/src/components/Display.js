import React from 'react';
import Grid from '@mui/material/Grid';

import './Display.css';

const Display = ({contrast, brightness, saturate, imgSrc, saliencySrc}) => {
    const filters = {
        filter: `contrast(${contrast}%) brightness(${brightness}%) saturate(${saturate}%)`
    };

    return (
      <Grid container>
        {imgSrc &&
        (<div>
          <img
            id="ori-image"
            src={imgSrc}
            alt=""
            style={filters}
            width="100%"/>
          {saliencySrc && <img
            id="saliency-map"
            src={saliencySrc}
            alt=""
            width="100%"
            height="100%"/>}
          </div>)}
        </Grid>
    );
}

export default Display
