import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core';
import JavaScript from '../Assests/course_git.png';
import '../Fundamentals/Fundamentals.css';
import { Link } from 'react-router-dom';
import *as ROUTES from '../../../../../../config/routes';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        width: '80%',
        margin: 'auto',
        marginTop: 50,
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        }
    },
    buttons: {
        display: 'block',
        margin: '20px 0 10px 0',
        // backgroundColor: '#6c757d',
        // color: 'white',
        borderRadius: 0,
        padding: 20,
        width: '80%',
        [theme.breakpoints.down('sm')]: {
        margin: '20px auto auto 17px',
        fontSize: '12px',
        textTransform: 'capitalize'
        },
    },

    middle: {
        [theme.breakpoints.down('sm')]: {
        display: 'none',
        },
    }
}));

export default function Fundamentals() {
  const classes = useStyles();

  return (
    <div className={`codeRow ${classes.root}`}>
        <div className="CodeColumn Codeside">
            <div className="codeImage" style={{width: '80%'}}>
              <img src={JavaScript} alt="" />
            </div>
            
            <div className="Image">
              <Typography variant="body1">
                Learn to manage different versions of your 
                code projects with Git.
              </Typography> 
              <Typography>
                10+ Live Sessions - 10+ challenges
              </Typography>
            </div>

            <div className="clear"></div>
          </div>
          
          <div className={`CodeColumn sideOne ${classes.middle}`}></div>
          <div className="CodeColumn Codeside">
            <Typography variant="body1">
                Take a look at one of our most popular
            </Typography>
            <Typography variant="body1">
                Version Control like Git starter courses.
            </Typography>
           
            <Link to={ROUTES.CART}>
              <Button variant="outlined" className={classes.buttons}>
                Add to the cart
              </Button>
            </Link>
        </div>
    </div>
  );
}
