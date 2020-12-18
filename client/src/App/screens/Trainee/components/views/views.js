import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip'
import { Fab } from '@material-ui/core';
import Support from '@material-ui/icons/ContactSupport';
import Announcements from './announcements';
// import { Link } from 'react-router-dom'
import *as ROUTES from '../../../../config/routes' 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
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
    },

    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
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
  },

  absolute: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },

  root1: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={6} className={classes.grid}>
        <Grid item xs={12}>
          <Announcements/>
        </Grid>
      </Grid>

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

      <a href={ROUTES.LIVE_SUPPORT}>
        <Tooltip title="support" aria-label="support">
          <Fab color="secondary" className={classes.absolute}>
            <Support />
          </Fab>
        </Tooltip>
      </a>
    </div>
  );
}
