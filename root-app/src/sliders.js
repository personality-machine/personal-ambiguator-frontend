import Slider from '@mui/material/Slider';

const Sliders = () => {
    return (
    <div>
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </div>
    );
};

export default Sliders