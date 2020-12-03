import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './CartSucess.css'
import { Button} from '@material-ui/core';
// import Footer from '../components/Footer/footer';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@reach/router';

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
  }));

const CartSuccess  = () =>{
    const classes = useStyles();
    return(
        <div>
            <div className='wrap-cartSuccess'>
              <div className='walk-cart'>
                <div>
                <h3>Thank you and Congratulations ...!!!</h3>
                <p> Skylla Connect has recieved your payment for the module</p>
                </div>
              </div>
            </div>
            <div className='course-cart'>
                    <p className='p-2'>Checkout your module 
                    <Link to={"cart/module/finished"}> here </Link> or 
                    Would you like to purchase another module?</p>
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
            
        </div>
    )
}
export default CartSuccess