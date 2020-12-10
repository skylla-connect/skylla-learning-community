import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DvrIcon from '@material-ui/icons/Dvr';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import SchoolIcon from '@material-ui/icons/School';
import { Typography } from '@material-ui/core';
import * as ROUTES from '../../../../config/routes';
import {Link} from 'react-router-dom'; 

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
              {props.announce}
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
                   
                   <Link to={ROUTES.CHALLENGES} >sessions</Link>
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
                <Typography>
                    Top 4 Modules
                </Typography>
                <Typography>
                    130 enrollements in 4 top modules
                </Typography>
                {props.rank}
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
                <Typography>
                    Module completions
                </Typography>
                {props.completion}
            </div>
        </Grid>
      </Grid>
    </div>
  );
}
