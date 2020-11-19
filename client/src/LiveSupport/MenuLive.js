import { colors } from '@material-ui/core';
import React, { Component } from 'react'
// import Avatar from '@material-ui/core/Avatar';
import './MenuLive.css'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



class MenuLive extends Component{
    render(){
        return(
            <div className='mymenu' >
             
                <a href="#general" > <img src='https://skyllaconnect.com/static/media/skylla2.328f6004.png' 
                alt='pic'
                    style={{
                      width:'15%',
                      height:'20%',
                      float:'left',
                      color:'white',
                      marginTop:'40px'
                  }}
                /></a><br/>
                <a href="#product"
              
                > <ShoppingCartIcon  
                style={{
                  float:'right',
                  color:'white',
                  // padding: '20px',
                  fontSize: '80px',
                 
              }}
                />
                </a><br/>

                <a href="#purchase"
                ><h1 
                style={{
                 
                  color:'white',
                  padding: '60px',
                  // marginTop:'40em'
                 
              }}
                >Live Chat</h1></a>
                
        

            
            
            
        </div>
        )
    }
}
export default MenuLive;

