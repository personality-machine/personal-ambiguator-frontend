import React, {useRef, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

const InfoBox = ({evaluating}) => {
  return (
    <Box>
      {evaluating ?
        <Typography component="div" sx={{
          backgroundColor: alpha('#000000', 0.6),
          color: '#f8f8f2',
          whiteSpace: 'normal',
          fontFamily: 'monospace',
          fontSize: '1.3vw',
          }}>

          The model is evaluating your scores! Once responsive, click on the
          data points above to see the different saliency maps. If you want to
          go back to adjusting parameters, click the button under the sliders
          that lets you do so!

        </Typography>
      :
        <Typography component="div" sx={{
          backgroundColor: alpha('#000000', 0.6),
          color: '#f8f8f2',
          whiteSpace: 'normal',
          fontFamily: 'monospace',
          fontSize: '1.3vw',
          }}>

          You can adjust parameters with the sliders under the image and then
          click evaluate to see how the filters affect the scores given by the
          Personality Machine!

        </Typography>
      }
    </Box>
  );
};

export default InfoBox;
