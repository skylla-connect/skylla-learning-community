import React, { useState, useEffect } from 'react';        
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChartistGraph from "react-chartist";
import Card from "../../../Admin/components/card/Card";
import CardHeader from "../../../Admin/components/card/CardHeader";
import CardBody from "../../../Admin/components/card/CardBody";
import CardFooter from "../../../Admin/components/card/CardFooter";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import {
  topFourModules,
} from "../../../Admin/components/views/charts";
import '../../../Admin/components/styles/css/graphs.css';
import  FirebaseContext  from 'firebase';
import Typography from "@material-ui/core/Typography";
import CountUp from 'react-countup';
import '../../../Admin/components/views/views.css';
import *as ROUTE from '../../../../config/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },

  paper: {
    padding: theme.spacing(4, 2, 2, 2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    // backgroundColor: '#EDEDED',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
  },

  // paperOne: {
  //   marginTop: '100px'
  // },

  grid: {
    width: '90%', 
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
  }
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();
  const [modules , setModules] = useState([]);
  const [announcements , setAnnouncements] = useState([]);
  const [sessions , setSessions] = useState([]);
  const [activeUsers, setactiveUsers] = useState([]);
  const [submissions , setSubmissions] = useState([]);

  useEffect( () => {
     // for Users
     FirebaseContext.firestore().collection("users/trainee/users")
     .get()
     .then(snap =>{
       setactiveUsers(snap.size)
     })
     
     // modules
    FirebaseContext.firestore().collection("modules")
    .get()
    .then(snap =>{
      setModules(snap.size)
    })

    // sessions
    FirebaseContext.firestore().collection("users/trainer/dashboard/session/session")
    .get()
    .then(snap =>{
      setSessions(snap.size)
    })

     // Announcement
     FirebaseContext.firestore().collection("users/admin/dashboard/anouncement/anouncement")
     .get()
     .then(snap =>{
       setAnnouncements(snap.size)
     })

     // Announcement
     FirebaseContext.firestore().collection("users/trainer/dashboard/solutions/solutions")
     .get()
     .then(snap =>{
       setSubmissions(snap.size)
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
      
      <Grid container spacing={6} className={classes.grid}>
        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>  
                Trainer's Modules
                <Typography variant="h4" paragraph style={{
                    color: '#FF0080', 
                    }}>
                  <CountUp end={modules} delay={2} redraw={true} />
                </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>  
                Announcements 
                <Typography variant="h4" paragraph  style={{
                    color: '#DF8C42', 
                  }}>
                  <CountUp end={announcements} delay={2} redraw={true} />
                </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>   
              sessions
              <Typography variant="h4" paragraph style={{
                  color: '#B20000', 
                }}>
                <CountUp end={sessions} delay={2} redraw={true} />
              </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
          <a href={ROUTE.ACTIVE_USERS}>
            <div className={`SampleCards ${classes.paper}`}> 
              active users
              <Typography variant="h4" paragraph style={{
                  color: '#DF8C42', 
                  }}>
                <CountUp end={activeUsers} delay={2} redraw={true} />
              </Typography>
            </div>
          </a>
        </Grid>

        <Grid item xs={6} sm={3}>
          <a href={ROUTE.SUBMISSIONS}>
            <div className={`SampleCards ${classes.paper}`}>  
                Challenges &amp; Submissions
                <Typography variant="h4" paragraph style={{
                    color: '#FF0080', 
                    }}>
                  <CountUp end={submissions} delay={2} redraw={true} />
                </Typography>
            </div>
          </a>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className={classes.paperOne}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={topFourModules.data}
                  type="Line"
                  options={topFourModules.options}
                  listener={topFourModules.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Module completions</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 10%
                  </span>{" "}
                  increase in module completion.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
