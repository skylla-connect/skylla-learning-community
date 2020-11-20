import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import './payment.css'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import Avatar from '@material-ui/core/Avatar';
import {deepPurple } from '@material-ui/core/colors'
import logo from './img/skylla-logosvg.png'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import visa from './img/visa.png'
import { TextField } from '@material-ui/core';
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 280,
  },
  formControlled: {
    margin: theme.spacing(0),
    minWidth: 180,
  },
  formsec: {
    margin: theme.spacing(0),
    minWidth: 180,
    // marginLeft:'15px'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
    width:'50%',
    // border:'0.3px solid black',
    margin:'0 0 0 100px',
    borderRadius:'5px',
    backgroundColor:'whiteSmoke',
    textAlign:'center'
  },
}));

const CompletePayment = () => {
  const classes = useStyles();

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
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <FavoriteBorderIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <AddShoppingCartIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <NotificationsNoneIcon />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Avatar className={classes.purple}>RN</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
          <div className='billing'>
              <h3>Checkout</h3>
              <p>Billing Address</p>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Country</InputLabel>
                    <Select
                        native
                        label="Country"
                        >
                        <option >Uganda</option>
                        <option >Kenya</option>
                    </Select>
            </FormControl>
            <div>
             <FormControlLabel  
              control={<Radio />} 
              label="Credit or Debit Card" 
              /> <img src={visa} style={{width:'3%'}} alt='img'/>
              <br />
              <FormControlLabel  control={<Radio />} label="Mobile Money" />
            </div>
          </div>
          <div className='wrap-form-sum'>
          <form className={classes.form} noValidate autoComplete="off" id='form-pay'>
            <TextField 
              variant='outlined'
              label='Name on Card'
              style={{width:'93%'}}
            />
            <br />
            <TextField 
              variant='outlined'
              label='Card Number'
              style={{width:'93%'}}
            />
            <br />
             <div className='wrap-flex'>
            <div>
            <FormControl variant="outlined"  className={classes.formControlled} id='form-control'>
                    <InputLabel htmlFor="outlined-age-native-simple">MMM</InputLabel>
                    <Select
                        native
                        label="MMM"
                        >
                        <option >Jan</option>
                        <option >Feb</option>
                    </Select>
            </FormControl>
            </div>
            <div>
            <FormControl variant="outlined" className={classes.formControlled} id='form-Control'>
                    <InputLabel htmlFor="outlined-age-native-simple">YYYY</InputLabel>
                    <Select
                        native
                        label="YYY"
                        >
                        <option >2000</option>
                        <option >2001</option>
                    </Select>
            </FormControl>
            </div>
           <div>
           <FormControl variant="outlined" className={classes.formControlled} id='form-Control'>
           <TextField 
              variant='outlined'
              className={classes.formsec}
              id='form-sec'
              label='Security Code'
            />
            </FormControl>
           </div>
             </div>
            
             <FormControlLabel control={<Checkbox name="checkedC" />} label="Remember this card" />
          </form>
          <div className='summary'>
            <h2>Order Details</h2>
            <h3>Summary</h3>
            <p>Original Price : Ugx 50,000</p>
            <p>Coupon discount : Ugx 0</p>
            <hr />
            <p>Total : Ugx 50,000</p>
            <p className='p-p'>
              Skylla required by law to collect applicable transaction taxes
              for purchase made in certain tax jurisdictions.
            </p>
            <p className='p-p'>By completing your purchase you agree to the Terms of Service </p>
            <Button
              variant='contained'
              color='secondary'
              className='btn-comp'
            >
              Complete Payment
            </Button>
          </div>
          </div>
      </div>
    </div>
  );
}
export default CompletePayment