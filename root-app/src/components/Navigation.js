import React from 'react';

import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    makeStyles,
  } from "@material-ui/core";


const Navigation = () => {
  const useStyles = makeStyles((theme) => ({
    navlinks: {
      marginRight: theme.spacing(10),
      display: "flex",
    },
   logo: {
      marginLeft: theme.spacing(5),
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      cursor: "pointer",
      marginLeft: theme.spacing(5),
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  }));
  const classes = useStyles();

  const handleIntroductionOpen = () => {
      console.log("Introduction Open.");
  }

  const handleToolOpen = () => {
      console.log("Tool Open.");
  }

  const handleBiasesOpen = () => {
      console.log("Biases Open.");
  }

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
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
              Biases
            </Typography>
          </div>
      </Toolbar>
    </AppBar>
);
}

export default Navigation;