import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { withFirebase } from '../../../firebase';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import *as ROUTES from '../../../config/routes';
import {
    Link,
  } from "react-router-dom";
import FirebaseContext from 'firebase';
import Avatar from '@material-ui/core/Avatar';
import 'firebase/firestore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 100,
    marginTop: 0
  },
}));

function AccountPop({ firebase }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const classes = useStyles();
  const [currentUserDetails, setcurrentUserDetails] = React.useState({name:'', email:'', password:'', photo: ''})


  class userDetails {
    constructor (name, email, password, photo ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.photo= photo;
    }
  }

// Firestore data converter
 

  React.useEffect(() => {
        let user = FirebaseContext.auth().currentUser;   
        let db = FirebaseContext.firestore().collection('users/trainer/sys_trainers');
        let query = db.where('userId', '==', user.uid);
        

        var userDetailsConverter = {
          toFirestore: function(userDetails) {
              return {
                  name: userDetails.name,
                  email: userDetails.email,
                  password: userDetails.password,
                  photo: userDetails.photo
                  }
          },
          fromFirestore: function(snapshot, options){
              const data = snapshot.data(options);
              const det1 = new userDetails(data.name, data.email, data.password, data.photo);
              return det1
          }
        }

        query.withConverter(userDetailsConverter).get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }  

            snapshot.forEach(doc => {
                var x = doc.data();
                setcurrentUserDetails(x)
            // console.log(doc.id, '=>', x);
            ;
            })
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
  });

//   const handleClick = () => {
//     setOpen((prev) => !prev);
//   };

  const handleClickAway = () => {
    setOpen(false);
  };
  
  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
    <div className={classes.root}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'start',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{marginTop: 12,}}>
                <Avatar alt="Profile-Pic" style={{marginLeft:'5%', width: '39%', height: 150, objectFit: 'scale-down'}} src={currentUserDetails.photo} />
                <Grid container justify='left' spacing={0}>
                    <Grid item>
                        <Typography variant="h5" style={{margin: '10px 10px 10px 50px'}}>
                        {currentUserDetails.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom align='left' style={{ margin: 'auto auto 10px 50px' }}>
                            {currentUserDetails.email}
                        </Typography>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" style={{margin:'0% 0 0 25%', position: 'relative', textDecoration:'none'}}>
                          Manage Account
                      </Button>
                      <Button 
                        onClick={firebase.doSignOut} 
                        // variant="outlined" 
                        color="primary" 
                        style={{
                          margin:'2% 0 0 64%', 
                          position: 'relative', 
                          textDecoration:'none'
                        }}
                      >
                          Logout
                      </Button>
                    </Grid>
                </Grid>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container justify="center">
        <Grid item>
            <Avatar alt="Profile-Pic" onClick={handleClick('bottom-start')} style={{marginLeft:'27%', cursor:'pointer'}} src={currentUserDetails.photo} />
        </Grid>
      </Grid>
    </div>
    </ClickAwayListener>
  );
}

export default withFirebase(AccountPop);