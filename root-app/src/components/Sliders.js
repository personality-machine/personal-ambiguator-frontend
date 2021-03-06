import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './Sliders.css';

const Sliders = ({setContrast,setBrightness,setSaturate,evaluating,contrast,brightness,saturate,setSaliencySrc,setDatasetIndex, setIndex}) => {
    const handleChangeContrast = (event, newValue) => {
      setSaliencySrc(null);
      setDatasetIndex(null);
      setIndex(null);
      setContrast(newValue);
    }
    const handleChangeBrightness = (event, newValue) => {
      setSaliencySrc(null);
      setDatasetIndex(null);
      setIndex(null);
      setBrightness(newValue);
    }
    const handleChangeSaturate = (event, newValue) => {
      setSaliencySrc(null);
      setDatasetIndex(null);
      setIndex(null);
      setSaturate(newValue);
    }

    const style ={
      color: '#121414',
      fontFamily: 'monospace',
      fontSize: 'bold'
    }

    return (
    <div>
      <Stack spacing={2} direction="row">
        <Typography gutterBottom style={style}>
          Contrast..:  
        </Typography>
        <Slider disabled={evaluating} style={style} marks step={10} min={0} max={300} defaultValue={100} aria-label="contrast" valueLabelDisplay="auto" onChange={handleChangeContrast}/>
        <Typography gutterBottom style={style}>
          {contrast}
        </Typography>
        </Stack>
        <Stack spacing={2} direction="row" >
        <Typography gutterBottom style={style}>
          Brightness:
        </Typography>
        <Slider disabled={evaluating} style={style} marks step={10} min={0} max={300} defaultValue={100} aria-label="brightness" valueLabelDisplay="auto" onChange={handleChangeBrightness}/>
        <Typography gutterBottom style={style}>
          {brightness}
        </Typography>
        </Stack>
        <Stack spacing={2} direction="row" >
        <Typography gutterBottom style={style}>
          Saturation:
        </Typography>
        <Slider disabled={evaluating} style={style} marks step={10} min={0} max={300} defaultValue={100} aria-label="saturate" valueLabelDisplay="auto" onChange={handleChangeSaturate}/>
        <Typography gutterBottom style={style}>
          {saturate}
        </Typography>
      </Stack>
    </div>
    );
};

export default Sliders
