import React, { Component } from 'react'
import './MenuLive.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

class MenuLive extends Component{
    render(){
        return(
            <div className='mymenu' >
                  <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                     alt='pic'
                     style={{
                      maxWidth:'15%',
                      height:'30%',
                      float:'left',
                      color:'white',
                      marginTop:'50px'
                     }}
                  />

                  <ShoppingCartIcon  
                  style={{
                    float:'right',
                    color:'white',
                    padding: '20px',
                    fontSize: '50px',
                    marginTop:'20px'
                  }}
                 />
                   

        </div>
       
        )
    }
}
export default MenuLive;

