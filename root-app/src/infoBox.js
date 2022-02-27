import React, {useRef, useEffect} from 'react';
import Box from '@mui/material/Box';

const InfoBox = () => {
  return (
    <Box component="div" sx={{
      whiteSpace: 'normal',
      fontFamily: 'monospace',
      fontSize: '1.5vw',
      }}>
      Hello!
    </Box>
  );
};

export default InfoBox;
