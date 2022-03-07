import React from 'react';

import {
    AppBar,
    Toolbar,
    Modal,
    CssBaseline,
    Typography,
    makeStyles,
  } from "@material-ui/core";


import {
    IntroductionBlock,
    ToolBlock,
    BiasesBlock
  } from './TextBlocks';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: "#194f9c"
  },
  navlinks: {
    marginRight: theme.spacing(10),
    display: "flex",
  },
  logo: {
    marginLeft: theme.spacing(5),
    fontFamily: "monospace",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.3rem",
    fontFamily: "monospace",
    cursor: "pointer",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "#a8f7cc",
      borderBottom: "1px solid #57c287",
    },
  },
}));

const Navigation = () => {
  const classes = useStyles();

  const [introductionOpen, setIntroductionOpen] = React.useState(false);
  {/*TODO: introOpen to `true` by default once out of development*/}
  const [toolOpen, setToolOpen] = React.useState(false);
  const [biasesOpen, setBiasesOpen] = React.useState(false);

  const handleIntroductionOpen = () => {
    setIntroductionOpen(true);
  }
  const handleIntroductionClose = () => {
    setIntroductionOpen(false);
  }

  const handleToolOpen = () => {
    setToolOpen(true);
  }
  const handleToolClose = () => {
    setToolOpen(false);
  }

  const handleBiasesOpen = () => {
    setBiasesOpen(true);
  }
  const handleBiasesClose = () => {
    setBiasesOpen(false);
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className={classes.logo}>
          Personality Machine
        </Typography>
          <div className={classes.navlinks}>
            <Typography onClick={handleIntroductionOpen} className={classes.link}>
              Introduction
            </Typography>
            <Typography onClick={handleToolOpen} className={classes.link}>
              Our Tool
            </Typography>
            <Typography onClick={handleBiasesOpen} className={classes.link}>
              'Real You'
            </Typography>
          </div>
      </Toolbar>
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
    </AppBar>
);
}

export default Navigation;
