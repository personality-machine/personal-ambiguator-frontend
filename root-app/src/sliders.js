import Slider from '@mui/material/Slider';

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
    return (
    <div>
        <Slider marks step={10} min={0} max={300} defaultValue={100} aria-label="contrast" valueLabelDisplay="auto" onChange={handleChangeContrast}/>
        <Slider marks step={10} min={0} max={300} defaultValue={100} aria-label="brightness" valueLabelDisplay="auto" onChange={handleChangeBrightness}/>
        <Slider marks step={10} min={0} max={300} defaultValue={100} aria-label="saturate" valueLabelDisplay="auto" onChange={handleChangeSaturate}/>
    </div>
    );
};

export default Sliders