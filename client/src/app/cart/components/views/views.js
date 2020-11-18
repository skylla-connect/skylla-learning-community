import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
// import { Typography, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    backgroundColor: '#EDEDED',
  },

  paperEditor: {
    paddingTop: theme.spacing(30),
    paddingBottom: theme.spacing(30),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#EDEDED',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: theme.spacing(20),
    }
  },

  paperOut: {
    paddingTop: theme.spacing(30),
    paddingBottom: theme.spacing(30),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#EDEDED',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
  },

  grid: {
    width: '100%', 
    margin: 'auto',
  },

  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'block',
    }
  },

  col: {
    gridColumnEnd: 'span 8',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  colR: {
    gridColumnEnd: 'span 4',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  anno: {
    float: 'right',
    color: 'red',
    cursor: 'pointer',
  }
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6} className={classes.grid}>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <CloseIcon className={classes.anno} />
              Announcements   
            <br />
            {props.announce}
          </div>
        </Grid>
      </Grid>

      {/* <Grid container spacing={3}>
        <Grid item xs={8} sm>
          <div className={classes.paperEditor}>
            Editor Here
          </div>
        </Grid>
        <Grid item xs={4} sm>
          <div className={classes.paperOut}>
            Output
          </div>
        </Grid> */}
      {/* </Grid> */}
      <div className={classes.container}>
        <div className={classes.col}>
          <div className={classes.paperEditor}>
            Editor Here
          </div>
        </div>
        <div className={classes.colR}>
          <div className={classes.paperOut}>
            Output
          </div>
        </div>
      </div>
    </div>
  );
}
