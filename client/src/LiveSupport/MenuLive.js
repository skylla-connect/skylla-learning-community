import React, { Component } from 'react'
import './MenuLive.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

class MenuLive extends Component{
    render(){
        return(
            <div className='mymenu' >

              <a href="#general" > <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                alt='pic'
                    style={{
                      maxWidth:'15%',
                      height:'30%',
                      float:'left',
                      color:'white',
                      marginTop:'50px'
                  }}
                />
              </a>
              
              <br/>

              <a href="#product"
              
                > <ShoppingCartIcon  
                  style={{
                    float:'right',
                    color:'white',
                    padding: '20px',
                    fontSize: '70px',
                    marginTop:'20px'
                  }}
                />
              </a>

            <br/>

            <h1 
              style={{
              
                color:'white',
                // padding: '25px',
                textAlign: 'center'
              
              }}
              >
              Live Chat
            </h1>
        </div>
        )
    }
}
export default MenuLive;