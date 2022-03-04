import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SnackbarContent from '@mui/material/SnackbarContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Modal from '@mui/material/Modal';
import { alpha } from '@mui/material/styles';

import { IntroductionBlock, ToolBlock, BiasesBlock } from './TextBlocks';

const InfoBox = ({evaluating, liveUpdateFlag}) => {
  const [introductionOpen, setIntroductionOpen] = React.useState(false);
  {/*TODO: introOpen to `true` by default once out of development*/}
  const handleIntroductionOpen = () => setIntroductionOpen(true);
  const handleIntroductionClose = () => setIntroductionOpen(false);
  const [toolOpen, setToolOpen] = React.useState(false);
  const handleToolOpen = () => setToolOpen(true);
  const handleToolClose = () => setToolOpen(false);
  const [biasesOpen, setBiasesOpen] = React.useState(false);
  const handleBiasesOpen = () => setBiasesOpen(true);
  const handleBiasesClose = () => setBiasesOpen(false);

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
      <Stack spacing={2} direction="column">
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
        <Stack spacing={2} direction="row" justifyContent="center">
          <Button sx={buttonStyle} onClick={handleIntroductionOpen}>
            INTRO
          </Button>
          <Button sx={buttonStyle} onClick={handleToolOpen}>
            OUR TOOL
          </Button>
          <Button sx={buttonStyle} onClick={handleBiasesOpen}>
            REAL YOU
          </Button>
        </Stack>
        <Modal
          open={introductionOpen}
          onClose={handleIntroductionClose}>
          <IntroductionBlock/>
        </Modal>
        <Modal
          open={toolOpen}
          onClose={handleToolClose}>
          <ToolBlock/>
        </Modal>
        <Modal
          open={biasesOpen}
          onClose={handleBiasesClose}>
          <BiasesBlock/>
        </Modal>
      </Grid>
      </Stack>
    </Grid>
  );
};

export default InfoBox;
