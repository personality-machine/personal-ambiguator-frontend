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
        <Slider defaultValue={50} aria-label="contrast" valueLabelDisplay="auto" onChange={handleChangeContrast}/>
        <Slider defaultValue={50} aria-label="brightness" valueLabelDisplay="auto" onChange={handleChangeBrightness}/>
        <Slider defaultValue={50} aria-label="saturate" valueLabelDisplay="auto" onChange={handleChangeSaturate}/>
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </div>
    );
};

export default Sliders