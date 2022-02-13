import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Sliders = ({setContrast,setBrightness,setSaturate}) => {
    const handleChangeContrast = (event, newValue) => {
        setContrast(newValue);
    }
    const handleChangeBrightness = (event, newValue) => {
        setBrightness(newValue);
    }
    const handleChangeSaturate = (event, newValue) => {
        setSaturate(newValue);
    }

    const style = {
        color: '#000000'
    }

    return (
    <div>
        <Stack spacing={2} direction="row">
        <Typography gutterBottom>
        Contrast:
        </Typography>
        <Slider style={style} marks step={10} min={0} max={300} defaultValue={100} aria-label="contrast" valueLabelDisplay="auto" onChange={handleChangeContrast}/>
        </Stack>
        <Stack spacing={2} direction="row" >
        <Typography gutterBottom>
        Brightness:
        </Typography>
        <Slider style={style} marks step={10} min={0} max={300} defaultValue={100} aria-label="brightness" valueLabelDisplay="auto" onChange={handleChangeBrightness}/>
        </Stack>
        <Stack spacing={2} direction="row" >
        <Typography gutterBottom>
        Saturation:
        </Typography>
        <Slider style={style} marks step={10} min={0} max={300} defaultValue={100} aria-label="saturate" valueLabelDisplay="auto" onChange={handleChangeSaturate}/>
        </Stack>
    </div>
    );
};

export default Sliders