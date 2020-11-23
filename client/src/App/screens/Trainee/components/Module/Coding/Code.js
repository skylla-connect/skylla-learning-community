import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fundamentals from './Fundamentals/Fundamentals';
import JavaScript from './JavaScript/JavaScript';
import './Code.css';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import VersionControl from './VersionControl/VersionControl';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
  },

  container: {
    flexGrow: 1,
  },

  bottom: {
    textAlign: 'center',
  },

  top: {
    backgroundColor: 'hsla(212,99%,61%,.2)',
    padding: '70px 0 80px 0',
    textAlign: 'center',
    margin: '0 auto'
  },

  paper: {
    padding: theme.spacing(18),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(10),
    }
  },

  TextPaper: {
    padding: theme.spacing(8),
    marginTop: theme.spacing(8),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
      textAlign: 'center'
    }
    // backgroundColor: 'white',
  }
}));

export default function Coder() {
  const classes = useStyles();

  return (
    <div className={`root ${classes.root}`}>
      <div className={classes.container}>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
              <Typography variant="h1" style={{
                fontWeight: 'bold', 
                color: 'black', 
                fontFamily: 'Arial',
                letterSpacing: 5
                }}>
                JOIN 
              </Typography>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className={classes.TextPaper}>
              <Typography variant="h3">
                the Million people
                Learning to Code
                with Skylla Connect 
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="topbox"></div>

      <div className={`${classes.top}`}>
        <div className={classes.bottom}>
          <Fundamentals />
          <JavaScript />
          <VersionControl />
        </div>
      </div>
    </div>
  );
}
