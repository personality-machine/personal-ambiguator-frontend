import React, {useRef, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { alpha } from '@mui/material/styles';

const InfoBox = ({evaluating}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: alpha('#000000', 0.8),
    color: '#f8f8f2',
    border: '2px solid rgb(25, 79, 156)',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item>
        {evaluating ?
          <Typography component="div" sx={{
            backgroundColor: alpha('rgb(79, 132, 103)', 0.6),
            color: '#f8f8f2',
            whiteSpace: 'normal',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            }}>

            The personality machine is evaluating your scores! Once responsive,
            click on the data points above to see the different saliency maps. If
            you want to go back to adjusting parameters, click the button under
            the sliders that lets you do so!

          </Typography>
        :
          <Typography component="div" sx={{
            backgroundColor: alpha('rgb(25, 79, 156)', 0.6),
            color: '#f8f8f2',
            whiteSpace: 'normal',
            fontFamily: 'monospace',
            fontSize: '1.2rem',
            }}>

            You can adjust parameters with the sliders under the image and then
            click evaluate to see how the filters affect the scores given by the
            Personality Machine!

          </Typography>
        }
      </Grid>
      <Grid item>
        <Button
          sx={{
           color: '#f8f8f2',
           backgroundColor: alpha('#000000', 0.7),
           fontFamily: 'monospace',
           '&:hover': {
             backgroundColor: '#000000',
           }
          }}
          onClick={handleOpen}>
          FIND OUT MORE
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={popupStyle}> Here's some text! </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default InfoBox;
