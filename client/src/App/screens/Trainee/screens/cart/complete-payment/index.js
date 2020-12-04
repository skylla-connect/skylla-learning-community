import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import './payment.css'
import RadioGroup from '@material-ui/core/RadioGroup';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import Avatar from '@material-ui/core/Avatar';
import {deepPurple } from '@material-ui/core/colors'
import logo from './img/skylla-logosvg.png'
import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import visa from './img/visa.png'
import { 
  Paper,
  TextField,
  Typography,
 } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Footer from '../../../../../components/Footer/footer';
import Countries from './country';
import { Link } from 'react-router-dom';
import *as ROUTES from '../../../../../config/routes';


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
  appbar:{
      backgroundColor:'white',
      color:'black'
  },
  purple: {
      color: theme.palette.getContrastText(deepPurple[400]),
      backgroundColor: deepPurple[400],
  },
  img :{
      width:'15%',
      margin:'0 0 0 0',
      float:'left'
  },

  textField: {
    margin: '10px auto 10px auto'
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },

  details: {
    padding: 40,
    border: '1px solid black',
    color: theme.palette.text.secondary,
    height: 600,
    textAlign: 'left',
  },

  container: {
    width: '85%',
    margin: '80px auto',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    }
  }
}));

const CompletePayment = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography variant="h6" >
            <img 
            className={classes.img}
            id='img'
            src={logo}
            alt='img'
            />
          </Typography>
          
          <IconButton 
              edge="start" 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="menu"
            >
            <FavoriteBorderIcon />
          </IconButton>

          <IconButton 
              edge="start" 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="menu"
            >
            <AddShoppingCartIcon />
          </IconButton>

          <IconButton 
              edge="start" 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="menu"
            >
            <NotificationsNoneIcon />
          </IconButton>

          <IconButton 
              edge="start" 
              className={classes.menuButton} 
              color="inherit" 
              aria-label="menu"
            >
            <Avatar className={classes.purple}>
              RN
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div>
        {/* payment options */}
        <div className={classes.container}>
          <form  noValidate autoComplete="off" >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h4" paragraph>
                  Checkout
                </Typography>

                <Typography variant="h6" paragraph>
                  Billing Address
                </Typography>

                {/* Display countries here */}
                <Countries />

                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <div style={{display: 'flex'}}>
                      <FormControlLabel value="female" control={<Radio />} label="Credit or Debit Card" />
                      <img src={visa} style={{
                        width:'12%', 
                        height: '10%',
                        marginTop: 10
                      }} alt='img'/>
                    </div>
                    
                    <div style={{display: 'flex'}}>
                      <FormControlLabel value="male" control={<Radio />} label="Mobile Money" />

                      <img 
                        height="40" 
                        src="https://apimgmtst14nbxosi1zkfy2r.blob.core.windows.net/content/MediaLibrary/images/mtnmomo.svg" 
                        alt="MTN MoMo" 
                      />
                    </div>
                  </RadioGroup>
                </FormControl>
                <div className={classes.paper}>
                  <TextField 
                    variant='outlined'
                    label='Name on Card'
                    style={{width:'100%'}}
                    className={classes.textField}
                  />

                  <TextField 
                    variant='outlined'
                    label='Card Number'
                    style={{width:'100%'}}
                    className={classes.textField}
                  />

                  <div style={{
                    margin: '10px auto 10px auto'
                    }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          variant='outlined'
                          id='form-sec'
                          label='Month/Year'
                          placeholder="MM / YY"
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField 
                          variant='outlined'
                          id='form-sec'
                          label='CVV'
                          placeholder="CVV"
                        />
                      </Grid>
                    </Grid>
                  </div>

                  <FormControlLabel 
                    control={<Checkbox name="checkedC" />} 
                    label="Remember this card" 
                  />

                  <div>
                    <Button 
                      variant="contained" 
                      color="secondary"
                      style={{
                        padding: 10,
                        width: '100%',
                        margin: '20px auto 20px auto'
                      }}>
                      Confirm Payment
                    </Button>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Paper className={classes.details} elevation="4">
                  <div style={{
                      margin: '20px auto 40px auto',
                      textAlign: 'center'
                    }}>
                    <Typography variant="h4" paragraph>
                      Order Details
                    </Typography>
                  </div>

                  <Typography variant="h5" paragraph>
                      Summary
                  </Typography>

                  <Typography variant="body2" paragraph>
                    Original Price : Ugx 50,000
                  </Typography>

                  <Typography variant="body2" paragraph>
                    Coupon discount : Ugx 0
                  </Typography>
                  <hr />
                    
                  <Typography variant="body2" paragraph>
                    <strong>
                      Total : Ugx 50,000
                    </strong>
                  </Typography>

                  <Typography variant="body2" paragraph>
                    Skylla required by law to collect applicable transaction taxes
                    for purchase made in certain tax jurisdictions.
                  </Typography>

                  <Typography variant="body2" paragraph>
                      By completing your purchase you agree to the Terms of Service 
                  </Typography>

                  <Link to={ROUTES.SUCCESS_PAGE}>
                    <div className='btn-comp'>
                      <Button
                        variant='contained'
                        color='secondary'
                        style={{
                          width: '100%',
                          marginTop: '40px'
                        }}
                      >
                        Complete Payment
                      </Button>
                    </div>
                  </Link>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>

     <Footer />
    </div>
  );
}
export default CompletePayment