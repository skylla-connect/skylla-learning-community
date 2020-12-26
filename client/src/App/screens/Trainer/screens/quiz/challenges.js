import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../../../config/routes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo:{
    width:'15%',
    [theme.breakpoints.down('sm')]:{
      width:'70%',
     margin: theme.spacing(0),
    }
  },
  link: {
    color: 'white',
    margin: 20
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{backgroundColor: '#0000FF'}}>
        <Toolbar>
          <div edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img 
              src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
              alt='pic'  
              className={classes.logo}  
            /> 
          </div>
          <Typography variant="body1" className={classes.title}>
            <Link 
              to={ROUTES.PROBLEMS} 
              className={classes.link}>
                Problems
            </Link>

            <Link to={ROUTES.SUBMISSIONS} className={classes.link}>
              Submissions
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
