import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import './cart.css'
import { Button} from '@material-ui/core';
import Footer from '../components/Footer/footer';

const Cart  = () =>{
    return(
        <div>
            <div className='cart-wrapper'>
            <header className='header1'>
               <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' alt='img' />
               <div className='CRT'>
               <AddShoppingCartIcon className='ca-icon' style={{fontSize:'40px', margin:'-80px 0 0 0'}}/>
                <p>
                    Cart
               </p>
               </div>
            </header>
            <div className='wrap-cart'>
            <div className='purchase'>
                  <h3>Javascript</h3>
                  <p>Preview this Content</p>
                  <p>Ush 50000.00</p>
                  <Button 
                    className='btn-1'
                  >Go to Cart</Button> <br />
                  <Button
                    className='btn-2' 
                  >Buy</Button>
              </div>
              <div className='walk'>
              <div className='icon'>
              <AddShoppingCartIcon style={{fontSize:'100px'}}/>
              </div>
                <div>
                <h3>Javascript</h3>
                <p>Walk Through Javascript</p>
                </div>
              </div>
            </div>
            <div className='course'>
                <h3>What You Will Learn</h3>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
                    <p>Content</p>
            </div>
            <div className='more-info'>
                <h3>More about the module</h3>
            </div>
            
        </div>
        <Footer />
        </div>
    )
}
export default Cart