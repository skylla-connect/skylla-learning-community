import React from 'react';
import './cart.css'
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Menu from '../shared/Menu/Menu';
import Footer from '../../../../components/Footer/footer';

export default function PersistentDrawerLeft() {

  return (
    <div>
      {/* menu */}
      <Menu />

      <div className='cart-wrapper'>
        <div className='wrap-cart'>
          <div className='purchase'>
            <h3>Javascript</h3>
            <p>Preview this Content</p>
            <p>Ush 50000.00</p>
            <Button 
              className='btn-1'
            >Continue Shopping</Button> <br />
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
