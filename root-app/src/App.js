import './App.css';
import VideoRecorder from 'react-video-recorder';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <VideoRecorder
          onRecordingComplete={videoBlob => {
            // Do something with the video...
            console.log('videoBlob', videoBlob)
          }}
        />
        </Grid>
        <Grid item xs={6}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={6}>
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        </Grid>
        <Grid item xs={6}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
