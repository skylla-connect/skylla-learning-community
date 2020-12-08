import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Footer from '../../components/Footer/footer';
import './LiveCoding.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'blue'
  },

  paperOne: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  paper: {
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    '&:hover': {
        borderRight: "15px solid #f00",
        transition: "all 0.5s",
        cursor: 'pointer',
    },

  },

  grid: {
      width: '80%',
      margin: 'auto',
      padding: theme.spacing(5, 2, 5, 2),
  }
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div>
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paperOne} style={{
                        backgroundColor: 'blue',
                        borderBottom: '1px solid white',
                        color: 'white'}}>
                        Skylla Live Coding
                    </Paper>
                </Grid>
            </Grid>
            
            <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={6} sm={3}>
                    <a href="https://stackblitz.com/edit/js-cq2hke" target="_blank">
                        <Paper className={`paper ${classes.paper}`}>
                            HTML/CSS/JS
                        </Paper>
                    </a>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <a href="https://stackblitz.com/edit/js-cq2hke" target="_blank">
                        <Paper className={`paper ${classes.paper}`}>
                            Python  
                        </Paper>
                    </a>
                </Grid>
                
                <Grid item xs={6} sm={3}>
                    <a href="https://stackblitz.com/edit/react-ocvmpl" target="_blank">
                        <Paper className={`paper ${classes.paper}`}>
                            React
                        </Paper>
                    </a>
                </Grid>

                <Grid item xs={6} sm={3}>
                    <a href="https://stackblitz.com/edit/angularjs-dgtske" target="_blank">
                        <Paper className={`paper ${classes.paper}`}>
                            Angular
                        </Paper>
                    </a>
                </Grid>
            </Grid>
        </div>

        <Footer />
    </div>
  );
}
