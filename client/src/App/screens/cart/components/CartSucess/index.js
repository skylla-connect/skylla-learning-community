import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './CartSucess.css'
import { Button} from '@material-ui/core';
// import Footer from '../components/Footer/footer';
// import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../../../components/Footer/footer';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const CartSuccess  = () =>{
    const classes = useStyles();
    return(
        <div>
            <div className='cartSuccess-wrapper'>
            <AppBar position="static" className='head'>
                <Toolbar>
                    <div>
                      <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' alt='img' />
                    </div>
                   <div className={classes.title}>
                   <Button 
                        variant="contained"
                        className='BTN'
                        color="primary"
                        style={{fontSize:'20px', margin:'0px 0 0 0'}}
                        size='small'
                        
                        // className={classes.button}
                        startIcon={<AddShoppingCartIcon style={{fontSize:'40px', margin:'0px 0 0 0'}}/>}
                    >Cart</Button>
                   </div>
                </Toolbar>
            </AppBar>

            <div className='wrap-cartSuccess'>
              <div className='purchase-cart'>
                <h3>Javascript module</h3>
                <b><p>Paid</p></b>
                <b><p>Ush 50000.00</p></b>
                <p>Date:.......</p>
                <p>Time:.......</p>
                <p className='p-1'>Enjoy Writing your own code from zero to hero</p>
                <p className='p-4'>Thank You</p>
                {/* <p>
                    <LaptopMacIcon style={{fontSize:'100px'}}/>
                </p> */}
              </div>
              <div className='walk-cart'>
              {/* <div className='icon'>
              <AddShoppingCartIcon style={{fontSize:'100px'}}/>
              </div> */}
                <div>
                  <h3>Congratulations ...!!!</h3>
                  <p> Skylla Connect has recieved your payment for the module</p>
                </div>
              </div>
            </div>
            <div className='course-cart'>
              <p className='p-2'>Would you like to purchase another module?</p>
              <p>If Yes...</p>
              <div className='flexwrap'>
                <div className='icon'>
                    <AddShoppingCartIcon style={{fontSize:'50px'}}/>
                </div>
                <Button 
                    variant='contained'
                    color='secondary'
                    className='btn01'
                >Continue</Button>
              </div>
            </div>
            <div className='more-info-cart'>
                <h3>More about the module</h3>
            </div>
            
        </div>

        <div className='cart-footer'>
          <Footer style={{margin:'100px 0 0 0'}}/>
        </div>

      </div>
    )
}
export default CartSuccess