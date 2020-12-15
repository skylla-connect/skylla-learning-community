import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import app from 'firebase/app';
import NavTab from './Tabs';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'block',
    justifyContent: 'center',
    justifyItems: 'center'
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoBody:{
      width:'40%',
      height:'10%',
      float:'left',
      [theme.breakpoints.down('sm')]: {
       marginTop:'-1%',
       left: '20%',
       width:'40%',
       height:'10%',  
    },
},
    menu:{
      backgroundColor:'blue',
      color:'white',    
        
      
    },
    title: {
        flexGrow: 1, 
        alignItems:'center',
        margin:'auto',
        [theme.breakpoints.down('sm')]:{
          float:'right',
          right:'10%'
           
        }
      },
      topMenu:{
        width:'80%',
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
        display: 'flex',
        [theme.breakpoints.down('sm')]:{
          height:50,
        }
      },
      logo:{
        width:'50%',
        [theme.breakpoints.down('sm')]:{
          width:'70%',
         margin: theme.spacing(0),
        }
      }
   
}));


export default function Challenges() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <div className={classes.menu} >
          <div position='static' className={classes.topMenu}>
          
              <div className={classes.logoBody}>
                <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' alt='pic'  className={classes.logo}  /> 
              </div>
            <Typography variant="body"  color="inherit" className={classes.title} >
              challenges
            </Typography>
          </div>
        </div>

        <div>
            <NavTab />
        </div>

    </div>
  );
}



