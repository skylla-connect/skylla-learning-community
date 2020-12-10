import React from 'react';

// material cores
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ChartistGraph from "react-chartist";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";

// material Icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DvrIcon from '@material-ui/icons/Dvr';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import SchoolIcon from '@material-ui/icons/School';

// imported modules
import {
  topFourModules,
  moduleCompletion,
} from "./charts.js";
import Card from "../card/Card";
import CardHeader from "../card/CardHeader";
import CardBody from "../card/CardBody";
import CardFooter from "../card/CardFooter";
import CardIcon from "../card/CardIcon";

// styles
import '../styles/css/graphs.css'

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

  return (
    <div className={classes.root}>
      <Grid container spacing={6} className={classes.grid}>
        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <PersonIcon style={{
                  color: '#00BEF2', 
                  fontSize: '40px', 
                  marginBottom: '-25px',
                  marginRight: '20px'
                }} 
                />
              Hired Trainees   
              <br />
              {props.hired}
            </div>
        </Grid>
        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <PersonIcon style={{
                  color: '#82B366', 
                  fontSize: '40px', 
                  marginBottom: '-25px',
                  marginRight: '20px'
                }} 
                />    
                Enrolled trainees
              <br />
              {props.trainees}
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
              <br />
              {props.active_users}
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
              <br />
              {props.active_users}
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
                <br />
                {props.sessions}
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <DvrIcon style={{
                    color: '#FA6800', 
                    fontSize: '40px', 
                    marginBottom: '-25px',
                    marginRight: '20px'}} 
                    />    
                    Live Classes
                <br />
                {props.classes}
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <QueuePlayNextIcon style={{
                    color: '#33A64C', 
                    fontSize: '40px', 
                    marginBottom: '-25px',
                    marginRight: '20px'}} 
                    />    
                    Trainers
                <br />
                {props.trainers}
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <SchoolIcon style={{
                    color: '#FF0080', 
                    fontSize: '40px', 
                    marginBottom: '-25px',
                    marginRight: '20px'}} 
                    />    
                    Trainer's Modules
                <br />
                {props.modules}
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div className={classes.paper}>
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
