import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import JavaScript from '../Assests/course_js.png';
import Python from '../Assests/course_py.png';
import './JavaScript.css';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '80%',
    margin: 'auto',
    marginTop: theme.spacing(7),
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    }
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 0,
    backgroundColor: 'white',
  },

  buttons: {
      display: 'block',
      margin: '20px 0 20px 0',
      // color: 'white',
      borderRadius: 0,
      padding: 20,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '20px auto',
      // marginLeft: '17px',
      fontSize: '12px',
      textTransform: 'capitalize'
      },
  },
}));

export default function JavaScriptPractice() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <div className="codeImg">
              <img src={JavaScript} alt="" />
            </div>

            <div className="LeftText">
              <Typography variant="body1">
                Learn HTML | CSS &amp; JavaScript in One Week.
              </Typography> 
              <Typography>
                10+ Live Sessions - 10+ challenges
              </Typography>

              <Button variant="outlined" className={classes.buttons}>
                add to the cart
              </Button>
            </div>

            <div className="clear"></div>
          </div>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
            <div className="codeImg">
              <img src={Python} alt="" />
            </div>

            <div className="LeftText">
              <Typography variant="body1">
                Learn Python in One Week
              </Typography> 
              <Typography>
                9 Live Sessions - 12 challenges - 2 articles
              </Typography>

              <Button variant="outlined" className={classes.buttons}>
                Add to the cart
              </Button>
            </div>

            <div className="clear"></div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
