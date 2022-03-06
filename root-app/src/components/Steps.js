import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Step,
    Stepper,
    StepLabel,
    Button,
    Typography,
    makeStyles
  } from '@material-ui/core';
import { alpha, styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';

const steps = ['Stop live updating', 
               'Adjust parameters and evaluate', 
               'Saliency maps',
               'Re-adjust parameters'];
const content = ['The machine is updating the scores live from the webcam! Click `PAUSE` to stop.', 
                 'See how the filters affect the image and then click `EVALUATE` to see how they affect the scores given by the Personality Machine.', 
                 'Click on a data point and wait until the saliency map appears.', 
                 'If you want to go back to adjusting parameters, click the `ADJUST PARAMS` button. If you want to go back to live mode, click `LIVE MODE`.'];

const HorizontalNonLinearStepper = ({activeStep, setActiveStep, completed, setCompleted}) => {
  const useStyles = makeStyles((theme) => ({
    step: {
      backgroundColor: alpha('rgb(25, 79, 156)', 0.0),
    },
    steplabel: {
      fontFamily: 'monospace',
    },
    steptext: {
      color: '#f8f8f2',
      backgroundColor: alpha('rgb(25, 79, 156)', 0.7),
      fontFamily: 'monospace',
      fontSize: '1.2rem',
      border: '2px solid rgb(25, 79, 156)',
      borderRadius: '5px',
      padding: '5px',
    },
    button: {
      color: '#f8f8f2',
      backgroundColor: '#000000',
      fontFamily: 'monospace',
      "&:hover": {
        backgroundColor: '#000000',
      },
      "&:disabled": {
        backgroundColor: '#888888',
      },
    },
    feedback: {
      color: '#000000',
      fontFamily: 'monospace',
    },
  }));
  const classes = useStyles();

  const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: alpha('rgb(25, 79, 156)', 0.2),
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: '#194f9c',
    }),
    '& .QontoStepIcon-completedIcon': {
      color: '#4f8467',
      zIndex: 1,
      fontSize: 25,
    },
    '& .QontoStepIcon-circle': {
      width: 15,
      height: 15,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }));
  
  function QontoStepIcon(props) {
    const { active, completed, className } = props;
  
    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
  };


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has not been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep} className={classes.step}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]} >
            <StepLabel StepIconComponent={QontoStepIcon} classes={{label: classes.steplabel}}>
              {/*onClick={handleStep(index)}*/}
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography className={classes.steptext} sx={{ mt: 2, mb: 1 }}>
              You understand how the app works now! Feel free to play around or
              click 'RESET' to review the instructions.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button className={classes.button} onClick={handleReset}>Reset</Button>
              <Box sx={{ flex: '1 1 auto' }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography className={classes.steptext} sx={{ mt: 2, mb: 1 }}>{content[activeStep]}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2}}>
              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }}/>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.feedback}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    onClick={handleComplete}
                    className={classes.button}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'complete'}
                  </Button>
                ))}
              <Box sx={{ flex: '1 1 auto' }}/>
              <Button 
                className={classes.button}
                onClick={handleNext}
              >
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}

export default HorizontalNonLinearStepper;
