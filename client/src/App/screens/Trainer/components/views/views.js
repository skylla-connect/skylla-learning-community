import React, { useState, useEffect } from 'react';        
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DvrIcon from '@material-ui/icons/Dvr';
import SchoolIcon from '@material-ui/icons/School';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#EDEDED',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
  },

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
 
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={6} className={classes.grid}>
        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <SchoolIcon style={{
                    color: '#FF0080', 
                    fontSize: '40px', 
                    marginBottom: '-25px',
                    marginRight: '20px'}} 
                  />    
                    Trainer's Modules
                  <Typography variant="h4" paragraph>
                    <CountUp end={modules} delay={2} redraw={true} />
                  </Typography>
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <img src="https://cdn4.iconfinder.com/data/icons/digital-marketing-gradient-rave-and-glow/512/Promotion-128.png" 
                    alt=""
                    style={{
                        color: '#DF8C42', 
                        width: '12%', 
                        marginBottom: '-25px',
                        marginRight: '20px'
                    }} 
                />    
                Announcements 
                <Typography variant="h4" paragraph>
                  <CountUp end={announcements} delay={2} redraw={true} />
                </Typography>
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <DvrIcon style={{
                    color: '#B20000', 
                    fontSize: '40px', 
                    marginBottom: '-25px',
                    marginRight: '20px'}} 
                    />    
                   sessions
                   <Typography variant="h4" paragraph>
                    <CountUp end={sessions} delay={2} redraw={true} />
                  </Typography>
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <GroupAddIcon style={{
                  color: '#DF8C42', 
                  fontSize: '40px', 
                  marginBottom: '-25px',
                  marginRight: '20px'}} 
                />    
                   active users
                  <Typography variant="h4" paragraph>
                    <CountUp end={activeUsers} delay={2} redraw={true} />
                  </Typography>
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
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
