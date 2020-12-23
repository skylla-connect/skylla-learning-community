import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import *as ROUTE from '../../../../config/routes';
import CountUp from 'react-countup';

// material cores
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import  FirebaseContext  from 'firebase';
import './views.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(4, 2, 2, 2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: 'auto',
    // backgroundColor: '#EDEDED',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
  },  

  paperOne: {
    marginTop: '100px'
  },

  grid: {
    width: '90%', 
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
  },
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();
  const [announcements , setAnnouncements] = useState([])

  useEffect( () => {
    // Announcement
    FirebaseContext.firestore().collection("users/admin/dashboard/anouncement/anouncement")
    .get()
    .then(snap =>{
      setAnnouncements(snap.size)
    })
  });


  return (
    <div className={classes.root}>
      <Typography paragraph style={{
        textAlign: 'center',
        padding: '40px'
      }}>
        General Statistics
      </Typography>

        <Grid item xs={6} sm={3} style={{margin: 'auto'}}>
          <a href={ROUTE.ANNOUNCEMENTS}>
            <div className={`SampleCards ${classes.paper}`}>
                Announcements 
                <Typography variant="h4" paragraph style={{
                        color: '#DF8C42', 
                    }} >
                  <CountUp end={announcements} delay={2} redraw={true} />
                </Typography>
            </div>
           </a>
        </Grid>
    </div>
  );
}
