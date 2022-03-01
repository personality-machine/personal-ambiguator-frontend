import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SnackbarContent from '@mui/material/SnackbarContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Modal from '@mui/material/Modal';
import { alpha } from '@mui/material/styles';

const InfoBox = ({evaluating, liveUpdateFlag}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: alpha('rgb(5, 32, 71)', 0.9),
    color: '#f8f8f2',
    fontStyle: 'monospace',
    fontSize: '1.2rem',
    textAlign: 'left',
    border: '2px solid rgb(25, 79, 156)',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
    padding: '15px',
  };
  const infoStyle = {
    backgroundColor: alpha('rgb(25, 79, 156)', 0.6),
    color: '#f8f8f2',
    whiteSpace: 'normal',
    fontFamily: 'monospace',
    fontSize: '1.2rem',
  };
  const greenInfoStyle = {
    backgroundColor: alpha('rgb(79, 132, 103)', 0.6),
    color: '#f8f8f2',
    whiteSpace: 'normal',
    fontFamily: 'monospace',
    fontSize: '1.2rem',
  };
  const buttonStyle = {
    color: '#f8f8f2',
    backgroundColor: '#000000',
    fontFamily: 'monospace',
    '&:hover' : {
      backgroundColor: '#000000',
    }

  };

  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item>
        {liveUpdateFlag ?
          <SnackbarContent
            message={
              'The machine is updating the scores live from the webcam! Try \
              clicking `PAUSE` to see how applying different filters to the \
              image affects the OCEAN scores.'
            }

            style={infoStyle}/>
        :
        <Box>
        {!evaluating ?
          <SnackbarContent
            message={
              'You can adjust parameters with the sliders under the image and \
              then click evaluate to see how the filters affect the scores \
              given by the Personality Machine!'
            }

            style={infoStyle}/>
        :
        <SnackbarContent
          message={

            'The personality machine is evaluating your scores! Once \
            responsive, click on the data points above to see the different \
            saliency maps. If you want to go back to adjusting parameters, \
            click the button under the sliders that lets you do so!'
          }
          style={greenInfoStyle}/>
        }
        </Box>
        }
      </Grid>
      <Grid item>
        <Button
          sx={buttonStyle}
          onClick={handleOpen}>
          FIND OUT MORE
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box style={popupStyle}>
            <h3>
              Purpose:
            </h3>

            <p>
              The purpose of this box is to give more information on how the
              model works and how it came to be.
            </p>

            <h3>
              Some placeholder text:
            </h3>

            <p>
              Here's some text! I am taking the time to write a longer
              paragraph to check how well the box reacts to the text length and
              pragraph length in general. I think it should be fine but it's
              always helpful to add in some test data to check. It's all good!
              :))
            </p>

            <p>
              Can it do different paragraphs? It can if you add in paragraph
              html things :o
            </p>

            <h3>
              It can even do headers...
            </h3>

          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default InfoBox;
