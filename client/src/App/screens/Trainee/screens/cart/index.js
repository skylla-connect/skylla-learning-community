import React from 'react';
import './cart.css'
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Menu from '../shared/Menu/Menu';
import Footer from '../../../../components/Footer/footer';
import *as ROUTES from '../../../../config/routes';
import { Link } from 'react-router-dom';

export default function PersistentDrawerLeft() {

  return (
    <div>
      {/* menu */}
      <Menu />

      <div className='cart-wrapper'>
        <div className='wrap-cart'>
          <div className='purchase'>
            {/* Read the modules purchased */}
            <h3>Javascript</h3>

            {/* Preview the contents */}
            <p>Preview this Content</p>

            {/* Total Amount */}
            <p>Ush 50000.00</p>

            {/* Continue shopping */}
            <Link to={ROUTES.MODULES}>
              <Button 
                className='btn-1'
              >
                Continue Shopping
              </Button> <br />
            </Link>

            {/* Complete Payment */}
            <Link to={ROUTES.PAYMENT}>
              <Button
                className='btn-2' 
              >
                Buy
              </Button>
            </Link>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
