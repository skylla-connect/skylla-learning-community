import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import *as ROUTE from '../../../../config/routes';
import CountUp from 'react-countup';

// material cores
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChartistGraph from "react-chartist";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";

// imported modules
import {
  topFourModules,
  moduleCompletion,
} from "./charts.js";
import  FirebaseContext  from 'firebase';
import Card from "../card/Card";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import CardFooter from "../card/CardFooter";
import './views.css'

// styles
import '../styles/css/graphs.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
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
  const [count , setCount] = useState([])
  const [activeUsers, setactiveUsers] = useState([])
  const [liveClass , setLiveClass] = useState([])
  const [trainers , setTrainers] = useState([])
  const [modules , setModules] = useState([])
  const [sessions , setSessions] = useState([])
  const [announcements , setAnnouncements] = useState([])
  const [hired , setHired] = useState([])

  useEffect( () => {
    // statistics 

    // for Modules purchased
    FirebaseContext.firestore().collection("orders/8XAMQYBG1zOq6iCe7e2W9jajvSs2/items")
    .get()
    .then(querySnapshot => {
      setCount(querySnapshot.size)
    }); 

    // for Users
    FirebaseContext.firestore().collection("users/trainee/users")
    .get()
    .then(snap =>{
      setactiveUsers(snap.size)
    })

    // for Live class
    FirebaseContext.firestore().collection("users/trainer/dashboard/live_class/schedule")
    .get()
    .then(snap =>{
      setLiveClass(snap.size)
    })

    // for trainers
    FirebaseContext.firestore().collection("users/trainer/sys_trainers")
    .get()
    .then(snap =>{
      setTrainers(snap.size)
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

    // Hired
    FirebaseContext.firestore().collection("users/admin/dashboard/hired_trainees/hired")
    .get()
    .then(snap =>{
      setHired(snap.size)
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

      <Grid container spacing={3} className={classes.grid}>
        <Grid item xs={6} sm={3}>
          <a href={ROUTE.HIRED}>
            <div className={`SampleCards ${classes.paper}`}>
              Hired Trainees   
              <Typography variant="h4" paragraph style={{
                  color: '#00BEF2', 
                }}>
                <CountUp end={hired} delay={2} redraw={true} />
              </Typography>
            </div>
          </a>
        </Grid>
        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>
                Enrolled trainees

              <Typography variant="h4" paragraph style={{
                  color: '#82B366', 
                }} >
                <CountUp end={count} delay={2} redraw={true} />
              </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>
                active users
              <Typography variant="h4" paragraph style={{
                  color: '#DF8C42', 
                }} >
                <CountUp end={activeUsers} delay={2} redraw={true} />
              </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>
                Announcements 
                <Typography variant="h4" paragraph style={{
                        color: '#DF8C42', 
                    }} >
                  <CountUp end={announcements} delay={2} redraw={true} />
                </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>  
                 Number of sessions
                <Typography variant="h4" paragraph style={{
                    color: '#B20000', 
                  }}>
                  <CountUp end={sessions} delay={2} redraw={true} />
                </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>
              Live Classes
              <Typography variant="h4" paragraph style={{
                  color: '#FA6800', 
                }}>
                <CountUp end={liveClass} delay={2} redraw={true} />
              </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>
              Number of Trainers
              <Typography variant="h4" paragraph  style={{
                  color: '#33A64C', 
                }} >
                <CountUp end={trainers} delay={2} redraw={true} />
              </Typography>
            </div>
        </Grid>

        <Grid item xs={6} sm={3}>
            <div className={`SampleCards ${classes.paper}`}>
                Total Modules
                <Typography variant="h4" paragraph style={{
                    color: '#FF0080', 
                  }} >
                  <CountUp end={modules} delay={2} redraw={true} />
                </Typography>
            </div>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <div className={classes.paperOne}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={moduleCompletion.data}
                  type="Bar"
                  options={moduleCompletion.options}
                  responsiveOptions={moduleCompletion.responsiveOptions}
                  listener={moduleCompletion.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>
                  Top 4 Modules
                </h4>
                <p className={classes.cardCategory}>
                  130 enrollements in 4 top modules
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Results updated 2 day ago
                </div>
              </CardFooter>
            </Card>
          </div>
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
