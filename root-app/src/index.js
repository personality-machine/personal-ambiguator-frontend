import React from 'react';
import {render} from 'react-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Recorder from './recorder';
import Sliders from  './sliders';
import './index.css';

const App = () => {
  const [contrast, setContrast] = React.useState(100);
  const [brightness, setBrightness] = React.useState(100);
  const [saturate, setSaturate] = React.useState(100);

  return (
  <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Recorder contrast={contrast} brightness={brightness} saturate={saturate}/>
        </Grid>
        <Grid item xs={12}>
        <Sliders setContrast={setContrast} setBrightness={setBrightness} setSaturate={setSaturate}/>
        </Grid>
      </Grid>
    </Box>
  );
}

render(<App />, document.getElementById('root'))

