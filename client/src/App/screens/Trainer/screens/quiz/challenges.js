import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../../../config/routes';


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
      },
      links:{
        display:'flex',
        marginRight:'100px',
        alignItems:'center', 
        margin:'auto',
        float:'right'
      },
      link1:{
       margin:'50px',
       color:'white',
       fontSize:'20px',
       
      },
      link:{
        marginRight:'20px',
        color:'white',
       fontSize:'20px',
       
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
              <div className={classes.links}>
              <div>
                <Link to={ROUTES.PROBLEMS} className={classes.link1} >Problems</Link>
              </div>
              <div>
                <Link to={ROUTES.SUBMISSIONS} className={classes.link} >Submissions</Link>
              </div>
              </div>
            
          </div>
        </div>

        {/* <div className={classes.tabs}>
            <NavTab />
        </div> */}

    </div>
  );
}


